import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';
import { PAGE_DEFINITIONS } from '@/lib/defaultPageContent';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gbn_admin_session')?.value;

    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const savedRecords = await prisma.pageContent.findMany();
    const savedMap = new Map(savedRecords.map((r) => [r.slug, r]));

    const pages = PAGE_DEFINITIONS.map((def) => {
      const saved = savedMap.get(def.slug);
      return {
        slug: def.slug,
        title: def.title,
        path: def.path,
        isCustomized: Boolean(saved),
        updatedAt: saved?.updatedAt || null,
      };
    });

    return NextResponse.json({
      success: true,
      data: pages,
      total: pages.length,
      customizedCount: savedRecords.length,
    });
  } catch (error) {
    console.error('Error fetching admin pages overview:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch pages list' },
      { status: 500 }
    );
  }
}
