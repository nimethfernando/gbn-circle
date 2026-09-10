import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const requests = await prisma.visitorRequest.findMany({
      include: {
        event: {
          select: {
            title: true,
            date: true,
            format: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error('Failed to fetch visitor requests:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve visitor requests' },
      { status: 500 }
    );
  }
}