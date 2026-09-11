import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(
  _req: NextRequest,
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
      include: {
        _count: {
          select: { requests: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error('Failed to retrieve event for admin:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve event' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
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

    const body = await req.json();

    // Check if event exists
    const existing = await prisma.event.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    const dataToUpdate: Prisma.EventUpdateInput = {};

    if (body.title !== undefined) dataToUpdate.title = body.title;
    if (body.type !== undefined) dataToUpdate.type = body.type;
    if (body.tier !== undefined) dataToUpdate.tier = body.tier;
    if (body.format !== undefined) dataToUpdate.format = body.format;

    if (body.date !== undefined) {
      const parsedDate = new Date(body.date);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          { success: false, message: 'Invalid date format' },
          { status: 400 }
        );
      }
      dataToUpdate.date = parsedDate;
    }

    if (body.startTime !== undefined) dataToUpdate.startTime = body.startTime;
    if (body.endTime !== undefined) dataToUpdate.endTime = body.endTime;
    if (body.timezone !== undefined) dataToUpdate.timezone = body.timezone;
    if (body.image !== undefined) dataToUpdate.image = body.image;
    if (body.shortDescription !== undefined) dataToUpdate.shortDescription = body.shortDescription;
    if (body.fullDescription !== undefined) dataToUpdate.fullDescription = body.fullDescription;
    if (body.eligibility !== undefined) dataToUpdate.eligibility = body.eligibility;
    if (body.fee !== undefined) dataToUpdate.fee = body.fee;

    if (body.capacity !== undefined) {
      dataToUpdate.capacity =
        body.capacity === null || body.capacity === ''
          ? null
          : parseInt(String(body.capacity), 10);
    }

    if (body.venueName !== undefined) dataToUpdate.venueName = body.venueName;
    if (body.venueAddress !== undefined) dataToUpdate.venueAddress = body.venueAddress;
    if (body.venueCity !== undefined) dataToUpdate.venueCity = body.venueCity;
    if (body.venueCountry !== undefined) dataToUpdate.venueCountry = body.venueCountry;

    // Confidential meeting credentials
    if (body.privateMeetingLink !== undefined) dataToUpdate.privateMeetingLink = body.privateMeetingLink;
    if (body.meetingId !== undefined) dataToUpdate.meetingId = body.meetingId;
    if (body.passcode !== undefined) dataToUpdate.passcode = body.passcode;

    // Rich PRD fields
    if (body.speakerHost !== undefined) dataToUpdate.speakerHost = body.speakerHost;
    if (body.agenda !== undefined) dataToUpdate.agenda = body.agenda;
    if (body.whatToExpect !== undefined) dataToUpdate.whatToExpect = body.whatToExpect;
    if (body.additionalInfo !== undefined) dataToUpdate.additionalInfo = body.additionalInfo;
    if (body.supportContact !== undefined) dataToUpdate.supportContact = body.supportContact;

    if (body.allowVisitorRequests !== undefined) {
      dataToUpdate.allowVisitorRequests = Boolean(body.allowVisitorRequests);
    }

    if (body.status !== undefined) {
      dataToUpdate.status = String(body.status).toUpperCase();
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent,
    });
  } catch (error) {
    console.error('Failed to update event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PATCH(req, context);
}

export async function DELETE(
  _req: NextRequest,
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

    const existing = await prisma.event.findUnique({
      where: { id },
      select: { id: true, title: true },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Event "${existing.title}" deleted successfully`,
      data: { id: existing.id, title: existing.title },
    });
  } catch (error) {
    console.error('Failed to delete event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

