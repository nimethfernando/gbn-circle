import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields and date formatting
    if (!body.title || !body.date || isNaN(Date.parse(body.date))) {
      return NextResponse.json(
        { success: false, message: 'Valid title and date are required' },
        { status: 400 }
      );
    }

    if (!body.type || !body.startTime || !body.endTime || !body.shortDescription || !body.eligibility) {
      return NextResponse.json(
        { success: false, message: 'Missing required event parameters' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: body.title,
        type: body.type,
        tier: body.tier || 'GBN Circle',
        format: body.format || 'Online',
        date: new Date(body.date),
        startTime: body.startTime,
        endTime: body.endTime,
        timezone: body.timezone || 'IST',
        image: body.image || '/event-networking-BdmXOEy2 (1).jpg',
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription || null,
        eligibility: body.eligibility,
        allowVisitorRequests: body.allowVisitorRequests ?? true,
        fee: body.fee || 'Free',
        capacity: body.capacity ? parseInt(body.capacity, 10) : null,
        venueName: body.venueName || null,
        venueAddress: body.venueAddress || null,
        venueCity: body.venueCity || null,
        venueCountry: body.venueCountry || null,
        privateMeetingLink: body.privateMeetingLink || null,
        meetingId: body.meetingId || null,
        passcode: body.passcode || null,
        status: body.status || 'PUBLISHED',
      },
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create event' },
      { status: 500 }
    );
  }
}