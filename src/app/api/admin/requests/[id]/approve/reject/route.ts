import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const request = await prisma.visitorRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return NextResponse.json(
        { success: false, message: 'Request not found' },
        { status: 404 }
      );
    }

    await prisma.visitorRequest.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    return NextResponse.json({
      success: true,
      message: 'Request rejected successfully',
    });
  } catch (error) {
    console.error('Reject route error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reject request' },
      { status: 500 }
    );
  }
}