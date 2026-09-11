import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
} from 'lucide-react';

export default async function Events() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let upcomingEvent = null;
  try {
    upcomingEvent = await prisma.event.findFirst({
      where: {
        status: 'PUBLISHED',
        date: { gte: today },
      },
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    console.error('Error loading upcoming event on Home:', error);
  }

  const monthlyFramework = [
    {
      week: 'Week 1',
      title: 'GBN Circle Online Connect #1',
      format: 'Online',
      badge: 'Virtual',
      desc: 'High-frequency cross-sector introductions and business exchanges across all national chapters.',
    },
    {
      week: 'Week 2',
      title: 'GBN Circle Monthly Physical Meet',
      format: 'Physical',
      badge: 'In-Person',
      desc: 'In-person chapter breakfast and table rotations for verified entrepreneurs and corporate leaders.',
    },
    {
      week: 'Week 3',
      title: 'GBN Circle Online Connect #2',
      format: 'Online',
      badge: 'Virtual',
      desc: 'Targeted sector breakout rooms, strategic referral pipelines, and joint-venture explorations.',
    },
    {
      week: 'Week 4',
      title: 'GBN Elite Executive Morning',
      format: 'Elite • Physical • Morning',
      badge: 'Elite Council',
      desc: 'Closed-door boardroom dialogue and executive breakfast reserved for ₹5Cr+ annual turnover leaders.',
    },
  ];

  const additionalExperiences = [
    {
      title: 'Global Connect',
      desc: 'Cross-border corridors connecting members with leaders in the GCC, Europe & Southeast Asia.',
    },
    {
      title: 'Masterclasses',
      desc: 'High-leverage workshops on relationship capital, M&A structuring, and cross-border trade.',
    },
    {
      title: 'Leadership Sessions',
      desc: 'Closed roundtables where industry veterans candidly discuss scaling decisions and dilemmas.',
    },
    {
      title: 'Community Gatherings',
      desc: 'Annual physical conclaves, festive galas, and informal retreats for long-term bonding.',
    },
  ];

  const formattedDate = upcomingEvent
    ? new Date(upcomingEvent.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <section className="py-24 bg-gbn-navy text-white relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* 9. EVENTS SECTION (PRD Page 7) */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-3xl animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  Events
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                Meet. Connect. Collaborate.
              </h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
                GBN Circle creates regular opportunities for members to meet, exchange ideas, build relationships and explore collaboration.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white text-xs tracking-widest font-bold px-7 py-3.5 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase shrink-0 shadow-sm"
            >
              <span>View All Events</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Monthly Framework (Week 1 - Week 4) */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#c5a059]">
                Monthly Framework
              </span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {monthlyFramework.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gbn-navy-light/40 border border-white/5 rounded-sm p-6 hover:border-[#c5a059]/40 hover:bg-gbn-navy-light/70 transition-all duration-300 flex flex-col justify-between group premium-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold text-[#c5a059] tracking-widest uppercase">
                        {item.week}
                      </span>
                      <span className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded border border-white/10 text-slate-400">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif text-white group-hover:text-[#c5a059] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/5 text-[11px] font-semibold text-slate-300">
                    Format: <span className="text-white">{item.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Experiences */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#c5a059]">
                Additional Experiences
              </span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalExperiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-slate-900/40 border border-white/5 rounded-sm hover:border-white/15 transition-all"
                >
                  <div className="w-8 h-8 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-4">
                    <Compass size={16} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                    {exp.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 10. UPCOMING EVENT — "What's Happening Next?" (PRD Pages 7–8) */}
        <div className="pt-16 border-t border-white/10">
          <div className="max-w-3xl mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[10px] uppercase tracking-widest font-bold mb-4">
              <Sparkles size={12} /> Next Immediate Session
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-3">
              What&apos;s Happening Next?
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
              Explore our upcoming live session. Verified members access directly; visitors are invited to request attendance below.
            </p>
          </div>

          {upcomingEvent ? (
            <div className="bg-gradient-to-br from-slate-900/90 via-[#0b132b]/90 to-slate-900/90 border border-[#c5a059]/30 rounded-xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Cover Image & Badges */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                  <Image
                    src={upcomingEvent.image || '/event-networking-BdmXOEy2 (1).jpg'}
                    alt={upcomingEvent.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950"></div>

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-[#c5a059] text-[#c5a059] text-[10px] font-bold tracking-widest uppercase rounded">
                      {upcomingEvent.tier}
                    </span>
                    <span
                      className={`px-3 py-1 backdrop-blur-md border text-[10px] font-bold tracking-widest uppercase rounded ${
                        upcomingEvent.format.toLowerCase() === 'online'
                          ? 'bg-blue-950/80 border-blue-500/50 text-blue-300'
                          : 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                      }`}
                    >
                      {upcomingEvent.format}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300 flex items-center gap-2 backdrop-blur-md bg-black/50 p-2.5 rounded border border-white/10">
                    <ShieldCheck size={16} className="text-[#c5a059] shrink-0" />
                    <span className="text-[11px] font-medium">
                      Status: {upcomingEvent.allowVisitorRequests ? 'Registration Open' : 'Access Closed'}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5 font-semibold text-[#c5a059]">
                        <Calendar size={15} />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock size={15} className="text-slate-500" />
                        <span>
                          {upcomingEvent.startTime} – {upcomingEvent.endTime} {upcomingEvent.timezone}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold mb-4 leading-tight">
                      {upcomingEvent.title}
                    </h3>

                    <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                      {upcomingEvent.shortDescription}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-800 text-xs mb-8">
                      {/* Location / Meeting link note */}
                      <div className="flex items-start gap-3 text-slate-300">
                        {upcomingEvent.format.toLowerCase() === 'online' ? (
                          <Video size={16} className="text-blue-400 shrink-0 mt-0.5" />
                        ) : (
                          <MapPin size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
                        )}
                        <div>
                          <strong className="text-white block font-medium">
                            {upcomingEvent.format.toLowerCase() === 'online'
                              ? 'Virtual Boardroom'
                              : upcomingEvent.venueName || 'Physical Venue'}
                          </strong>
                          <span className="text-slate-400 text-[11px]">
                            {upcomingEvent.format.toLowerCase() === 'online'
                              ? 'Confidential Zoom access link delivered upon approved registration'
                              : `${upcomingEvent.venueAddress ? upcomingEvent.venueAddress + ', ' : ''}${upcomingEvent.venueCity || ''}`}
                          </span>
                        </div>
                      </div>

                      {/* Eligibility */}
                      <div className="flex items-start gap-3 text-slate-300">
                        <Users size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-medium">Eligibility</strong>
                          <span className="text-slate-400 text-[11px]">{upcomingEvent.eligibility}</span>
                        </div>
                      </div>

                      {/* Fee */}
                      <div className="flex items-center gap-3 text-slate-300">
                        <span className="text-[#c5a059] font-bold text-xs">Fee:</span>
                        <span className="text-white font-semibold text-xs">{upcomingEvent.fee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons (PRD Page 8) */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800/80">
                    <Link
                      href={`/events/${upcomingEvent.id}`}
                      className="flex-1 py-3.5 px-6 rounded text-center border border-white/20 hover:border-[#c5a059] text-white hover:text-[#c5a059] font-bold text-xs tracking-widest uppercase transition-all"
                    >
                      View Event
                    </Link>

                    <Link
                      href={`/events/${upcomingEvent.id}`}
                      className="flex-1 py-3.5 px-6 rounded text-center bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs tracking-widest uppercase transition-all hover:scale-105 shadow-lg"
                    >
                      {upcomingEvent.allowVisitorRequests ? 'Register Now' : 'Request Access'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Clean Fallback Message (PRD Page 8) */
            <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-xl max-w-2xl mx-auto shadow-lg">
              <Calendar size={36} className="mx-auto text-slate-600 mb-4" />
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                No Upcoming Events Currently Scheduled
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Our executive calendar is updated weekly. Check back soon for new physical chapter meets and national virtual sessions, or browse previous sessions.
              </p>
              <Link
                href="/events"
                className="inline-flex px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-[#c5a059] text-xs uppercase tracking-widest font-bold rounded transition"
              >
                Browse Past Events
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
