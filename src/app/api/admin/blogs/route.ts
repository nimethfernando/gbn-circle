import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category')?.trim();
    const status = searchParams.get('status')?.trim();
    const search = searchParams.get('search')?.trim();

    const where: Prisma.BlogWhereInput = {};

    if (category && category !== 'All') {
      where.category = { equals: category };
    }

    if (status === 'published') {
      where.published = true;
    } else if (status === 'draft') {
      where.published = false;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { authorName: { contains: search } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      takeaways,
      image,
      category = 'Networking & Trust',
      readTime = '5 min read',
      authorName = 'GBN Executive Board',
      authorRole = 'Global Business Network Leadership',
      published = true,
      featured = false,
    } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, message: 'Title, excerpt, and content are required' },
        { status: 400 }
      );
    }

    let slug = customSlug?.trim() ? generateSlug(customSlug) : generateSlug(title);
    if (!slug) {
      slug = `blog-${Date.now()}`;
    }

    // Check if slug already exists
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Format takeaways as string if array
    let formattedTakeaways: string | null = null;
    if (Array.isArray(takeaways)) {
      formattedTakeaways = JSON.stringify(takeaways);
    } else if (typeof takeaways === 'string' && takeaways.trim()) {
      formattedTakeaways = takeaways.trim();
    }

    const newBlog = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug,
        excerpt: excerpt.trim(),
        content: content.trim(),
        takeaways: formattedTakeaways,
        image: image?.trim() || '/vision-wide-Dafp-BMf.jpg',
        category: category.trim(),
        readTime: readTime.trim(),
        authorName: authorName.trim(),
        authorRole: authorRole.trim(),
        published: Boolean(published),
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(
      { success: true, message: 'Blog article created successfully', data: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog article:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog article' },
      { status: 500 }
    );
  }
}

