import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

// Max file size: 8MB
// Max file size: 25MB for PDFs, 12MB for images
const MAX_IMAGE_SIZE = 12 * 1024 * 1024;
const MAX_PDF_SIZE = 25 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
]);

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gbn_admin_session')?.value;

    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, message: 'No file was uploaded' },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid file format. Please upload a PDF, JPG, PNG, WEBP, GIF, or SVG file.',
        },
        { status: 400 }
      );
    }

    const isPdf = file.type === 'application/pdf';
    const maxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: `File size exceeds limit (maximum allowed size is ${isPdf ? '25MB' : '12MB'}).`,
        },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let publicUrl: string;
    let savedToDisk = false;

    // Target upload path
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    try {
      await fs.mkdir(uploadDir, { recursive: true });

      // Sanitize filename & generate unique name
      const originalExt = path.extname(file.name || '') || (isPdf ? '.pdf' : '.jpg');
      const baseName = path
        .basename(file.name || (isPdf ? 'brochure' : 'portrait'), originalExt)
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .slice(0, 40);
      const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const filename = `${baseName}-${uniqueId}${originalExt.toLowerCase()}`;

      const destinationPath = path.join(uploadDir, filename);
      await fs.writeFile(destinationPath, buffer);

      publicUrl = `/uploads/${filename}`;
      savedToDisk = true;
    } catch (fsError: unknown) {
      // Graceful fallback for serverless platforms (like Vercel) where /var/task is read-only
      console.warn(
        'Local filesystem is not writable (serverless/Vercel detected). Storing as optimized Data URL instead:',
        fsError
      );
      const base64 = buffer.toString('base64');
      const mimeType = file.type || 'image/jpeg';
      publicUrl = `data:${mimeType};base64,${base64}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      size: file.size,
      savedToDisk,
    });
  } catch (error: unknown) {
    console.error('Error handling admin upload:', error);
    const message = error instanceof Error ? error.message : 'Failed to upload image file';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

