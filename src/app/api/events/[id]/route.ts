import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id },
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
        fullDescription: true,
        eligibility: true,
        fee: true,
        capacity: true,
        venueName: true,
        venueAddress: true,
        venueCity: true,
        venueCountry: true,
        speakerHost: true,
        agenda: true,
        whatToExpect: true,
        additionalInfo: true,
        supportContact: true,
        allowVisitorRequests: true,
        status: true,
        createdAt: true,
        // Rule 7: Strict security - NEVER return privateMeetingLink, meetingId, passcode in public APIs
      },
    });

    if (!event || event.status === 'DRAFT') {
      return NextResponse.json(
        { success: false, message: 'Event not found or restricted' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve event details' },
      { status: 500 }
    );
  }
}

