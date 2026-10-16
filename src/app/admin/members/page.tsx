'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, Plus, Trash2, Edit2, Search, UserCheck, Shield, Building2, Mail, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';
import ChangePasswordModal from '@/components/admin/ChangePasswordModal';

interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company: string;
  designation: string;
  industry: string;
  tier: string;
  city: string;
  turnoverBand: string;
  status: string;
  linkedIn?: string | null;
  createdAt: string;
}

interface MemberFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  industry: string;
  tier: string;
  city: string;
  turnoverBand: string;
  status: string;
  linkedIn: string;
}

const INITIAL_FORM: MemberFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  designation: '',
  industry: 'Business Leadership & Networking',
  tier: 'GBN Circle',
  city: 'Mumbai',
  turnoverBand: '₹20L - ₹1Cr',
  status: 'ACTIVE',
  linkedIn: '',
};

export default function AdminMembersPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'ALL' | 'GBN Circle' | 'GBN Elite'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Metrics
  const [metrics, setMetrics] = useState({
    totalCount: 0,
    totalActive: 0,
    totalElite: 0,
    totalCircle: 0,
  });

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<MemberFormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: '10',
        tier: tierFilter,
        status: statusFilter,
      });
      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }

      const res = await fetch(`/api/admin/members?${params.toString()}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      const json = await res.json();
      if (json.success && json.data) {
        setMembers(json.data.members || []);
        setTotalPages(json.data.pagination.totalPages || 1);
        setTotalCount(json.data.pagination.totalCount || 0);
        if (json.data.metrics) {
          setMetrics(json.data.metrics);
        }
      }
    } catch (err) {
      console.error('Failed to load members:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, tierFilter, statusFilter, searchQuery, router]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  const handleOpenAdd = () => {
    setFormData(INITIAL_FORM);
    setModalError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (m: Member) => {
    setFormData({
      id: m.id,
      name: m.name,
      email: m.email,
      phone: m.phone || '',
      company: m.company,
      designation: m.designation,
      industry: m.industry || 'Business Leadership & Networking',
      tier: m.tier || 'GBN Circle',
      city: m.city || 'Mumbai',
      turnoverBand: m.turnoverBand || '₹20L - ₹1Cr',
      status: m.status || 'ACTIVE',
      linkedIn: m.linkedIn || '',
    });
    setModalError(null);
    setModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);

    try {
      if (formData.id) {
        // Update existing member
        const res = await fetch(`/api/admin/members/${formData.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setModalOpen(false);
          await loadMembers();
        } else {
          setModalError(json.message || 'Failed to update member');
        }
      } else {
        // Create new member
        const res = await fetch('/api/admin/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setModalOpen(false);
          await loadMembers();
        } else {
          setModalError(json.message || 'Failed to create member');
        }
      }
    } catch {
      setModalError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: string, name: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently delete member "${name}" (${email})?`)) {
      return;
    }

    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/members/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        await loadMembers();
      } else {
        alert(json.message || 'Failed to delete member');
      }
    } catch {
      alert('Network error while deleting member');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const json = await res.json();
      if (json.success) {
        await loadMembers();
      } else {
        alert(json.message || 'Failed to update status');
      }
    } catch {
      alert('Network error updating status');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white p-6 sm:p-10 font-sans">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-widest text-[#c5a059] font-serif">GBN CIRCLE</span>
            <span className="bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[10px] px-2 py-0.5 rounded font-mono font-semibold uppercase">
              Admin Portal
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">Verified Membership Directory &amp; VIP Access Control</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowChangePassword(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
          >
            <KeyRound size={13} className="text-[#c5a059]" />
            Change Password
          </button>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-3.5 py-2 bg-slate-900 hover:bg-red-950/60 border border-slate-800 hover:border-red-600/50 text-slate-300 hover:text-red-300 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {loggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-8 pb-3 overflow-x-auto">
        <Link
          href="/admin/events"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors whitespace-nowrap"
        >
          Events Management
        </Link>
        <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] rounded-lg shadow-md whitespace-nowrap">
          Approved Members
        </div>
        <Link
          href="/admin/blogs"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors whitespace-nowrap"
        >
          Blogs CMS
        </Link>
        <Link
          href="/admin/inquiries"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors whitespace-nowrap"
        >
          Inquiries &amp; Leads
        </Link>
        <Link
          href="/admin/pages"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors whitespace-nowrap"
        >
          Pages Content CMS
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">Total Members</p>
          <p className="text-2xl font-bold text-white mt-1">{metrics.totalCount}</p>
        </div>
        <div className="bg-slate-900/60 border border-emerald-900/30 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-emerald-400 tracking-wider">Active Verified</p>
          <p className="text-2xl font-bold text-emerald-300 mt-1">{metrics.totalActive}</p>
        </div>
        <div className="bg-slate-900/60 border border-amber-900/30 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-amber-400 tracking-wider">GBN Elite Tier</p>
          <p className="text-2xl font-bold text-amber-300 mt-1">{metrics.totalElite}</p>
        </div>
        <div className="bg-slate-900/60 border border-blue-900/30 rounded-xl p-4">
          <p className="text-[11px] uppercase font-semibold text-blue-400 tracking-wider">GBN Circle Tier</p>
          <p className="text-2xl font-bold text-blue-300 mt-1">{metrics.totalCircle}</p>
        </div>
      </div>

      {/* Control Bar: Search, Filters, Add Button */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 sm:p-6 rounded-xl shadow-lg mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search by member name, email, company, city, or sector..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#c5a059] outline-none"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={tierFilter}
              onChange={(e) => {
                setTierFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:border-[#c5a059] outline-none"
            >
              <option value="ALL">All Tiers</option>
              <option value="GBN Circle">GBN Circle</option>
              <option value="GBN Elite">GBN Elite</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:border-[#c5a059] outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs rounded-lg uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
        >
          <Plus size={15} /> Add Approved Member
        </button>
      </div>

      {/* Members Directory Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c5a059]"></div>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-16 px-4">
            <UserCheck size={36} className="mx-auto text-slate-600 mb-3" />
            <h3 className="text-sm font-semibold text-white">No members found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No verified members match your search or filter. You can add an approved member using the button above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">Company &amp; Role</th>
                  <th className="py-3.5 px-4">Industry / City</th>
                  <th className="py-3.5 px-4">Tier &amp; Turnover</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-white text-sm block">{m.name}</span>
                        <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1">
                            <Mail size={11} className="text-[#c5a059]" /> {m.email}
                          </span>
                          {m.phone && (
                            <span className="flex items-center gap-1">
                              &bull; <Phone size={11} className="text-[#c5a059]" /> {m.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-300">
                        <strong className="text-white font-semibold flex items-center gap-1.5">
                          <Building2 size={12} className="text-slate-400" /> {m.company}
                        </strong>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{m.designation}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-300">
                        <span className="text-slate-200 block font-medium">{m.industry}</span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="text-[#c5a059]" /> {m.city}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${
                            m.tier === 'GBN Elite'
                              ? 'bg-amber-950/80 text-[#f3d27a] border-[#c5a059]/50'
                              : 'bg-slate-800 text-slate-200 border-slate-700'
                          }`}
                        >
                          {m.tier}
                        </span>
                        <span className="block text-[10px] text-slate-400">{m.turnoverBand}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(m.id, m.status)}
                        disabled={actionLoading === m.id}
                        title="Click to toggle status"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full border transition ${
                          m.status === 'ACTIVE'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800/80 hover:bg-emerald-900/50'
                            : 'bg-red-950 text-red-400 border-red-800/80 hover:bg-red-900/50'
                        }`}
                      >
                        {m.status === 'ACTIVE' ? (
                          <>
                            <CheckCircle size={10} /> Active
                          </>
                        ) : (
                          <>
                            <XCircle size={10} /> Inactive
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(m)}
                          title="Edit Member Details"
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition border border-transparent hover:border-slate-700"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(m.id, m.name, m.email)}
                          disabled={actionLoading === m.id}
                          title="Delete Member"
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded transition border border-transparent hover:border-red-900/40 disabled:opacity-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-950/60">
            <span className="text-slate-400">
              Showing <strong className="text-white">{(currentPage - 1) * 10 + 1}</strong> to{' '}
              <strong className="text-white">{Math.min(currentPage * 10, totalCount)}</strong> of{' '}
              <strong className="text-white">{totalCount}</strong> verified members
            </span>
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                &larr; Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded text-xs font-semibold transition ${
                    currentPage === p
                      ? 'bg-[#c5a059] text-black font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Member Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#c5a059]" />
                <h3 className="font-bold text-white text-sm">
                  {formData.id ? 'Edit Approved Member' : 'Register Approved Member'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-semibold p-1"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="p-5 space-y-4 text-xs">
              {modalError && (
                <div className="p-3 bg-red-950/80 border border-red-700/80 text-red-200 rounded-lg">
                  {modalError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Registered Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="member@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Company Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Apex Innovations Pvt Ltd"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Designation *</label>
                  <input
                    required
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="Managing Director / Founder"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98111 22334"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Mumbai / New Delhi"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Industry / Sector</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="Technology & Manufacturing"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Tier</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  >
                    <option value="GBN Circle">GBN Circle</option>
                    <option value="GBN Elite">GBN Elite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Turnover Band</label>
                  <select
                    value={formData.turnoverBand}
                    onChange={(e) => setFormData({ ...formData, turnoverBand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  >
                    <option value="₹20L - ₹1Cr">₹20L - ₹1Cr</option>
                    <option value="₹1Cr - ₹5Cr">₹1Cr - ₹5Cr</option>
                    <option value="₹5Cr+">₹5Cr+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Membership Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  >
                    <option value="ACTIVE">ACTIVE (Immediate Access)</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={formData.linkedIn}
                    onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase rounded tracking-wider shadow transition disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : formData.id ? 'Save Changes' : 'Confirm & Register Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}
