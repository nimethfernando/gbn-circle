import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const timeline = searchParams.get('timeline')?.toLowerCase(); // 'upcoming' | 'past' | 'all'
    const format = searchParams.get('format')?.toLowerCase();
    const tier = searchParams.get('tier');

    const now = new Date();
    // Start of current day in local time so today's scheduled sessions remain upcoming
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const baseWhere: Prisma.EventWhereInput = {
      status: { not: 'DRAFT' },
    };

    if (format === 'online') {
      baseWhere.format = 'Online';
    } else if (format === 'physical') {
      baseWhere.format = { not: 'Online' };
    }

    if (tier && tier !== 'all') {
      baseWhere.tier = tier;
    }

    // Security Rule 7: Strict public sanitization
    // Excludes privateMeetingLink, meetingId, passcode
    const selectFields = {
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
      speakerHost: true,
      status: true,
    };

    // If caller explicitly requested only upcoming sessions
    if (timeline === 'upcoming') {
      const upcoming = await prisma.event.findMany({
        where: { ...baseWhere, date: { gte: startOfToday } },
        select: selectFields,
        orderBy: { date: 'asc' }, // Nearest date first per Sec. 3
      });

      return NextResponse.json({
        success: true,
        data: upcoming,
        upcoming,
        count: upcoming.length,
      });
    }

    // If caller explicitly requested only past sessions
    if (timeline === 'past') {
      const past = await prisma.event.findMany({
        where: { ...baseWhere, date: { lt: startOfToday } },
        select: selectFields,
        orderBy: { date: 'desc' }, // Most recent past sessions first
      });

      return NextResponse.json({
        success: true,
        data: past,
        past,
        count: past.length,
      });
    }

    // Default: Automatically separate Upcoming vs Past events per Sec. 3 & 7
    const [upcoming, past] = await Promise.all([
      prisma.event.findMany({
        where: { ...baseWhere, date: { gte: startOfToday } },
        select: selectFields,
        orderBy: { date: 'asc' }, // Ascending: nearest first
      }),
      prisma.event.findMany({
        where: { ...baseWhere, date: { lt: startOfToday } },
        select: selectFields,
        orderBy: { date: 'desc' }, // Descending: most recent first
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        upcoming,
        past,
      },
      upcoming,
      past,
      all: [...upcoming, ...past],
      counts: {
        upcoming: upcoming.length,
        past: past.length,
        total: upcoming.length + past.length,
      },
    });
  } catch (error) {
    console.error('Failed to retrieve public events:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve events' },
      { status: 500 }
    );
  }
}