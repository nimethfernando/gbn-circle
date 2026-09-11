'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  ShieldCheck,
  Users,
  CheckCircle2,
  Mail,
  Phone,
  ArrowLeft,
  Share2,
  Sparkles,
  AlertCircle,
  Key,
} from 'lucide-react';

export interface EventDetailData {
  id: string;
  title: string;
  type: string;
  tier: string;
  format: string;
  date: string | Date;
  startTime: string;
  endTime: string;
  timezone: string;
  image: string;
  shortDescription: string;
  fullDescription?: string | null;
  eligibility: string;
  fee: string;
  capacity?: number | null;
  venueName?: string | null;
  venueAddress?: string | null;
  venueCity?: string | null;
  venueCountry?: string | null;
  speakerHost?: string | null;
  agenda?: string | null;
  whatToExpect?: string | null;
  additionalInfo?: string | null;
  supportContact?: string | null;
  allowVisitorRequests: boolean;
  status: string;
}

export default function EventDetailView({ event }: { event: EventDetailData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Member Access & Status Verification state (PRD Sec. 5 & 24)
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [accessData, setAccessData] = useState<{
    state: string;
    label: string;
    disabled: boolean;
    isMember?: boolean;
    memberName?: string | null;
    memberTier?: string | null;
    meetingAccessUrl?: string | null;
    meetingId?: string | null;
    passcode?: string | null;
    message?: string;
  } | null>(null);

  const handleLookupAccess = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!lookupEmail.trim()) return;

    setLookupLoading(true);
    try {
      const res = await fetch(`/api/events/${event.id}?email=${encodeURIComponent(lookupEmail.trim().toLowerCase())}`);
      const json = await res.json();
      if (json.success && json.data) {
        const bl = json.data.buttonLogic;
        setAccessData({
          state: bl.state,
          label: bl.label,
          disabled: bl.disabled,
          isMember: bl.isMember,
          memberName: bl.memberName,
          memberTier: bl.memberTier,
          meetingAccessUrl: json.data.meetingAccessUrl,
          meetingId: json.data.meetingId,
          passcode: json.data.passcode,
          message:
            bl.state === 'JOIN_MEETING'
              ? `Welcome, ${bl.memberName}! As a verified ${bl.memberTier} member, you have direct VIP session access.`
              : bl.state === 'ACCESS_MEETING'
              ? 'Your visitor application has been approved by the screening committee. Your meeting credentials are now unlocked.'
              : bl.state === 'REQUEST_SUBMITTED'
              ? 'Your visitor application is currently under executive screening. We will notify you via email.'
              : bl.state === 'REQUEST_NOT_APPROVED'
              ? 'Your visitor application was not approved for this session.'
              : 'Email not recognized as an active member or applicant. You can apply for a visitor pass below.',
        });

        // If applicant not found and visitor requests open, prefill modal email
        if (bl.state === 'REQUEST_TO_ATTEND') {
          setFormData((prev) => ({ ...prev, email: lookupEmail.trim() }));
        }
      }
    } catch {
      alert('Unable to verify credentials. Please check your network connection.');
    } finally {
      setLookupLoading(false);
    }
  };

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

  const eventDate = new Date(event.date);
  const isPast = eventDate.getTime() < new Date().setHours(0, 0, 0, 0);

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/events/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          ...formData,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setRequestSubmitted(true);
        setSubmitStatus({
          success: true,
          message: 'Your visitor request has been submitted for executive review. You will receive an email confirmation shortly.',
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
          message: json.message || 'Failed to submit visitor request. Please try again.',
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

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Parse default or custom what to expect (Sec. 23)
  const defaultExpectations = [
    'Welcome & Opening',
    'Member Introductions',
    '2–3 Business Presentations',
    'Interaction & Strategic Roundtable',
    'Networking & Opportunity Exchange',
    'Closing & Collaboration Next Steps',
  ];

  const expectationsList = event.whatToExpect
    ? event.whatToExpect.split('\n').filter((line) => line.trim().length > 0)
    : defaultExpectations;

  // Parse default or custom agenda
  const defaultAgenda = [
    { time: '15 Mins', title: 'Executive Welcome & Chapter Opening', desc: 'Welcome address, overview of present chapters, and protocol outline.' },
    { time: '30 Mins', title: 'Keynote & Strategic Industry Roundtable', desc: 'Focus topic briefing and open discussion among founders and leaders.' },
    { time: '30 Mins', title: 'Curated Introductions & Collaboration Pitches', desc: 'Structured peer spotlights and bilateral opportunity alignment.' },
    { time: '30 Mins', title: 'Executive Breakout Rooms & Matchmaking', desc: 'Small-group discussions based on industry vertical and global expansion goals.' },
    { time: '15 Mins', title: 'Synthesis & Post-Session Action Points', desc: 'Direct referral handoffs, directory exchanges, and next session calendar.' },
  ];

  const isOnline = event.format.toLowerCase() === 'online';

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-24 pb-20">
      {/* Breadcrumb & Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-[#c5a059] transition-colors"
          >
            <ArrowLeft size={14} /> Back to All Events
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-[#c5a059]/40 transition-colors"
              title="Share event link"
            >
              <Share2 size={13} /> {copied ? 'Link Copied!' : 'Share'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={event.image || '/event-networking-BdmXOEy2 (1).jpg'}
              alt={event.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-[#070b19]/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b19] via-[#070b19]/60 to-transparent"></div>
          </div>

          {/* Banner Floating Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span
                className={`text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded shadow-sm ${
                  event.tier === 'GBN Elite'
                    ? 'bg-[#c5a059] text-black font-extrabold'
                    : 'bg-blue-950/90 text-blue-300 border border-blue-700/50'
                }`}
              >
                {event.tier}
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded bg-black/70 text-slate-200 border border-white/10 flex items-center gap-1.5">
                {isOnline ? <Video size={13} className="text-[#c5a059]" /> : <MapPin size={13} className="text-[#c5a059]" />}
                {event.format}
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded bg-slate-900/80 text-[#c5a059] border border-[#c5a059]/30">
                {event.type}
              </span>
              {event.status === 'CANCELLED' && (
                <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded bg-red-950/90 text-red-300 border border-red-700/80 animate-pulse">
                  Cancelled
                </span>
              )}
              {(event.status === 'ACCESS_CLOSED' || event.status === 'CLOSED') && (
                <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded bg-amber-950/90 text-amber-300 border border-amber-700/80">
                  Access Closed
                </span>
              )}
              {isPast && event.status !== 'CANCELLED' && (
                <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">
                  Concluded
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-tight max-w-4xl">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#c5a059]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#c5a059]" />
                <span>
                  {event.startTime} - {event.endTime} ({event.timezone})
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <>
                    <Video size={16} className="text-[#c5a059]" />
                    <span>Virtual Boardroom (Zoom / Direct Link)</span>
                  </>
                ) : (
                  <>
                    <MapPin size={16} className="text-[#c5a059]" />
                    <span>
                      {event.venueName ? `${event.venueName}, ${event.venueCity}` : 'In-Person Summit'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left / Main Details (col-span-8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* About Section */}
            <section className="bg-slate-900/40 border border-slate-800/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-3 flex items-center gap-2">
                <Sparkles size={14} /> About This Session
              </h2>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
                Overview & Strategic Scope
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {event.fullDescription || event.shortDescription}
              </p>
              {event.additionalInfo && (
                <div className="mt-6 pt-6 border-t border-slate-800 text-slate-400 text-xs sm:text-sm leading-relaxed">
                  <span className="text-[#c5a059] font-semibold block mb-1">Additional Information:</span>
                  {event.additionalInfo}
                </div>
              )}
            </section>

            {/* What to Expect Section */}
            <section className="bg-slate-900/40 border border-slate-800/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-3">
                Session Experience
              </h2>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
                What to Expect
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expectationsList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg hover:border-[#c5a059]/40 transition-colors"
                  >
                    <CheckCircle2 size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-normal">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Agenda & Schedule */}
            <section className="bg-slate-900/40 border border-slate-800/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-3">
                Execution Framework
              </h2>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
                Agenda & Schedule Breakdown
              </h3>
              {event.agenda ? (
                <div className="space-y-4">
                  {event.agenda.split('\n').filter((l) => l.trim()).map((line, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-lg bg-slate-950/60 border border-slate-800"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#c5a059]/20 text-[#c5a059] font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed">{line}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {defaultAgenda.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 rounded-lg bg-slate-950/60 border border-slate-800/80"
                    >
                      <div className="sm:w-24 shrink-0 text-xs font-mono font-semibold text-[#c5a059] bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-center">
                        {item.time}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Speaker / Host */}
            {event.speakerHost && (
              <section className="bg-slate-900/40 border border-slate-800/90 rounded-xl p-6 sm:p-8">
                <h2 className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-3">
                  Distinguished Leadership
                </h2>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
                  Session Host & Keynote
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 bg-slate-950/60 border border-slate-800 rounded-lg">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#e5c158] flex items-center justify-center text-black font-bold text-xl shadow-lg shrink-0">
                    {event.speakerHost.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{event.speakerHost}</h4>
                    <p className="text-xs text-[#c5a059] mt-0.5">GBN Executive Leadership & Session Chair</p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Facilitating bilateral collaboration and curated introductions for verified enterprise participants.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Venue / Platform Access Details */}
            <section className="bg-slate-900/40 border border-slate-800/90 rounded-xl p-6 sm:p-8">
              <h2 className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-3">
                Location & Accessibility
              </h2>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
                {isOnline ? 'Virtual Boardroom Access' : 'In-Person Venue Information'}
              </h3>
              {isOnline ? (
                <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-lg space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <Video size={18} className="text-[#c5a059]" />
                    <span>Conducted via GBN Secure Zoom Enterprise Infrastructure</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    To maintain strict high-table privacy, direct boardroom URLs and entry passcodes are issued only to verified members and administrative approved visitors via email 2 hours prior to the session start.
                  </p>
                </div>
              ) : (
                <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-lg space-y-3">
                  <div className="text-sm font-semibold text-white">
                    {event.venueName || 'Executive Summit Facility'}
                  </div>
                  {event.venueAddress && (
                    <p className="text-xs text-slate-300">
                      {event.venueAddress}
                    </p>
                  )}
                  <p className="text-xs text-slate-400">
                    {[event.venueCity, event.venueCountry].filter(Boolean).join(', ')}
                  </p>
                  <p className="text-[11px] text-[#c5a059] pt-2">
                    * Valet parking and executive hospitality provided for all registered delegates.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Sticky Card (col-span-4) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#0b1021] border border-[#c5a059]/30 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059]">
                  Attendance Pass
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-white">
                    {event.fee}
                  </span>
                  <span className="text-xs text-slate-400">
                    {event.capacity ? `Limited to ${event.capacity} seats` : 'Selective Seating'}
                  </span>
                </div>
              </div>

              {/* Action Button (PRD Sec. 24 exact button states) */}
              <div className="pt-2">
                {event.status === 'CANCELLED' ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-red-950/80 border border-red-800/80 text-red-300 font-bold text-xs uppercase tracking-wider rounded-lg cursor-not-allowed text-center"
                  >
                    Event Cancelled
                  </button>
                ) : event.status === 'ACCESS_CLOSED' || event.status === 'CLOSED' ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-amber-950/80 border border-amber-800/80 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-lg cursor-not-allowed text-center"
                  >
                    Access Closed
                  </button>
                ) : isPast ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-slate-800 text-slate-500 font-semibold text-xs uppercase tracking-wider rounded-lg cursor-not-allowed text-center"
                  >
                    Event Concluded
                  </button>
                ) : accessData?.state === 'JOIN_MEETING' ? (
                  <a
                    href={accessData.meetingAccessUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-black font-bold text-xs tracking-widest uppercase rounded-lg transition-all shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 text-center"
                  >
                    <Video size={16} /> Join Meeting
                  </a>
                ) : accessData?.state === 'ACCESS_MEETING' ? (
                  <a
                    href={accessData.meetingAccessUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-black font-bold text-xs tracking-widest uppercase rounded-lg transition-all shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 text-center"
                  >
                    <Video size={16} /> Access Meeting
                  </a>
                ) : accessData?.state === 'REQUEST_SUBMITTED' || requestSubmitted ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-amber-950/70 border border-amber-700/80 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-lg cursor-not-allowed text-center flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={15} /> Request Submitted
                  </button>
                ) : accessData?.state === 'REQUEST_NOT_APPROVED' ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-red-950/70 border border-red-800/80 text-red-300 font-bold text-xs uppercase tracking-wider rounded-lg cursor-not-allowed text-center"
                  >
                    Request Not Approved
                  </button>
                ) : event.allowVisitorRequests ? (
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setSubmitStatus(null);
                    }}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-black font-bold text-xs tracking-widest uppercase rounded-lg transition-all shadow-lg hover:scale-[1.02]"
                  >
                    Request to Attend
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-slate-800/80 border border-slate-700 text-slate-400 font-semibold text-xs uppercase tracking-wider rounded-lg cursor-not-allowed text-center"
                  >
                    Members Only Session
                  </button>
                )}
              </div>

              {/* Private Meeting Credentials Reveal Box (Rule 7 & Sec. 24) */}
              {(accessData?.state === 'JOIN_MEETING' || accessData?.state === 'ACCESS_MEETING') && (
                <div className="p-4 bg-gradient-to-br from-slate-900 to-amber-950/30 border border-[#c5a059]/40 rounded-xl space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                    <Key size={15} /> Private Meeting Credentials
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {accessData.meetingId && (
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="text-slate-400">Meeting ID:</span>
                        <span className="font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {accessData.meetingId}
                        </span>
                      </div>
                    )}
                    {accessData.passcode && (
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="text-slate-400">Passcode:</span>
                        <span className="font-mono font-bold text-[#c5a059] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {accessData.passcode}
                        </span>
                      </div>
                    )}
                  </div>
                  {accessData.meetingAccessUrl && (
                    <a
                      href={accessData.meetingAccessUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-center text-xs uppercase tracking-wider rounded transition"
                    >
                      Open Zoom Boardroom
                    </a>
                  )}
                </div>
              )}

              {/* Member Identification & Status Verification (PRD Sec. 5 & 24) */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#c5a059] uppercase tracking-wider">
                  <ShieldCheck size={15} /> GBN Member / Visitor Verification
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                  Approved members have automatic access without registering. Enter your registered email to verify and unlock meeting access.
                </p>

                <form onSubmit={handleLookupAccess} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={lookupEmail}
                      onChange={(e) => setLookupEmail(e.target.value)}
                      placeholder="Enter registered email..."
                      className="flex-1 min-w-0 bg-slate-950 border border-slate-800 focus:border-[#c5a059] rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={lookupLoading || !lookupEmail.trim()}
                      className="px-3 py-1.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs rounded uppercase tracking-wider transition disabled:opacity-50 shrink-0"
                    >
                      {lookupLoading ? '...' : 'Verify'}
                    </button>
                  </div>

                  {accessData?.message && (
                    <div
                      className={`p-2.5 rounded text-[11px] border leading-relaxed ${
                        accessData.state === 'JOIN_MEETING' || accessData.state === 'ACCESS_MEETING'
                          ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                          : accessData.state === 'REQUEST_SUBMITTED'
                          ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                          : accessData.state === 'REQUEST_NOT_APPROVED'
                          ? 'bg-red-950/60 border-red-800 text-red-300'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      {accessData.message}
                    </div>
                  )}
                </form>
              </div>

              {/* Key Details Snapshot */}
              <div className="border-t border-slate-800 pt-5 space-y-3.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#c5a059]" /> Date
                  </span>
                  <span className="text-slate-200 font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock size={13} className="text-[#c5a059]" /> Time
                  </span>
                  <span className="text-slate-200 font-medium">
                    {event.startTime} - {event.endTime} ({event.timezone})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users size={13} className="text-[#c5a059]" /> Eligibility
                  </span>
                  <span className="text-slate-200 font-medium text-right max-w-[160px] truncate" title={event.eligibility}>
                    {event.eligibility}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#c5a059]" /> Tier Access
                  </span>
                  <span className="text-[#c5a059] font-medium">{event.tier}</span>
                </div>
              </div>

              {/* Support Contact */}
              <div className="border-t border-slate-800 pt-5 text-xs text-slate-400 space-y-2">
                <div className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
                  Executive Inquiries
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#c5a059]" />
                  <a href={`mailto:${event.supportContact || 'gbncircle@gmail.com'}`} className="hover:text-white transition-colors">
                    {event.supportContact || 'gbncircle@gmail.com'}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#c5a059]" />
                  <a href="tel:+919783577773" className="hover:text-white transition-colors">
                    +91 9783577773
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Screening Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b1021] border border-[#c5a059]/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl p-1"
            >
              &times;
            </button>

            <div className="mb-6">
              <span className="text-[#c5a059] text-[10px] uppercase font-bold tracking-widest">
                Visitor Screening & Access Application
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-serif">
                Apply to Attend: {event.title}
              </h2>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                GBN Circle sessions maintain executive peer confidentiality. Complete this professional verification form to request a visitor delegation seat.
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
                    setModalOpen(false);
                    setSubmitStatus(null);
                  }}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Return to Event
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
                      placeholder="e.g. Real Estate, Tech"
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
                    placeholder="Briefly state your purpose for joining this specific GBN Circle event..."
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
                    placeholder="e.g. Looking to connect with supply chain partners, strategic investors, export distributors..."
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
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
