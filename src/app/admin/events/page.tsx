'use client';

import { useState, useEffect } from 'react';

interface VisitorRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  designation: string;
  whyAttend: string;
  status: string;
  event: {
    title: string;
    date: string;
  };
}

export default function AdminEventsDashboard() {
  const [requests, setRequests] = useState<VisitorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

  const loadRequests = async () => {
    try {
      const res = await fetch('/api/admin/requests');
      const json = await res.json();
      if (json.success) setRequests(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

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
      } else {
        alert(json.message);
      }
    } catch {
      alert(`Failed to ${action} request`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold font-serif text-[#c5a059] mb-8">Admin Control Panel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Event Creation Form */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-xl h-fit">
          <h2 className="text-lg font-bold mb-4 text-white">Create New Event</h2>
          <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Event Title *</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:border-[#c5a059] outline-none"
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
              <label className="block text-slate-400 mb-1">Private Zoom / Meet Link</label>
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
              className="w-full py-2.5 mt-2 bg-[#c5a059] text-black font-bold uppercase rounded hover:bg-[#d4af37] transition"
            >
              Publish Event
            </button>
          </form>
        </div>

        {/* Visitor Requests Review Board */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-lg font-bold mb-4 text-white">Visitor Review Board</h2>
          {loading ? (
            <p className="text-slate-400 text-xs">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-slate-400 text-xs">No pending requests found.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{req.fullName}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          req.status === 'APPROVED'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : req.status === 'REJECTED'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="text-slate-400">
                      {req.designation} at <strong className="text-slate-300">{req.companyName}</strong>
                    </p>
                    <p className="text-slate-500">
                      {req.email} &bull; {req.phone}
                    </p>
                    <p className="text-slate-400 pt-1">
                      Event: <span className="text-[#c5a059]">{req.event.title}</span>
                    </p>
                    <p className="text-slate-400 italic">&quot;{req.whyAttend}&quot;</p>
                  </div>

                  {req.status === 'PENDING' && (
                    <div className="flex items-center gap-2">
                      <button
                        disabled={actionLoading === req.id}
                        onClick={() => handleStatusUpdate(req.id, 'approve')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        disabled={actionLoading === req.id}
                        onClick={() => handleStatusUpdate(req.id, 'reject')}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-semibold disabled:opacity-50"
                      >
                        Reject
                      </button>
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