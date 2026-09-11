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
  fullDescription?: string | null;
  eligibility: string;
  fee: string;
  capacity?: number | null;
  status: string;
  venueName?: string | null;
  venueAddress?: string | null;
  venueCity?: string | null;
  venueCountry?: string | null;
  privateMeetingLink?: string | null;
  meetingId?: string | null;
  passcode?: string | null;
  speakerHost?: string | null;
  agenda?: string | null;
  whatToExpect?: string | null;
  additionalInfo?: string | null;
  supportContact?: string | null;
  allowVisitorRequests?: boolean;
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

  // Edit Event Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '',
    title: '',
    type: 'Online Networking',
    tier: 'GBN Circle',
    format: 'Online',
    date: '',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    timezone: 'IST',
    shortDescription: '',
    fullDescription: '',
    eligibility: '',
    fee: 'Free (Invite Only)',
    capacity: '',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueCountry: '',
    privateMeetingLink: '',
    meetingId: '',
    passcode: '',
    speakerHost: '',
    agenda: '',
    whatToExpect: '',
    additionalInfo: '',
    supportContact: '',
    allowVisitorRequests: true,
    status: 'PUBLISHED',
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

  const openEditModal = (evt: AdminEvent) => {
    const d = new Date(evt.date);
    const formattedDate = !isNaN(d.getTime())
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      : '';

    setEditFormData({
      id: evt.id,
      title: evt.title || '',
      type: evt.type || 'Online Networking',
      tier: evt.tier || 'GBN Circle',
      format: evt.format || 'Online',
      date: formattedDate,
      startTime: evt.startTime || '09:00 AM',
      endTime: evt.endTime || '11:00 AM',
      timezone: evt.timezone || 'IST',
      shortDescription: evt.shortDescription || '',
      fullDescription: evt.fullDescription || '',
      eligibility: evt.eligibility || '',
      fee: evt.fee || 'Free (Invite Only)',
      capacity: evt.capacity !== null && evt.capacity !== undefined ? String(evt.capacity) : '',
      venueName: evt.venueName || '',
      venueAddress: evt.venueAddress || '',
      venueCity: evt.venueCity || '',
      venueCountry: evt.venueCountry || '',
      privateMeetingLink: evt.privateMeetingLink || '',
      meetingId: evt.meetingId || '',
      passcode: evt.passcode || '',
      speakerHost: evt.speakerHost || '',
      agenda: evt.agenda || '',
      whatToExpect: evt.whatToExpect || '',
      additionalInfo: evt.additionalInfo || '',
      supportContact: evt.supportContact || '',
      allowVisitorRequests: evt.allowVisitorRequests ?? true,
      status: evt.status || 'PUBLISHED',
    });
    setEditModalOpen(true);
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.id) return;
    setEditSubmitting(true);
    try {
      const res = await fetch(`/api/admin/events/${editFormData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      const json = await res.json();
      if (json.success) {
        alert('Event updated successfully!');
        setEditModalOpen(false);
        await loadEvents();
      } else {
        alert(json.message || 'Failed to update event');
      }
    } catch {
      alert('Network error updating event');
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? All associated visitor requests will also be deleted.`)) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        alert('Event deleted successfully');
        await loadEvents();
        await loadRequests();
      } else {
        alert(json.message || 'Failed to delete event');
      }
    } catch {
      alert('Network error deleting event');
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
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(evt)}
                          className="px-2.5 py-1 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold rounded text-[11px] transition shadow-sm"
                        >
                          Edit
                        </button>
                        <a
                          href={`/events/${evt.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded text-[11px] font-semibold transition inline-block"
                        >
                          Live
                        </a>
                        <button
                          onClick={() => handleDeleteEvent(evt.id, evt.title)}
                          className="px-2 py-1 bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 rounded text-[11px] font-semibold transition inline-block"
                        >
                          Delete
                        </button>
                      </div>
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

      {/* Edit Event Modal (Sec. 9, 11, 29) */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b1021] border border-[#c5a059]/40 rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl p-1"
            >
              &times;
            </button>

            <div className="mb-6 border-b border-slate-800 pb-4">
              <span className="text-[#c5a059] text-[10px] uppercase font-bold tracking-widest">
                Lifecycle &amp; Configuration Management
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Edit Event: {editFormData.title || 'Untitled Session'}
              </h2>
              <p className="text-slate-400 text-xs mt-1 font-mono">
                Event ID: {editFormData.id}
              </p>
            </div>

            <form onSubmit={handleUpdateEvent} className="space-y-6 text-xs">
              {/* Status, Tier & Format */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
                  Lifecycle Status &amp; Tier
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Status *</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none font-semibold"
                    >
                      <option value="PUBLISHED">PUBLISHED (Live)</option>
                      <option value="DRAFT">DRAFT (Hidden)</option>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="COMPLETED">COMPLETED (Past)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Tier</label>
                    <select
                      value={editFormData.tier}
                      onChange={(e) => setEditFormData({ ...editFormData, tier: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    >
                      <option value="GBN Circle">GBN Circle</option>
                      <option value="GBN Elite">GBN Elite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Format</label>
                    <select
                      value={editFormData.format}
                      onChange={(e) => setEditFormData({ ...editFormData, format: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    >
                      <option value="Online">Online</option>
                      <option value="In-Person">In-Person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Type</label>
                    <input
                      type="text"
                      value={editFormData.type}
                      onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Event Title *</label>
                  <input
                    required
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none text-sm font-bold"
                  />
                </div>
              </div>

              {/* Date, Time & Capacity (Sec. 11, 29) */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
                  Schedule, Timing &amp; Capacity
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="col-span-2 sm:col-span-2">
                    <label className="block text-slate-400 mb-1 font-semibold">Date *</label>
                    <input
                      required
                      type="date"
                      value={editFormData.date}
                      onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Start Time *</label>
                    <input
                      required
                      type="text"
                      value={editFormData.startTime}
                      onChange={(e) => setEditFormData({ ...editFormData, startTime: e.target.value })}
                      placeholder="09:00 AM"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">End Time *</label>
                    <input
                      required
                      type="text"
                      value={editFormData.endTime}
                      onChange={(e) => setEditFormData({ ...editFormData, endTime: e.target.value })}
                      placeholder="11:00 AM"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Timezone</label>
                    <input
                      type="text"
                      value={editFormData.timezone}
                      onChange={(e) => setEditFormData({ ...editFormData, timezone: e.target.value })}
                      placeholder="IST"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Seat Capacity (Optional)</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 50 (leave empty for unlimited)"
                      value={editFormData.capacity}
                      onChange={(e) => setEditFormData({ ...editFormData, capacity: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Access Fee</label>
                    <input
                      type="text"
                      value={editFormData.fee}
                      onChange={(e) => setEditFormData({ ...editFormData, fee: e.target.value })}
                      placeholder="Free (Invite Only)"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Confidential Meeting Links & Credentials (Sec. 9, 11) */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
                    Confidential Meeting Link &amp; Credentials
                  </h3>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                    Secured by Rule 7
                  </span>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Private Meeting Link (Zoom / Webex / Meet)</label>
                  <input
                    type="url"
                    value={editFormData.privateMeetingLink}
                    onChange={(e) => setEditFormData({ ...editFormData, privateMeetingLink: e.target.value })}
                    placeholder="https://us02web.zoom.us/j/..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none font-mono text-[11px]"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    * This link is strictly guarded on the backend and never exposed on public endpoints.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Meeting ID</label>
                    <input
                      type="text"
                      value={editFormData.meetingId}
                      onChange={(e) => setEditFormData({ ...editFormData, meetingId: e.target.value })}
                      placeholder="e.g. 845 2910 4421"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Passcode</label>
                    <input
                      type="text"
                      value={editFormData.passcode}
                      onChange={(e) => setEditFormData({ ...editFormData, passcode: e.target.value })}
                      placeholder="e.g. 772910"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Physical Venue Details (if In-Person) */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
                  Physical Venue Details (In-Person Summits)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Venue Name</label>
                    <input
                      type="text"
                      value={editFormData.venueName}
                      onChange={(e) => setEditFormData({ ...editFormData, venueName: e.target.value })}
                      placeholder="e.g. The Grand Ballroom, Tbilisi"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">City</label>
                    <input
                      type="text"
                      value={editFormData.venueCity}
                      onChange={(e) => setEditFormData({ ...editFormData, venueCity: e.target.value })}
                      placeholder="e.g. Tbilisi, Jaipur, Dubai"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Address</label>
                    <input
                      type="text"
                      value={editFormData.venueAddress}
                      onChange={(e) => setEditFormData({ ...editFormData, venueAddress: e.target.value })}
                      placeholder="Street address or landmark"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Country</label>
                    <input
                      type="text"
                      value={editFormData.venueCountry}
                      onChange={(e) => setEditFormData({ ...editFormData, venueCountry: e.target.value })}
                      placeholder="e.g. Georgia, India, UAE"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Host, Eligibility & Content */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
                  Host, Audience &amp; Descriptions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Speaker / Session Host</label>
                    <input
                      type="text"
                      value={editFormData.speakerHost}
                      onChange={(e) => setEditFormData({ ...editFormData, speakerHost: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Kothari, Davit Kvirikashvili"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Support Contact</label>
                    <input
                      type="text"
                      value={editFormData.supportContact}
                      onChange={(e) => setEditFormData({ ...editFormData, supportContact: e.target.value })}
                      placeholder="gbncircle@gmail.com / +91 9783577773"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Eligibility Criteria *</label>
                  <input
                    required
                    type="text"
                    value={editFormData.eligibility}
                    onChange={(e) => setEditFormData({ ...editFormData, eligibility: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Short Description (Card Summary) *</label>
                  <textarea
                    required
                    rows={2}
                    value={editFormData.shortDescription}
                    onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Full Description (Detail Page)</label>
                  <textarea
                    rows={3}
                    value={editFormData.fullDescription}
                    onChange={(e) => setEditFormData({ ...editFormData, fullDescription: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Agenda / Schedule (One line per session item)</label>
                  <textarea
                    rows={3}
                    value={editFormData.agenda}
                    onChange={(e) => setEditFormData({ ...editFormData, agenda: e.target.value })}
                    placeholder="00:00 - 00:15: Welcome&#10;00:15 - 00:45: Keynote Discussion"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">What to Expect (One line per takeaway)</label>
                  <textarea
                    rows={3}
                    value={editFormData.whatToExpect}
                    onChange={(e) => setEditFormData({ ...editFormData, whatToExpect: e.target.value })}
                    placeholder="Structured high-level introductions&#10;Bilateral trade discovery"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] rounded p-2 text-white outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="allowVisitorRequestsEdit"
                    checked={editFormData.allowVisitorRequests}
                    onChange={(e) => setEditFormData({ ...editFormData, allowVisitorRequests: e.target.checked })}
                    className="h-4 w-4 rounded bg-slate-900 border-slate-800 text-[#c5a059] focus:ring-0"
                  />
                  <label htmlFor="allowVisitorRequestsEdit" className="text-slate-300 font-semibold cursor-pointer">
                    Allow non-member visitor pass applications
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase rounded tracking-wider shadow transition disabled:opacity-50"
                >
                  {editSubmitting ? 'Saving Changes...' : 'Save & Update Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}