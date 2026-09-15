import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

// Max file size: 8MB
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
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
          message: 'Invalid file format. Please upload a JPG, PNG, WEBP, GIF, or SVG image.',
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'File size exceeds limit (maximum allowed size is 8MB).',
        },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Target upload path
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Sanitize filename & generate unique name
    const originalExt = path.extname(file.name || '') || '.jpg';
    const baseName = path
      .basename(file.name || 'portrait', originalExt)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const filename = `${baseName}-${uniqueId}${originalExt.toLowerCase()}`;

    const destinationPath = path.join(uploadDir, filename);
    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
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

