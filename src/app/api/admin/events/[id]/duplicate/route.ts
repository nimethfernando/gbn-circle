import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gbn_admin_session')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired administrative session' },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Source event ID is required' },
        { status: 400 }
      );
    }

    const sourceEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!sourceEvent) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    // Clone event data per PRD Sec. 9
    const duplicatedEvent = await prisma.event.create({
      data: {
        title: `${sourceEvent.title} (Copy)`,
        type: sourceEvent.type,
        tier: sourceEvent.tier,
        format: sourceEvent.format,
        date: sourceEvent.date,
        startTime: sourceEvent.startTime,
        endTime: sourceEvent.endTime,
        timezone: sourceEvent.timezone,
        image: sourceEvent.image,
        shortDescription: sourceEvent.shortDescription,
        fullDescription: sourceEvent.fullDescription,
        eligibility: sourceEvent.eligibility,
        fee: sourceEvent.fee,
        capacity: sourceEvent.capacity,
        venueName: sourceEvent.venueName,
        venueAddress: sourceEvent.venueAddress,
        venueCity: sourceEvent.venueCity,
        venueCountry: sourceEvent.venueCountry,
        privateMeetingLink: sourceEvent.privateMeetingLink,
        meetingId: sourceEvent.meetingId,
        passcode: sourceEvent.passcode,
        speakerHost: sourceEvent.speakerHost,
        agenda: sourceEvent.agenda,
        whatToExpect: sourceEvent.whatToExpect,
        additionalInfo: sourceEvent.additionalInfo,
        supportContact: sourceEvent.supportContact,
        allowVisitorRequests: sourceEvent.allowVisitorRequests,
        status: 'DRAFT', // Always created as DRAFT so administrator can review date/time before publishing
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Event duplicated successfully as a DRAFT. You can now edit its schedule and publish it.',
        data: duplicatedEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error duplicating event (Sec. 9):', error);
    return NextResponse.json(
      { success: false, message: 'Failed to duplicate event' },
      { status: 500 }
    );
  }
}

