import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_STATUSES = ['DRAFT', 'PUBLISHED', 'ACCESS_CLOSED', 'CLOSED', 'CANCELLED', 'COMPLETED'] as const;

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
    const rawStatus = body.status ? String(body.status).toUpperCase().trim() : null;

    if (!rawStatus || !VALID_STATUSES.includes(rawStatus as typeof VALID_STATUSES[number])) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Check existing event
    const existing = await prisma.event.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    // Normalize status
    const status = rawStatus === 'CLOSED' ? 'ACCESS_CLOSED' : rawStatus;

    // Automatic side-effects based on PRD Sec. 19
    let allowVisitorRequests = existing.allowVisitorRequests;
    if (status === 'ACCESS_CLOSED' || status === 'CANCELLED' || status === 'COMPLETED') {
      allowVisitorRequests = false;
    } else if (status === 'PUBLISHED' && body.allowVisitorRequests !== false) {
      allowVisitorRequests = true;
    }

    const updated = await prisma.event.update({
      where: { id },
      data: {
        status,
        allowVisitorRequests,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Event status toggled to ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error('Failed to toggle event status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to toggle event status' },
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

