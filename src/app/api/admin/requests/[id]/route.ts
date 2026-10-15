import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Request ID is required' },
        { status: 400 }
      );
    }

    const request = await prisma.visitorRequest.findUnique({
      where: { id },
      include: {
        event: {
          select: {
            title: true,
            date: true,
            format: true,
          },
        },
      },
    });

    if (!request) {
      return NextResponse.json(
        { success: false, message: 'Visitor request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: request });
  } catch (error) {
    console.error('Failed to retrieve visitor request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve visitor request' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Request ID is required' },
        { status: 400 }
      );
    }

    const existing = await prisma.visitorRequest.findUnique({
      where: { id },
      select: { id: true, fullName: true, email: true },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Visitor request not found' },
        { status: 404 }
      );
    }

    await prisma.visitorRequest.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Visitor request for ${existing.fullName} (${existing.email}) deleted successfully`,
      data: { id: existing.id },
    });
  } catch (error) {
    console.error('Failed to delete visitor request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete visitor request' },
      { status: 500 }
    );
  }
}

