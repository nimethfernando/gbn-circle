import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        title: true,
        type: true,
        tier: true,
        format: true,
        date: true,
        startTime: true,
        endTime: true,
        timezone: true,
        image: true,
        shortDescription: true,
        eligibility: true,
        fee: true,
        venueName: true,
        venueCity: true,
        allowVisitorRequests: true,
        status: true,
      },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json({ success: true, data: events });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve events' },
      { status: 500 }
    );
  }
}