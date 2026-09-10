import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const event = await prisma.event.create({
      data: {
        title: body.title,
        type: body.type,
        tier: body.tier || 'CIRCLE',
        format: body.format || 'ONLINE',
        date: new Date(body.date),
        startTime: body.startTime,
        endTime: body.endTime,
        timezone: body.timezone || 'IST',
        image: body.image || '/event-networking-BdmXOEy2 (1).jpg',
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        eligibility: body.eligibility,
        allowVisitorRequests: body.allowVisitorRequests ?? true,
        fee: body.fee || 'Free',
        capacity: body.capacity ? parseInt(body.capacity) : null,
        venueName: body.venueName,
        venueAddress: body.venueAddress,
        venueCity: body.venueCity,
        venueCountry: body.venueCountry,
        privateMeetingLink: body.privateMeetingLink,
        meetingId: body.meetingId,
        passcode: body.passcode,
        status: body.status || 'PUBLISHED',
      },
    });

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create event' },
      { status: 500 }
    );
  }
}