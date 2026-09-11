import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import EventDetailView, { EventDetailData } from './EventDetailView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      select: { title: true, shortDescription: true },
    });

    if (!event) {
      return {
        title: 'Event Not Found | GBN Circle',
      };
    }

    return {
      title: `${event.title} | GBN Circle Events`,
      description: event.shortDescription,
    };
  } catch {
    return {
      title: 'GBN Circle Event',
    };
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let event: EventDetailData | null = null;

  try {
    const raw = await prisma.event.findUnique({
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
      },
    });

    if (raw && raw.status === 'PUBLISHED') {
      event = {
        ...raw,
        date: raw.date.toISOString(),
      };
    }
  } catch (error) {
    console.error('Error loading event details:', error);
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-6">
          !
        </div>
        <h1 className="text-3xl font-serif font-bold text-white mb-3">Event Not Found</h1>
        <p className="text-slate-400 text-sm max-w-md mb-8">
          The requested session is either no longer available, draft-restricted, or does not exist on our executive calendar.
        </p>
        <Link
          href="/events"
          className="px-6 py-3 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg hover:scale-105 transition-all"
        >
          View All Active Events
        </Link>
      </div>
    );
  }

  return <EventDetailView event={event} />;
}

