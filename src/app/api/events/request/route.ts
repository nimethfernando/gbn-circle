import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventId,
      fullName,
      email,
      phone,
      country,
      city,
      companyName,
      designation,
      industry,
      website,
      linkedIn,
      whyAttend,
      collaborationGoals,
    } = body;

    if (!eventId || !fullName || !email || !phone || !companyName) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event || !event.allowVisitorRequests || event.status !== 'PUBLISHED') {
      return NextResponse.json(
        { success: false, message: 'This event is not accepting visitor requests' },
        { status: 403 }
      );
    }

    const newRequest = await prisma.visitorRequest.create({
      data: {
        eventId,
        fullName,
        email,
        phone,
        country,
        city,
        companyName,
        designation,
        industry,
        website,
        linkedIn,
        whyAttend,
        collaborationGoals,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Request submitted for admin review.',
      requestId: newRequest.id,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Error processing request' },
      { status: 500 }
    );
  }
}