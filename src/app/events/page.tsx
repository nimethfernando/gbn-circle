'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
  status: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ALL' | 'ONLINE' | 'PHYSICAL'>('ALL');
  
  // Modal state
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Form fields
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
          setEvents(json.data);
        }
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          message: 'Your attendance request has been submitted for administrative verification.',
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

  const filteredEvents = events.filter((evt) => {
    if (activeTab === 'ONLINE') return evt.format.toLowerCase() === 'online';
    if (activeTab === 'PHYSICAL') return evt.format.toLowerCase() !== 'online';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-24 pb-20">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <span className="text-[#c5a059] text-xs uppercase tracking-widest font-semibold border border-[#c5a059]/30 px-3 py-1 rounded-full">
          Executive Calendar
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-4 font-serif">
          Upcoming Network Sessions
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
          High-table masterminds, physical chapter summits, and structured virtual meets connecting verified business leaders.
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mt-8">
          {(['ALL', 'ONLINE', 'PHYSICAL'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {tab === 'ALL' ? 'All Sessions' : tab === 'ONLINE' ? 'Virtual Meets' : 'In-Person Summits'}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#c5a059]"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-400 text-sm">No scheduled events found matching this criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-[#c5a059]/40 rounded-xl overflow-hidden flex flex-col transition-all duration-300 group"
              >
                {/* Event Image */}
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <Image
                    src={evt.image || '/event-networking-BdmXOEy2 (1).jpg'}
                    alt={evt.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded ${
                        evt.tier === 'GBN Elite'
                          ? 'bg-[#c5a059] text-black'
                          : 'bg-blue-950/80 text-blue-300 border border-blue-800/50'
                      }`}
                    >
                      {evt.tier}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-black/60 text-slate-300 border border-white/10">
                      {evt.format}
                    </span>
                  </div>
                </div>

                {/* Event Meta */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#c5a059] font-medium tracking-wide">
                      {new Date(evt.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}{' '}
                      &bull; {evt.startTime} - {evt.endTime} ({evt.timezone})
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#c5a059] transition-colors">
                      {evt.title}
                    </h3>
                    
                    <p className="text-slate-400 text-xs mt-2.5 line-clamp-3 leading-relaxed">
                      {evt.shortDescription}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                      <div>
                        <span className="text-slate-500">Eligibility:</span>{' '}
                        <span className="text-slate-300">{evt.eligibility}</span>
                      </div>
                      {evt.venueName && (
                        <div>
                          <span className="text-slate-500">Venue:</span>{' '}
                          <span className="text-slate-300">
                            {evt.venueName}, {evt.venueCity}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-500">Access Fee:</span>{' '}
                        <span className="text-slate-300 font-medium">{evt.fee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply CTA */}
                  <div className="mt-6">
                    {evt.allowVisitorRequests ? (
                      <button
                        onClick={() => {
                          setSelectedEvent(evt);
                          setSubmitStatus(null);
                        }}
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-black font-semibold text-xs tracking-wider uppercase rounded-md transition-all shadow-md"
                      >
                        Request Visitor Pass
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 px-4 bg-slate-800 text-slate-500 font-semibold text-xs uppercase tracking-wider rounded-md cursor-not-allowed"
                      >
                        Closed to Visitors
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Visitor Request Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0b1021] border border-[#c5a059]/30 rounded-xl max-w-2xl w-full p-6 sm:p-8 relative my-8 shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-1"
            >
              &times;
            </button>

            <div className="mb-6">
              <span className="text-[#c5a059] text-[10px] uppercase font-bold tracking-widest">
                Visitor Screening
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Apply to Attend: {selectedEvent.title}
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                All visitor seats are subject to executive credential verification. Private meeting credentials will be issued upon approval.
              </p>
            </div>

            {submitStatus?.success ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-center space-y-4">
                <div className="text-emerald-400 text-3xl">&check;</div>
                <h3 className="text-white font-bold text-base">Request Submitted</h3>
                <p className="text-slate-300 text-xs">{submitStatus.message}</p>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="mt-4 px-6 py-2 bg-[#c5a059] text-black font-semibold text-xs rounded-md uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {submitStatus?.success === false && (
                  <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 rounded text-xs">
                    {submitStatus.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Official Business Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Phone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">City *</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Company Name *</label>
                    <input
                      required
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Designation *</label>
                    <input
                      required
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Founder, CEO, Partner"
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Industry Sector</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="e.g. IT, Manufacturing, Legal"
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Company Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">LinkedIn Profile</label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Why do you wish to attend this session? *</label>
                  <textarea
                    required
                    rows={2}
                    name="whyAttend"
                    value={formData.whyAttend}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">What cross-business collaboration are you seeking?</label>
                  <textarea
                    rows={2}
                    name="collaborationGoals"
                    value={formData.collaborationGoals}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold rounded text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-md"
                  >
                    {submitting ? 'Submitting Application...' : 'Confirm & Submit Application'}
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