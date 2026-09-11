'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface VisitorRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  designation: string;
  whyAttend: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string;
  createdAt: string;
  event: {
    title: string;
    date: string;
    format: string;
  };
}

interface AdminEvent {
  id: string;
  title: string;
  type: string;
  tier: string;
  format: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  shortDescription: string;
  eligibility: string;
  status: string;
  venueName?: string | null;
  venueCity?: string | null;
  privateMeetingLink?: string | null;
  speakerHost?: string | null;
  _count?: {
    requests: number;
  };
}

export default function AdminEventsDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState<VisitorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Events list state
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventFilter, setEventFilter] = useState<'ALL' | 'UPCOMING' | 'PAST' | 'DRAFT' | 'PUBLISHED'>('ALL');

  // Filter state for visitor requests
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // New Event Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'Online Networking',
    tier: 'GBN Circle',
    format: 'Online',
    date: '',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    shortDescription: '',
    eligibility: 'Founders with ₹20L+ annual turnover',
    fee: 'Free (Invite Only)',
    privateMeetingLink: '',
    meetingId: '',
    passcode: '',
  });

  const loadRequests = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/requests');
      const json = await res.json();
      if (json.success) setRequests(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadEvents = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/events');
      const json = await res.json();
      if (json.success) setEvents(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setEventsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const [reqRes, evtRes] = await Promise.all([
          fetch('/api/admin/requests'),
          fetch('/api/admin/events'),
        ]);
        const reqJson = await reqRes.json();
        const evtJson = await evtRes.json();
        if (!ignore) {
          if (reqJson.success) setRequests(reqJson.data);
          if (evtJson.success) setEvents(evtJson.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!ignore) {
          setLoading(false);
          setEventsLoading(false);
        }
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      setLoggingOut(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        alert('Event created and published successfully!');
        await loadEvents();
        setFormData({
          title: '',
          type: 'Online Networking',
          tier: 'GBN Circle',
          format: 'Online',
          date: '',
          startTime: '09:00 AM',
          endTime: '11:00 AM',
          shortDescription: '',
          eligibility: 'Founders with ₹20L+ annual turnover',
          fee: 'Free (Invite Only)',
          privateMeetingLink: '',
          meetingId: '',
          passcode: '',
        });
      } else {
        alert(json.message || 'Error creating event');
      }
    } catch {
      alert('Network error creating event');
    }
  };

  const handleStatusUpdate = async (id: string, action: 'approve' | 'reject') => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/requests/${id}/${action}`, {
        method: 'POST',
      });
      const json = await res.json();
      if (json.success) {
        await loadRequests();
        await loadEvents();
      } else {
        alert(json.message);
      }
    } catch {
      alert(`Failed to ${action} request`);
    } finally {
      setActionLoading(null);
    }
  };

  // Metrics calculation
  const totalEventsCount = events.length;
  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = requests.filter((r) => r.status === 'REJECTED').length;

  // Filtered events calculation
  const now = new Date();
  const filteredEvents = events.filter((evt) => {
    const evtDate = new Date(evt.date);
    if (eventFilter === 'UPCOMING') return evtDate >= now;
    if (eventFilter === 'PAST') return evtDate < now;
    if (eventFilter === 'DRAFT') return evt.status.toUpperCase() === 'DRAFT';
    if (eventFilter === 'PUBLISHED') return evt.status.toUpperCase() === 'PUBLISHED';
    return true;
  });

  // Filtered requests list
  const filteredRequests = requests.filter((req) => {
    const matchesFilter = filterStatus === 'ALL' || req.status === filterStatus;
    const matchesSearch =
      req.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Admin Session Active
            </span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-[#c5a059] mt-1">Event Administration</h1>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="self-start sm:self-center px-4 py-2 bg-slate-900 hover:bg-red-950/60 border border-slate-800 hover:border-red-600/50 text-slate-300 hover:text-red-300 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {loggingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>

      {/* Overview Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">Total Events</p>
          <p className="text-2xl font-bold text-white mt-1">{totalEventsCount}</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">Total Inquiries</p>
          <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
        </div>
        <div className="bg-slate-900/60 border border-yellow-900/30 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-yellow-500 tracking-wider">Pending Passes</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{pendingCount}</p>
        </div>
        <div className="bg-slate-900/60 border border-emerald-900/30 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-emerald-400 tracking-wider">Approved Passes</p>
          <p className="text-2xl font-bold text-emerald-300 mt-1">{approvedCount}</p>
        </div>
        <div className="bg-slate-900/60 border border-red-900/30 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-red-400 tracking-wider">Rejected</p>
          <p className="text-2xl font-bold text-red-300 mt-1">{rejectedCount}</p>
        </div>
      </div>

      {/* 28. ADMIN EVENT LIST TABLE */}
      <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Events Directory &amp; Lifecycle</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30 font-semibold">
                {events.length} Total
              </span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Live, draft, and past events published to the GBN Circle platform.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {(['ALL', 'UPCOMING', 'PAST', 'PUBLISHED', 'DRAFT'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setEventFilter(filter)}
                className={`px-3 py-1 rounded font-semibold transition ${
                  eventFilter === filter
                    ? 'bg-[#c5a059] text-black shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {eventsLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c5a059]"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg">
            <p className="text-slate-400 text-xs">No events found matching this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Event</th>
                  <th className="pb-3 font-semibold">Date &amp; Time</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Format</th>
                  <th className="pb-3 font-semibold">Audience</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-center">Requests</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 pr-4">
                      <div className="font-bold text-white text-sm">{evt.title}</div>
                      {evt.speakerHost && (
                        <div className="text-slate-400 text-[11px]">Host: {evt.speakerHost}</div>
                      )}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap text-slate-300">
                      <div>{new Date(evt.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      <div className="text-[11px] text-slate-500">{evt.startTime} - {evt.endTime} {evt.timezone}</div>
                    </td>
                    <td className="py-3 pr-4 text-slate-300 whitespace-nowrap">{evt.type}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        evt.format.toLowerCase() === 'online'
                          ? 'bg-blue-950 text-blue-300 border-blue-800/60'
                          : 'bg-purple-950 text-purple-300 border-purple-800/60'
                      }`}>
                        {evt.format}
                      </span>
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        evt.tier === 'GBN Elite'
                          ? 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {evt.tier}
                      </span>
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        evt.status === 'PUBLISHED'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                          : evt.status === 'DRAFT'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}>
                        {evt.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-center font-bold text-slate-200">
                      {evt._count?.requests ?? 0}
                    </td>
                    <td className="py-3 text-right whitespace-nowrap">
                      <a
                        href="/events"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-semibold transition inline-block"
                      >
                        View Live
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Creation Form */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-xl h-fit shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Create New Event</h2>
            <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-semibold">Direct Publish</span>
          </div>

          <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Event Title *</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
                >
                  <option value="GBN Circle">GBN Circle</option>
                  <option value="GBN Elite">GBN Elite</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Format</label>
                <select
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
                >
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Date *</label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Start Time</label>
                <input
                  type="text"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">End Time</label>
                <input
                  type="text"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Short Description *</label>
              <textarea
                required
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Private Zoom / Access Link</label>
              <input
                type="url"
                value={formData.privateMeetingLink}
                onChange={(e) => setFormData({ ...formData, privateMeetingLink: e.target.value })}
                placeholder="https://zoom.us/..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Meeting ID</label>
                <input
                  type="text"
                  value={formData.meetingId}
                  onChange={(e) => setFormData({ ...formData, meetingId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Passcode</label>
                <input
                  type="text"
                  value={formData.passcode}
                  onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase rounded text-xs tracking-wider transition shadow"
            >
              Publish Event
            </button>
          </form>
        </div>

        {/* Visitor Requests Review Board */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 p-6 rounded-xl shadow-lg flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h2 className="text-base font-bold text-white">Visitor Review Board</h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded font-semibold transition ${
                    filterStatus === st
                      ? 'bg-[#c5a059] text-black'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by applicant, company, email, or event title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:border-[#c5a059] outline-none"
            />
          </div>

          {/* Request items */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c5a059]"></div>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-lg">
              <p className="text-slate-400 text-xs">No visitor applications match your filter.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[720px] pr-1">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-slate-950 border border-slate-800/90 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:border-slate-700"
                >
                  <div className="text-xs space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{req.fullName}</span>

                      {/* Status Badges */}
                      {req.status === 'APPROVED' && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/80 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Approved
                        </span>
                      )}
                      {req.status === 'REJECTED' && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-950 text-red-400 border border-red-800/80 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span> Rejected
                        </span>
                      )}
                      {req.status === 'PENDING' && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-950 text-amber-400 border border-amber-800/80 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span> Pending Review
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400">
                      {req.designation} &bull; <strong className="text-slate-200">{req.companyName}</strong>
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      {req.email} &bull; {req.phone}
                    </p>
                    <p className="text-slate-400 pt-0.5">
                      Target Event: <span className="text-[#c5a059] font-medium">{req.event.title}</span>
                    </p>
                    <p className="text-slate-400 italic bg-slate-900/50 p-2 rounded text-[11px] border border-slate-800/60">
                      &quot;{req.whyAttend}&quot;
                    </p>
                  </div>

                  {/* Actions */}
                  {req.status === 'PENDING' ? (
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <button
                        disabled={actionLoading === req.id}
                        onClick={() => handleStatusUpdate(req.id, 'approve')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold disabled:opacity-50 transition shadow"
                      >
                        {actionLoading === req.id ? 'Saving...' : 'Approve'}
                      </button>
                      <button
                        disabled={actionLoading === req.id}
                        onClick={() => handleStatusUpdate(req.id, 'reject')}
                        className="px-3.5 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded text-xs font-semibold disabled:opacity-50 transition shadow"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-500 self-end md:self-center uppercase tracking-wider font-semibold">
                      Processed
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}