import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Standard 6 points specified in PRD Sec. 23 & 39
const DEFAULT_WHAT_TO_EXPECT = [
  'Welcome & Opening',
  'Member Introductions',
  '2–3 Business Presentations',
  'Interaction',
  'Networking & Opportunity Exchange',
  'Closing',
];

const DEFAULT_AGENDA = [
  { time: '15 Mins', title: 'Welcome & Executive Opening Remarks' },
  { time: '30 Mins', title: 'Keynote & Strategic Industry Roundtable' },
  { time: '30 Mins', title: 'Member Introductions & Synergies' },
  { time: '30 Mins', title: 'Focused Breakout Rooms & Direct Collaboration' },
  { time: '15 Mins', title: 'Closing, Synthesis & Next Steps' },
];

export async function GET(
  request: NextRequest,
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

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.trim().toLowerCase();

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
        privateMeetingLink: true, // Only returned if email is confirmed approved member/visitor (Sec. 7)
        meetingId: true,
        passcode: true,
      },
    });

    if (!event || event.status === 'DRAFT') {
      return NextResponse.json(
        { success: false, message: 'Event not found or restricted' },
        { status: 404 }
      );
    }

    // Parse What to Expect (Sec. 23)
    const whatToExpectList = event.whatToExpect
      ? event.whatToExpect.split('\n').map((s) => s.trim()).filter(Boolean)
      : DEFAULT_WHAT_TO_EXPECT;

    // Parse Agenda (Sec. 23)
    const agendaList = event.agenda
      ? event.agenda.split('\n').map((s) => s.trim()).filter(Boolean)
      : DEFAULT_AGENDA.map((a) => `${a.time} — ${a.title}`);

    // Determine Sec. 24 Button Logic & Visitor State
    let buttonLogic = {
      label: 'REQUEST TO ATTEND',
      disabled: false,
      state: 'REQUEST_TO_ATTEND',
      meetingAccessUrl: null as string | null,
    };

    const isPast = new Date(event.date).getTime() < new Date().setHours(0, 0, 0, 0);

    if (event.status === 'CANCELLED') {
      buttonLogic = {
        label: 'EVENT CANCELLED',
        disabled: true,
        state: 'EVENT_CANCELLED',
        meetingAccessUrl: null,
      };
    } else if (event.status === 'ACCESS_CLOSED' || event.status === 'CLOSED' || !event.allowVisitorRequests) {
      buttonLogic = {
        label: 'ACCESS CLOSED',
        disabled: true,
        state: 'ACCESS_CLOSED',
        meetingAccessUrl: null,
      };
    } else if (isPast) {
      buttonLogic = {
        label: 'EVENT CONCLUDED',
        disabled: true,
        state: 'CONCLUDED',
        meetingAccessUrl: null,
      };
    }

    // Check member or visitor access if email is provided (PRD Sec. 5 & 24)
    let member = null;
    let visitorRequest = null;

    if (email) {
      // 1. Check if email belongs to an approved active GBN Circle member
      member = await prisma.member.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          tier: true,
          status: true,
        },
      });

      if (member && member.status === 'ACTIVE') {
        // Active member receives direct JOIN MEETING access without any screening form (PRD Sec. 5 & 24)
        buttonLogic = {
          label: 'JOIN MEETING',
          disabled: false,
          state: 'JOIN_MEETING',
          meetingAccessUrl: event.privateMeetingLink || null,
        };
      } else {
        // 2. Not an active member -> check VisitorRequest for this event
        visitorRequest = await prisma.visitorRequest.findFirst({
          where: {
            eventId: id,
            email: { equals: email },
          },
          select: {
            id: true,
            status: true,
            fullName: true,
            createdAt: true,
          },
        });

        if (visitorRequest) {
          if (visitorRequest.status === 'PENDING') {
            buttonLogic = {
              label: 'REQUEST SUBMITTED',
              disabled: true,
              state: 'REQUEST_SUBMITTED',
              meetingAccessUrl: null,
            };
          } else if (visitorRequest.status === 'APPROVED') {
            // Approved visitor receives secure private meeting credentials per Sec. 7 & 24
            buttonLogic = {
              label: 'ACCESS MEETING',
              disabled: false,
              state: 'ACCESS_MEETING',
              meetingAccessUrl: event.privateMeetingLink || null,
            };
          } else if (visitorRequest.status === 'REJECTED') {
            buttonLogic = {
              label: 'REQUEST NOT APPROVED',
              disabled: true,
              state: 'REQUEST_NOT_APPROVED',
              meetingAccessUrl: null,
            };
          }
        }
      }
    }

    // Security Rule 7: Never return private credentials on public response unless member or approved visitor
    const isMeetingAccessAllowed =
      buttonLogic.state === 'JOIN_MEETING' || buttonLogic.state === 'ACCESS_MEETING';
    const sanitizedMeetingLink = isMeetingAccessAllowed ? event.privateMeetingLink : null;
    const sanitizedMeetingId = isMeetingAccessAllowed ? event.meetingId : null;
    const sanitizedPasscode = isMeetingAccessAllowed ? event.passcode : null;

    // Construct full Sec. 23 event response
    const payload = {
      id: event.id,
      title: event.title,
      type: event.type,
      tier: event.tier,
      format: event.format,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      timezone: event.timezone,
      image: event.image,
      shortDescription: event.shortDescription,
      fullDescription: event.fullDescription || event.shortDescription,
      eligibility: event.eligibility,
      fee: event.fee,
      capacity: event.capacity,
      venueName: event.venueName,
      venueAddress: event.venueAddress,
      venueCity: event.venueCity,
      venueCountry: event.venueCountry,
      speakerHost: event.speakerHost,
      agenda: event.agenda,
      agendaList,
      whatToExpect: event.whatToExpect,
      whatToExpectList,
      additionalInfo: event.additionalInfo,
      supportContact: event.supportContact,
      allowVisitorRequests: event.allowVisitorRequests,
      status: event.status,
      buttonLogic: {
        ...buttonLogic,
        isMember: !!member,
        memberName: member?.name || null,
        memberTier: member?.tier || null,
      },
      visitorStatus: visitorRequest?.status || null,
      meetingAccessUrl: sanitizedMeetingLink,
      meetingId: sanitizedMeetingId,
      passcode: sanitizedPasscode,
    };

    return NextResponse.json({ success: true, data: payload });
  } catch (error) {
    console.error('Error in Event Detail API (Sec. 23):', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve event details' },
      { status: 500 }
    );
  }
}
