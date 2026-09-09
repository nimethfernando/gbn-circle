'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface EventItem {
  id: string;
  title: string;
  type: string;
  tier: 'GBN Circle' | 'GBN Elite';
  format: 'Online' | 'Physical';
  date: string; // ISO format: YYYY-MM-DD
  time: string;
  timezone: string;
  venue?: string;
  image: string;
  shortDescription: string;
  eligibility: string;
  status: 'Published' | 'Access Closed' | 'Cancelled';
  allowVisitorRequests: boolean;
}

// Initial CMS mock data (dynamic structure ready to connect to your API/DB)
const SAMPLE_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'GBN Circle Online Connect — September',
    type: 'Online Connect',
    tier: 'GBN Circle',
    format: 'Online',
    date: '2026-09-18',
    time: '7:00 PM – 8:15 PM',
    timezone: 'IST',
    image: '/event-networking-BdmXOEy2 (1).jpg',
    shortDescription:
      'A structured online session featuring member presentations, high-impact business introductions, and focused opportunity exchange.',
    eligibility: 'Circle & Elite Members (₹20L+ Turnover)',
    status: 'Published',
    allowVisitorRequests: true,
  },
  {
    id: '2',
    title: 'GBN Circle Monthly Physical Meet',
    type: 'Physical Networking Meet',
    tier: 'GBN Circle',
    format: 'Physical',
    date: '2026-09-25',
    time: '6:30 PM – 9:00 PM',
    timezone: 'IST',
    venue: 'Grand Hyatt, New Delhi',
    image: '/event-leadership-C1eE1_9Q.jpg',
    shortDescription:
      'In-person networking gathering bringing together founders and executives for in-depth collaborative discussions.',
    eligibility: 'Circle & Elite Members',
    status: 'Published',
    allowVisitorRequests: true,
  },
  {
    id: '3',
    title: 'GBN Elite Executive Morning',
    type: 'Elite Executive Morning',
    tier: 'GBN Elite',
    format: 'Physical',
    date: '2026-09-30',
    time: '8:00 AM – 10:30 AM',
    timezone: 'IST',
    venue: 'The Oberoi, New Delhi',
    image: '/event-global-CKOLaEg2 (1).jpg',
    shortDescription:
      'Curated morning networking and strategic breakfast session exclusively for high-scale enterprise owners.',
    eligibility: 'Businesses with ₹5Cr+ annual turnover',
    status: 'Published',
    allowVisitorRequests: false,
  },
  {
    id: '4',
    title: 'GBN Global Connect — Cross Border Synergies',
    type: 'Global Connect',
    tier: 'GBN Circle',
    format: 'Online',
    date: '2026-08-15',
    time: '6:00 PM – 7:30 PM',
    timezone: 'IST',
    image: '/vision-wide-Dafp-BMf.jpg',
    shortDescription:
      'Virtual exchange exploring cross-border expansions, joint ventures, and international market insights.',
    eligibility: 'All Members',
    status: 'Published',
    allowVisitorRequests: false,
  },
];

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  // Toggle for previewing as logged-in Member vs Non-member Visitor
  const [isMember, setIsMember] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    companyName: '',
    designation: '',
    industry: '',
    website: '',
    linkedIn: '',
    whyAttend: '',
    collaborationGoals: '',
    consent: false,
  });

  const currentDateStr = new Date().toISOString().split('T')[0];

  // Auto-sort events by date
  const upcomingEvents = SAMPLE_EVENTS.filter((e) => e.date >= currentDateStr).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const pastEvents = SAMPLE_EVENTS.filter((e) => e.date < currentDateStr).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleOpenRequest = (event: EventItem) => {
    setSelectedEvent(event);
    setFormSubmitted(false);
    setIsRequestModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect to Next.js API Route Handler: /api/events/request
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#070b19] text-white selection:bg-[#c5a059] selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 border-b border-[#1e293b]/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(197,160,89,0.12),transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#e6ca85] text-xs font-semibold tracking-widest uppercase mb-6">
            GBN Circle Events
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-6">
            Connect. Meet.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11]">
              Collaborate.
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-6">
            Discover upcoming GBN Circle experiences, business conversations, and networking opportunities designed to bring the right leaders together.
          </p>
          <p className="text-[#c5a059] text-xs tracking-widest uppercase font-medium">
            Connect &bull; Collaborate &bull; Grow
          </p>

          {/* Dev Role Simulator Switch */}
          <div className="mt-8 inline-flex items-center gap-3 bg-[#0d1629] p-1.5 px-4 rounded-full border border-[#1e293b] text-xs text-slate-400">
            <span>Viewing page as:</span>
            <button
              onClick={() => setIsMember(!isMember)}
              className="text-[#e6ca85] font-semibold underline hover:text-white transition-colors"
            >
              {isMember ? 'Approved GBN Member' : 'Public Visitor / Non-Member'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. UPCOMING EVENTS */}
      <section className="py-20 border-b border-[#1e293b]/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase block mb-1">
                Schedule
              </span>
              <h2 className="text-2xl md:text-4xl font-serif text-white">
                Upcoming Events
              </h2>
            </div>

            {/* List / Calendar View Toggle */}
            <div className="flex rounded-lg border border-[#1e293b] bg-[#0d1527] p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#c5a059] text-black font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-[#c5a059] text-black font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Calendar View
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-2xl bg-gradient-to-b from-[#0d1629] to-[#090e1a] border border-[#1e293b] overflow-hidden flex flex-col justify-between hover:border-[#c5a059]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/20 group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] w-full bg-[#080d1a] overflow-hidden">
                        <Image
                          src={evt.image}
                          alt={evt.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span
                            className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full ${
                              evt.tier === 'GBN Elite'
                                ? 'bg-[#c5a059] text-black'
                                : 'bg-[#0f172a]/90 text-[#e6ca85] border border-[#c5a059]/30'
                            }`}
                          >
                            {evt.tier}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/70 text-slate-200 border border-slate-700">
                            {evt.format}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="text-xs text-[#c5a059] font-medium mb-2 flex items-center gap-2">
                          <span>{evt.date}</span>
                          <span>&bull;</span>
                          <span>{evt.time} {evt.timezone}</span>
                        </div>

                        <h3 className="text-xl font-serif text-white mb-2 leading-snug">
                          {evt.title}
                        </h3>

                        {evt.venue && (
                          <p className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                            {evt.venue}
                          </p>
                        )}

                        <p className="text-slate-300 text-xs font-light leading-relaxed mb-4">
                          {evt.shortDescription}
                        </p>

                        <div className="border-t border-[#1e293b] pt-3 text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-300">Eligibility: </span>
                          {evt.eligibility}
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Action Buttons */}
                    <div className="p-6 pt-0">
                      {isMember ? (
                        <button className="w-full py-3 rounded-md bg-[#c5a059] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#d4af37] transition-all">
                          Join Meeting
                        </button>
                      ) : evt.allowVisitorRequests ? (
                        <button
                          onClick={() => handleOpenRequest(evt)}
                          className="w-full py-3 rounded-md border border-[#c5a059] text-[#e6ca85] hover:bg-[#c5a059]/10 font-medium text-xs tracking-wider uppercase transition-all"
                        >
                          Request to Attend
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full py-3 rounded-md bg-[#1e293b]/60 text-slate-500 font-medium text-xs tracking-wider uppercase cursor-not-allowed"
                        >
                          Members / Invite Only
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-slate-400 font-light">
                  No upcoming events scheduled right now. Please check back soon.
                </div>
              )}
            </div>
          ) : (
            /* Calendar View */
            <div className="rounded-2xl border border-[#1e293b] bg-[#0d1629] p-8">
              <h3 className="text-xl font-serif text-white mb-6">Upcoming Schedule Framework</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-5 rounded-xl border border-[#1e293b] bg-[#070b19] flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl font-serif text-[#e6ca85] mb-1">
                        {new Date(evt.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-slate-400 mb-3">
                        {evt.format} &bull; {evt.time}
                      </div>
                      <h4 className="text-sm font-medium text-white mb-2 leading-snug">{evt.title}</h4>
                    </div>
                    <span className="text-[11px] text-[#c5a059] font-medium mt-4 block">
                      {evt.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. PAST EVENTS ARCHIVE */}
      <section className="py-20 border-b border-[#1e293b]/60 bg-[#0a1020]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <span className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase block mb-1">
              Archive
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              Past Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#1e293b] bg-[#070b19] p-5 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity"
              >
                <div>
                  <div className="text-xs text-slate-400 mb-1">{item.date} &bull; {item.type}</div>
                  <h3 className="text-base font-serif text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                    {item.shortDescription}
                  </p>
                </div>
                <span className="text-xs text-[#c5a059] font-medium">Event Concluded</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISITOR REQUEST MODAL */}
      {isRequestModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#090e1a] border border-[#c5a059]/40 rounded-2xl p-6 md:p-8 shadow-2xl my-8">
            <button
              onClick={() => setIsRequestModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-lg"
            >
              ✕
            </button>

            {!formSubmitted ? (
              <>
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold block mb-2">
                  Visitor Access Request
                </span>
                <h3 className="text-2xl font-serif text-white mb-2">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Fill out this request form. Meeting access is delivered securely after review by the GBN Circle administration.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        Designation *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        Industry *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        Website Link
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={formData.linkedIn}
                        onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                      Why would you like to attend? *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.whyAttend}
                      onChange={(e) => setFormData({ ...formData, whyAttend: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1">
                      What are you looking to connect/collaborate on? *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.collaborationGoals}
                      onChange={(e) => setFormData({ ...formData, collaborationGoals: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-md bg-[#070b19] border border-[#1e293b] text-white text-xs focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 accent-[#c5a059]"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-300">
                      I understand that event attendance is subject to GBN Circle admin approval.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-md bg-[#c5a059] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#d4af37] transition-all mt-4"
                  >
                    Submit Request
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full border border-[#c5a059] text-[#c5a059] flex items-center justify-center mx-auto mb-4 text-xl">
                  ✓
                </div>
                <h4 className="text-2xl font-serif text-white mb-2">Request Submitted</h4>
                <p className="text-slate-300 text-sm font-light max-w-md mx-auto mb-6">
                  Thank you, {formData.fullName}. Your attendance request for{' '}
                  <span className="text-[#e6ca85]">{selectedEvent.title}</span> is being reviewed.
                  If approved, private meeting details will be dispatched to your email.
                </p>
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-6 py-2.5 rounded-md border border-[#c5a059] text-[#e6ca85] text-xs uppercase tracking-wider hover:bg-[#c5a059]/10"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}