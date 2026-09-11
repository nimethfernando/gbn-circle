import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category')?.trim();
    const search = searchParams.get('search')?.trim();
    const featured = searchParams.get('featured');

    const where: Prisma.BlogWhereInput = {
      published: true,
    };

    if (category && category !== 'All' && category !== 'all') {
      where.category = { equals: category };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
        { authorName: { contains: search } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    const parsedBlogs = blogs.map((blog) => {
      let takeaways: string[] = [];
      if (blog.takeaways) {
        try {
          takeaways = JSON.parse(blog.takeaways);
        } catch {
          takeaways = blog.takeaways
            .split('\n')
            .map((t) => t.trim())
            .filter(Boolean);
        }
      }

      const contentParagraphs = blog.content
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean);

      return {
        ...blog,
        takeaways,
        contentParagraphs,
      };
    });

    return NextResponse.json({ success: true, data: parsedBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve blogs' },
      { status: 500 }
    );
  }
}

