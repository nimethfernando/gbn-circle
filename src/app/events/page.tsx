'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  List,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  ArrowDown,
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  type: string;
  tier: string;
  format: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  image: string;
  shortDescription: string;
  eligibility: string;
  fee: string;
  venueName?: string | null;
  venueCity?: string | null;
  allowVisitorRequests: boolean;
  speakerHost?: string | null;
  status: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'LIST' | 'CALENDAR'>('LIST');
  const [activeTab, setActiveTab] = useState<'ALL' | 'ONLINE' | 'PHYSICAL'>('ALL');

  // Calendar State
  const [calendarDate, setCalendarDate] = useState<Date>(() => new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  // Modal State
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Visitor Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'India',
    city: '',
    companyName: '',
    designation: '',
    industry: '',
    website: '',
    linkedIn: '',
    whyAttend: '',
    collaborationGoals: '',
  });

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        const json = await res.json();
        if (json.success) {
          const allList: EventItem[] = Array.isArray(json.data)
            ? json.data
            : [...(json.data?.upcoming || json.upcoming || []), ...(json.data?.past || json.past || [])];
          setEvents(allList);
          // Pre-select the date of the first upcoming event if available
          const firstUpcoming = (json.upcoming || json.data?.upcoming || allList).find(
            (e: EventItem) => new Date(e.date).getTime() >= new Date().setHours(0, 0, 0, 0)
          );
          if (firstUpcoming) {
            const d = new Date(firstUpcoming.date);
            setSelectedCalendarDate(
              `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            );
          }
        }
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/events/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          ...formData,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setSubmitStatus({
          success: true,
          message: 'Your attendance request has been submitted for executive verification. You will be notified via email.',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: 'India',
          city: '',
          companyName: '',
          designation: '',
          industry: '',
          website: '',
          linkedIn: '',
          whyAttend: '',
          collaborationGoals: '',
        });
      } else {
        setSubmitStatus({
          success: false,
          message: json.message || 'Failed to submit visitor request.',
        });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: 'Network error. Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Segregate Upcoming vs Past
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filtered = events.filter((evt) => {
      if (activeTab === 'ONLINE') return evt.format.toLowerCase() === 'online';
      if (activeTab === 'PHYSICAL') return evt.format.toLowerCase() !== 'online';
      return true;
    });

    const upcoming: EventItem[] = [];
    const past: EventItem[] = [];

    filtered.forEach((evt) => {
      const evtDate = new Date(evt.date);
      if (evtDate.getTime() >= today.getTime()) {
        upcoming.push(evt);
      } else {
        past.push(evt);
      }
    });

    // Sort upcoming ascending (nearest first)
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // Sort past descending (most recent first)
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events, activeTab]);

  // Calendar Helpers
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const changeMonth = (offset: number) => {
    setCalendarDate(new Date(year, month + offset, 1));
  };

  // Map events by date string YYYY-MM-DD
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    events.forEach((evt) => {
      const d = new Date(evt.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const list = map.get(key) || [];
      list.push(evt);
      map.set(key, list);
    });
    return map;
  }, [events]);

  const selectedDateEvents = selectedCalendarDate
    ? eventsByDate.get(selectedCalendarDate) || []
    : [];

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-24 pb-24">
      {/* Hero Section per PRD Sec. 2 */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-white/5">
        <div className="absolute inset-0 bg-radial-gradient from-slate-900/60 via-[#070b19] to-[#070b19]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs uppercase tracking-widest font-bold mb-6">
            <Sparkles size={14} /> Executive Event Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
            GBN CIRCLE EVENTS
          </h1>

          <p className="text-xl sm:text-2xl font-serif text-[#c5a059] mt-3 font-light">
            Connect. Meet. Collaborate.
          </p>

          <p className="text-slate-300 max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-relaxed font-light">
            Discover upcoming GBN Circle experiences, business conversations and networking opportunities designed to build meaningful professional relationships.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#events-directory"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg hover:scale-105 transition-all"
            >
              Explore Upcoming Events <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Control Bar: View Toggle & Filters */}
      <section id="events-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          {/* Format Tabs */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            {(['ALL', 'ONLINE', 'PHYSICAL'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-[#c5a059] text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'ALL' ? 'All Sessions' : tab === 'ONLINE' ? 'Virtual Meets' : 'In-Person Summits'}
              </button>
            ))}
          </div>

          {/* View Mode Toggle (List vs Calendar per Sec. 26) */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('LIST')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'LIST'
                  ? 'bg-slate-800 text-[#c5a059] border border-[#c5a059]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List size={14} /> List View
            </button>
            <button
              onClick={() => setViewMode('CALENDAR')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'CALENDAR'
                  ? 'bg-slate-800 text-[#c5a059] border border-[#c5a059]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CalendarIcon size={14} /> Calendar View
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c5a059]"></div>
          </div>
        ) : viewMode === 'LIST' ? (
          /* ============================================================ */
          /* LIST VIEW: UPCOMING & PAST SEGREGATION (Sec. 3 & 25)          */
          /* ============================================================ */
          <div className="space-y-16">
            {/* Upcoming Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[#c5a059] text-[11px] uppercase font-bold tracking-widest">
                    Live Schedule
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    Upcoming Sessions ({upcomingEvents.length})
                  </h2>
                </div>
              </div>

              {upcomingEvents.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
                  <CalendarIcon size={36} className="mx-auto text-slate-600 mb-3" />
                  <p className="text-slate-400 text-sm">No upcoming sessions currently scheduled.</p>
                  <p className="text-slate-500 text-xs mt-1">Check back shortly or explore past concluded sessions below.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="bg-slate-900/60 border border-slate-800 hover:border-[#c5a059]/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group shadow-lg hover:shadow-[#c5a059]/5"
                    >
                      {/* Event Image */}
                      <div className="relative h-52 w-full bg-slate-950 overflow-hidden">
                        <Image
                          src={evt.image || '/event-networking-BdmXOEy2 (1).jpg'}
                          alt={evt.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                        <div className="absolute top-4 left-4 flex gap-2">
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-md ${
                              evt.tier === 'GBN Elite'
                                ? 'bg-[#c5a059] text-black font-extrabold'
                                : 'bg-blue-950/90 text-blue-300 border border-blue-800/50'
                            }`}
                          >
                            {evt.tier}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-black/70 text-slate-200 border border-white/10 flex items-center gap-1">
                            {evt.format.toLowerCase() === 'online' ? <Video size={11} className="text-[#c5a059]" /> : <MapPin size={11} className="text-[#c5a059]" />}
                            {evt.format}
                          </span>
                          {evt.status === 'CANCELLED' && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-950/90 text-red-300 border border-red-700/80">
                              Cancelled
                            </span>
                          )}
                          {(evt.status === 'ACCESS_CLOSED' || evt.status === 'CLOSED') && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-700/80">
                              Access Closed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Event Meta */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-xs text-[#c5a059] font-medium tracking-wide flex items-center gap-1.5">
                            <Clock size={12} />
                            {new Date(evt.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}{' '}
                            &bull; {evt.startTime} - {evt.endTime} ({evt.timezone})
                          </div>

                          <h3 className="text-lg font-bold font-serif text-white mt-2 group-hover:text-[#c5a059] transition-colors leading-snug">
                            {evt.title}
                          </h3>

                          <p className="text-slate-400 text-xs mt-2.5 line-clamp-3 leading-relaxed">
                            {evt.shortDescription}
                          </p>

                          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Eligibility:</span>
                              <span className="text-slate-300 font-medium text-right truncate max-w-[170px]" title={evt.eligibility}>
                                {evt.eligibility}
                              </span>
                            </div>
                            {evt.venueName && (
                              <div className="flex justify-between">
                                <span className="text-slate-500">Venue:</span>
                                <span className="text-slate-300 text-right truncate max-w-[170px]">
                                  {evt.venueName}, {evt.venueCity}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-slate-500">Access Fee:</span>
                              <span className="text-[#c5a059] font-semibold">{evt.fee}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
                          <Link
                            href={`/events/${evt.id}`}
                            className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs tracking-wider uppercase rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                          >
                            Details <ExternalLink size={12} />
                          </Link>

                          {evt.status === 'CANCELLED' ? (
                            <span className="flex-1 py-2.5 px-2 bg-red-950/60 border border-red-800/60 text-red-300 font-bold text-[11px] uppercase tracking-wider rounded-lg text-center cursor-not-allowed">
                              Cancelled
                            </span>
                          ) : evt.status === 'ACCESS_CLOSED' || evt.status === 'CLOSED' ? (
                            <span className="flex-1 py-2.5 px-2 bg-amber-950/60 border border-amber-800/60 text-amber-300 font-bold text-[11px] uppercase tracking-wider rounded-lg text-center cursor-not-allowed">
                              Access Closed
                            </span>
                          ) : evt.allowVisitorRequests ? (
                            <button
                              onClick={() => {
                                setSelectedEvent(evt);
                                setSubmitStatus(null);
                              }}
                              className="flex-1 py-2.5 px-3 bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-black font-bold text-xs tracking-wider uppercase rounded-lg transition-all shadow-md text-center"
                            >
                              Request Pass
                            </button>
                          ) : (
                            <span className="flex-1 py-2.5 px-2 bg-slate-900 border border-slate-800 text-slate-500 font-semibold text-[11px] uppercase tracking-wider rounded-lg text-center cursor-not-allowed">
                              Members Only
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Events Section (PRD Sec. 3 & 25) */}
            {pastEvents.length > 0 && (
              <div className="pt-8 border-t border-slate-800/80">
                <div className="mb-8">
                  <span className="text-slate-500 text-[11px] uppercase font-bold tracking-widest">
                    Archive & Past Meets
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-300 mt-1">
                    Concluded Sessions ({pastEvents.length})
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Browse past business masterminds and chapter gatherings hosted by GBN Circle.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="bg-slate-950/70 border border-slate-800/70 opacity-80 hover:opacity-100 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
                    >
                      <div className="relative h-44 w-full bg-slate-950 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <Image
                          src={evt.image || '/event-networking-BdmXOEy2 (1).jpg'}
                          alt={evt.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            Concluded
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {new Date(evt.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                          <h3 className="text-base font-bold text-slate-200 mt-1.5 line-clamp-2">
                            {evt.title}
                          </h3>
                          <p className="text-slate-400 text-xs mt-2 line-clamp-2">
                            {evt.shortDescription}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-800/60">
                          <Link
                            href={`/events/${evt.id}`}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            View Overview <ExternalLink size={11} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ============================================================ */
          /* CALENDAR VIEW (Sec. 26)                                      */
          /* ============================================================ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calendar Grid (lg:col-span-8) */}
            <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#c5a059]">
                    Monthly Schedule
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    {calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Previous Month"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCalendarDate(new Date())}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => changeMonth(1)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Next Month"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Date Cells */}
              <div className="grid grid-cols-7 gap-2 pt-3">
                {/* Empty slots for starting offset */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-20 sm:h-24 rounded-xl opacity-0 pointer-events-none" />
                ))}

                {/* Days of Month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                  const dayEvents = eventsByDate.get(dateStr) || [];
                  const isSelected = selectedCalendarDate === dateStr;
                  const isToday =
                    new Date().getDate() === dayNum &&
                    new Date().getMonth() === month &&
                    new Date().getFullYear() === year;

                  return (
                    <button
                      key={dayNum}
                      onClick={() => setSelectedCalendarDate(dateStr)}
                      className={`h-20 sm:h-24 p-2 rounded-xl border flex flex-col justify-between text-left transition-all relative ${
                        isSelected
                          ? 'bg-[#c5a059]/15 border-[#c5a059] shadow-lg shadow-[#c5a059]/10'
                          : dayEvents.length > 0
                          ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-950/30 border-transparent hover:border-slate-850 opacity-70'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span
                          className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                            isToday
                              ? 'bg-[#c5a059] text-black'
                              : isSelected
                              ? 'text-[#c5a059]'
                              : 'text-slate-300'
                          }`}
                        >
                          {dayNum}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
                        )}
                      </div>

                      {/* Micro event indicator badges */}
                      {dayEvents.length > 0 ? (
                        <div className="w-full space-y-1 overflow-hidden">
                          {dayEvents.slice(0, 1).map((ev) => (
                            <div
                              key={ev.id}
                              className="text-[9px] truncate px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[#c5a059]"
                            >
                              {ev.title}
                            </div>
                          ))}
                          {dayEvents.length > 1 && (
                            <div className="text-[8px] text-slate-400 font-mono">
                              +{dayEvents.length - 1} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-700"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Date Event Spotlight (lg:col-span-4) */}
            <div className="lg:col-span-4 bg-[#0b1021] border border-[#c5a059]/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059]">
                  Date Inspector
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {selectedCalendarDate
                    ? new Date(selectedCalendarDate + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Select a Date'}
                </h3>

                <div className="mt-6 space-y-4">
                  {selectedDateEvents.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      <CalendarIcon size={32} className="mx-auto text-slate-600 mb-2" />
                      No events scheduled for this selected date.
                      <p className="text-slate-500 mt-1">Select a highlighted date with a dot on the calendar.</p>
                    </div>
                  ) : (
                    selectedDateEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-[#c5a059]/40 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between text-[10px] uppercase font-semibold">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#c5a059]">{evt.tier}</span>
                            {evt.status === 'CANCELLED' && (
                              <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 text-[9px] font-bold">
                                Cancelled
                              </span>
                            )}
                            {(evt.status === 'ACCESS_CLOSED' || evt.status === 'CLOSED') && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[9px] font-bold">
                                Closed
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400">{evt.format}</span>
                        </div>

                        <h4 className="text-sm font-bold font-serif text-white">{evt.title}</h4>

                        <div className="text-xs text-slate-300 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Clock size={12} className="text-[#c5a059]" />
                            <span>
                              {evt.startTime} - {evt.endTime} ({evt.timezone})
                            </span>
                          </div>
                          {evt.venueName && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <MapPin size={12} className="text-[#c5a059]" />
                              <span className="truncate">{evt.venueName}, {evt.venueCity}</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 flex items-center gap-2">
                          <Link
                            href={`/events/${evt.id}`}
                            className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-center text-xs font-semibold rounded-lg transition-colors"
                          >
                            View Details
                          </Link>
                          {evt.status === 'CANCELLED' ? (
                            <span className="flex-1 py-2 bg-red-950/60 border border-red-800/60 text-red-300 text-center text-xs font-bold rounded-lg cursor-not-allowed uppercase">
                              Cancelled
                            </span>
                          ) : evt.status === 'ACCESS_CLOSED' || evt.status === 'CLOSED' ? (
                            <span className="flex-1 py-2 bg-amber-950/60 border border-amber-800/60 text-amber-300 text-center text-xs font-bold rounded-lg cursor-not-allowed uppercase">
                              Closed
                            </span>
                          ) : evt.allowVisitorRequests ? (
                            <button
                              onClick={() => {
                                setSelectedEvent(evt);
                                setSubmitStatus(null);
                              }}
                              className="flex-1 py-2 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black text-center text-xs font-bold rounded-lg uppercase tracking-wider"
                            >
                              Request Pass
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Verified member footer note */}
              <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <ShieldCheck size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
                <span>
                  GBN Circle members have automatic access to all sessions. No per-event booking needed.
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Visitor Screening Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b1021] border border-[#c5a059]/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl p-1"
            >
              &times;
            </button>

            <div className="mb-6">
              <span className="text-[#c5a059] text-[10px] uppercase font-bold tracking-widest">
                Visitor Screening & Pass Request
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Apply to Attend: {selectedEvent.title}
              </h2>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                GBN Circle sessions maintain high-table peer confidentiality. Complete this brief credential verification to request a visitor delegation pass.
              </p>
            </div>

            {submitStatus?.success ? (
              <div className="p-8 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-white">Application Received</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {submitStatus.message}
                </p>
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    setSubmitStatus(null);
                  }}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {submitStatus?.success === false && (
                  <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-lg text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle size={15} />
                    {submitStatus.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@company.com"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="India">India</option>
                      <option value="Georgia">Georgia</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai, Tbilisi"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Apex Global Corp"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Designation *
                    </label>
                    <input
                      type="text"
                      name="designation"
                      required
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Managing Director"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Industry *
                    </label>
                    <input
                      type="text"
                      name="industry"
                      required
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="e.g. Real Estate, Logistics"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Company Website (Optional)
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://company.com"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Why do you wish to attend this session? *
                  </label>
                  <textarea
                    name="whyAttend"
                    required
                    rows={2}
                    value={formData.whyAttend}
                    onChange={handleInputChange}
                    placeholder="State your purpose for attending this specific session..."
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    What collaboration or business value are you looking to create? *
                  </label>
                  <textarea
                    name="collaborationGoals"
                    required
                    rows={2}
                    value={formData.collaborationGoals}
                    onChange={handleInputChange}
                    placeholder="e.g. Seeking cross-border distribution, strategic investments..."
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md disabled:opacity-50"
                  >
                    {submitting ? 'Submitting Application...' : 'Submit Attendance Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}