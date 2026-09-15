import { NextRequest, NextResponse } from 'next/server';
import { getPageContent } from '@/lib/getPageContent';
import { PageContentMap } from '@/lib/defaultPageContent';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const validSlugs: Array<keyof PageContentMap> = [
      'home',
      'about',
      'community',
      'leadership',
      'contact',
    ];

    if (!validSlugs.includes(slug as keyof PageContentMap)) {
      return NextResponse.json(
        { success: false, message: `Page slug "${slug}" not found` },
        { status: 404 }
      );
    }

    const content = await getPageContent(slug as keyof PageContentMap);
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('Error fetching public page content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page content' },
      { status: 500 }
    );
  }
}
