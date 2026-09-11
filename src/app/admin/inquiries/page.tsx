'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Mail,
  Phone,
  Building,
  Search,
  CheckCircle2,
  Archive,
  Trash2,
  MessageSquare,
} from 'lucide-react';

interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  designation?: string | null;
  interest?: string | null;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'ARCHIVED' | string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NEW' | 'CONTACTED' | 'ARCHIVED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInquiry, setActiveInquiry] = useState<ContactSubmission | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch('/api/admin/inquiries');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        const json = await res.json();
        if (!ignore && json.success) {
          setInquiries(json.data);
        }
      } catch (err) {
        console.error('Error loading inquiries:', err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, [router]);

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

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        alert(json.message || 'Failed to update status');
      }
    } catch {
      alert('Network error updating inquiry status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete the inquiry from "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry(null);
        }
      } else {
        alert(json.message || 'Failed to delete inquiry');
      }
    } catch {
      alert('Network error deleting inquiry');
    }
  };

  // Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'NEW').length;
  const contactedCount = inquiries.filter((i) => i.status === 'CONTACTED').length;
  const archivedCount = inquiries.filter((i) => i.status === 'ARCHIVED').length;

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'ALL' || inq.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      inq.fullName.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.companyName && inq.companyName.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.interest && inq.interest.toLowerCase().includes(q)) ||
      inq.message.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
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
          <h1 className="text-3xl font-bold font-serif text-[#c5a059] mt-1">
            Inquiries &amp; Member Leads
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Executive inquiries submitted via the public contact and partnership forms.
          </p>
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

      {/* Admin Module Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-8 pb-3">
        <Link
          href="/admin/events"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          Events Management
        </Link>
        <Link
          href="/admin/blogs"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          Blogs CMS
        </Link>
        <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] rounded-lg shadow-md">
          Inquiries &amp; Leads
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">Total Inquiries</p>
          <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
        </div>
        <div className="bg-slate-900/60 border border-amber-900/40 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-amber-400 tracking-wider">New Leads</p>
          <p className="text-2xl font-bold text-amber-300 mt-1">{newCount}</p>
        </div>
        <div className="bg-slate-900/60 border border-emerald-900/40 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-emerald-400 tracking-wider">Contacted</p>
          <p className="text-2xl font-bold text-emerald-300 mt-1">{contactedCount}</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">Archived</p>
          <p className="text-2xl font-bold text-slate-300 mt-1">{archivedCount}</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#c5a059] outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-[11px] w-full sm:w-auto justify-end">
          {(['ALL', 'NEW', 'CONTACTED', 'ARCHIVED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded font-semibold transition ${
                statusFilter === st
                  ? 'bg-[#c5a059] text-black shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c5a059]"></div>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800/60 m-4 rounded-lg">
            <MessageSquare size={32} className="mx-auto text-slate-600 mb-2" />
            <p className="text-slate-400 text-xs">No contact inquiries found matching this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider bg-slate-950/40">
                  <th className="py-3 px-4 font-semibold">Contact &amp; Firm</th>
                  <th className="py-3 px-4 font-semibold">Interest Area</th>
                  <th className="py-3 px-4 font-semibold">Message Preview</th>
                  <th className="py-3 px-4 font-semibold">Received</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{inq.fullName}</div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                        <Mail size={11} className="text-[#c5a059]" />
                        <a href={`mailto:${inq.email}`} className="hover:underline text-slate-300">
                          {inq.email}
                        </a>
                      </div>
                      {inq.phone && (
                        <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <Phone size={11} className="text-[#c5a059]" />
                          <a href={`tel:${inq.phone}`} className="hover:underline text-slate-300">
                            {inq.phone}
                          </a>
                        </div>
                      )}
                      {(inq.companyName || inq.designation) && (
                        <div className="text-slate-500 text-[11px] mt-1 flex items-center gap-1">
                          <Building size={11} />
                          <span>
                            {inq.designation ? `${inq.designation}, ` : ''}
                            {inq.companyName}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-slate-950 border border-slate-800 text-[#c5a059]">
                        {inq.interest || 'General'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                        {inq.message}
                      </p>
                      <button
                        onClick={() => setActiveInquiry(inq)}
                        className="text-[10px] text-[#c5a059] hover:underline font-semibold mt-1 inline-block"
                      >
                        Read Full Message &rarr;
                      </button>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                      <div>{new Date(inq.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      <div className="text-slate-500 text-[10px]">
                        {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        disabled={actionLoading === inq.id}
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border outline-none cursor-pointer transition disabled:opacity-50 ${
                          inq.status === 'NEW'
                            ? 'bg-amber-950 text-amber-300 border-amber-800/80'
                            : inq.status === 'CONTACTED'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800/80'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        <option value="NEW" className="bg-slate-950 text-amber-300">NEW</option>
                        <option value="CONTACTED" className="bg-slate-950 text-emerald-300">CONTACTED</option>
                        <option value="ARCHIVED" className="bg-slate-950 text-slate-400">ARCHIVED</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveInquiry(inq)}
                          className="px-2.5 py-1 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold rounded text-[11px] transition shadow-sm"
                        >
                          View
                        </button>
                        <a
                          href={`mailto:${inq.email}?subject=GBN Circle Inquiry Response&body=Dear ${encodeURIComponent(inq.fullName)},%0D%0A%0D%0AThank you for reaching out to GBN Circle regarding ${encodeURIComponent(inq.interest || 'membership')}.`}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[11px] font-semibold transition inline-flex items-center gap-1"
                          title="Compose Email Reply"
                        >
                          <Mail size={11} /> Reply
                        </a>
                        <button
                          onClick={() => handleDelete(inq.id, inq.fullName)}
                          className="px-2 py-1 bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 rounded text-[11px] font-semibold transition inline-block"
                          title="Delete Inquiry"
                        >
                          <Trash2 size={11} />
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

      {/* Inquiry Detail Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b1021] border border-[#c5a059]/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 shadow-2xl">
            <button
              onClick={() => setActiveInquiry(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl p-1"
            >
              &times;
            </button>

            <div className="border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059]">
                  Inquiry Review
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  activeInquiry.status === 'NEW'
                    ? 'bg-amber-950 text-amber-300 border-amber-800/80'
                    : activeInquiry.status === 'CONTACTED'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800/80'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}>
                  {activeInquiry.status}
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-white mt-1">
                {activeInquiry.fullName}
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                {activeInquiry.designation ? `${activeInquiry.designation} • ` : ''}
                {activeInquiry.companyName || 'Individual Inquirer'}
              </p>
            </div>

            {/* Inquiry Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                <a href={`mailto:${activeInquiry.email}`} className="text-[#c5a059] font-medium hover:underline">
                  {activeInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone</span>
                <span className="text-white">
                  {activeInquiry.phone || 'Not provided'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Interest Area</span>
                <span className="text-slate-200 font-medium">
                  {activeInquiry.interest || 'General Inquiry'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date Submitted</span>
                <span className="text-slate-200 font-medium">
                  {new Date(activeInquiry.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-6 space-y-2">
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Full Inquiry Message
              </label>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                {activeInquiry.message}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {activeInquiry.status !== 'CONTACTED' && (
                  <button
                    onClick={() => handleStatusChange(activeInquiry.id, 'CONTACTED')}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Mark as Contacted
                  </button>
                )}
                {activeInquiry.status !== 'ARCHIVED' && (
                  <button
                    onClick={() => handleStatusChange(activeInquiry.id, 'ARCHIVED')}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded font-semibold transition flex items-center gap-1.5"
                  >
                    <Archive size={14} /> Archive
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${activeInquiry.email}?subject=GBN Circle Inquiry Response&body=Dear ${encodeURIComponent(activeInquiry.fullName)},%0D%0A%0D%0AThank you for contacting GBN Circle regarding ${encodeURIComponent(activeInquiry.interest || 'membership')}.`}
                  className="px-4 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded transition flex items-center gap-1.5"
                >
                  <Mail size={14} /> Reply by Email
                </a>
                <button
                  onClick={() => setActiveInquiry(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
