import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve blog article' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return PATCH(request, { params });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Blog article not found' },
        { status: 404 }
      );
    }

    const updateData: Prisma.BlogUpdateInput = {};

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.slug !== undefined) updateData.slug = body.slug.trim();
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt.trim();
    if (body.content !== undefined) updateData.content = body.content.trim();
    if (body.image !== undefined) updateData.image = body.image.trim();
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.readTime !== undefined) updateData.readTime = body.readTime.trim();
    if (body.authorName !== undefined) updateData.authorName = body.authorName.trim();
    if (body.authorRole !== undefined) updateData.authorRole = body.authorRole.trim();
    if (body.published !== undefined) updateData.published = Boolean(body.published);
    if (body.featured !== undefined) updateData.featured = Boolean(body.featured);

    if (body.takeaways !== undefined) {
      if (Array.isArray(body.takeaways)) {
        updateData.takeaways = JSON.stringify(body.takeaways);
      } else if (typeof body.takeaways === 'string') {
        updateData.takeaways = body.takeaways.trim() || null;
      } else {
        updateData.takeaways = null;
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Blog article updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    console.error('Error updating blog article:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog article' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Blog article not found' },
        { status: 404 }
      );
    }

    await prisma.blog.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Blog article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog article:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog article' },
      { status: 500 }
    );
  }
}

