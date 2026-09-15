import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import {
  PageContentMap,
  PAGE_DEFINITIONS,
} from '@/lib/defaultPageContent';
import { getPageContent } from '@/lib/getPageContent';

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gbn_admin_session')?.value;
  if (!token) return false;
  return await verifyAdminToken(token);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);

    if (!pageDef) {
      return NextResponse.json(
        { success: false, message: `Page "${slug}" not found` },
        { status: 404 }
      );
    }

    const mergedContent = await getPageContent(slug as keyof PageContentMap);
    const savedRecord = await prisma.pageContent.findUnique({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      data: {
        slug: pageDef.slug,
        title: pageDef.title,
        path: pageDef.path,
        content: mergedContent,
        isCustomized: Boolean(savedRecord),
        updatedAt: savedRecord?.updatedAt || null,
      },
    });
  } catch (error) {
    console.error('Error fetching page content for admin:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page content' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);

    if (!pageDef) {
      return NextResponse.json(
        { success: false, message: `Page "${slug}" not found` },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Valid content object is required' },
        { status: 400 }
      );
    }

    const jsonString = JSON.stringify(content);

    const saved = await prisma.pageContent.upsert({
      where: { slug },
      update: {
        data: jsonString,
        title: pageDef.title,
      },
      create: {
        slug,
        title: pageDef.title,
        data: jsonString,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Content for ${pageDef.title} has been successfully updated.`,
      data: {
        slug: saved.slug,
        updatedAt: saved.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error saving page content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save page content' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);

    if (!pageDef) {
      return NextResponse.json(
        { success: false, message: `Page "${slug}" not found` },
        { status: 404 }
      );
    }

    await prisma.pageContent.deleteMany({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: `Page content for ${pageDef.title} has been reset to PRD defaults.`,
    });
  } catch (error) {
    console.error('Error resetting page content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset page content' },
      { status: 500 }
    );
  }
}
