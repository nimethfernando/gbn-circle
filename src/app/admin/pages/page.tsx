'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles,
  Layout,
  RefreshCw,
  Eye,
  AlertCircle,
} from 'lucide-react';

interface PageOverview {
  slug: string;
  title: string;
  path: string;
  isCustomized: boolean;
  updatedAt: string | null;
}

export default function AdminPagesOverview() {
  const router = useRouter();
  const [pages, setPages] = useState<PageOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/pages');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const json = await res.json();
      if (json.success && json.data) {
        setPages(json.data);
      } else {
        setError(json.message || 'Failed to load pages');
      }
    } catch {
      setError('Network error while loading pages overview');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch('/api/admin/pages');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        const json = await res.json();
        if (!ignore) {
          if (json.success && json.data) {
            setPages(json.data);
          } else {
            setError(json.message || 'Failed to load pages');
          }
        }
      } catch {
        if (!ignore) {
          setError('Network error while loading pages overview');
        }
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
    try {
      setLoggingOut(true);
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      alert('Failed to log out');
    } finally {
      setLoggingOut(false);
    }
  };

  const customizedCount = pages.filter((p) => p.isCustomized).length;

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
            Pages Content CMS
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage, customize and update live content for all pages across the GBN Circle platform.
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
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 mb-8 pb-3">
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
        <Link
          href="/admin/inquiries"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          Inquiries &amp; Leads
        </Link>
        <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] rounded-lg shadow-md flex items-center gap-1.5">
          <Layout size={13} /> Pages Content CMS
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">Total Managed Pages</p>
          <p className="text-3xl font-bold text-white mt-1.5">{pages.length}</p>
          <p className="text-xs text-slate-500 mt-1">Full core public routes</p>
        </div>
        <div className="bg-slate-900/60 border border-emerald-900/40 rounded-xl p-5 shadow-sm">
          <p className="text-[11px] uppercase font-semibold text-emerald-400 tracking-wider">Customized in Database</p>
          <p className="text-3xl font-bold text-emerald-300 mt-1.5">{customizedCount}</p>
          <p className="text-xs text-emerald-500/80 mt-1">Live override active</p>
        </div>
        <div className="bg-slate-900/60 border border-blue-900/40 rounded-xl p-5 shadow-sm">
          <p className="text-[11px] uppercase font-semibold text-blue-400 tracking-wider">PRD Default Fallbacks</p>
          <p className="text-3xl font-bold text-blue-300 mt-1.5">{pages.length - customizedCount}</p>
          <p className="text-xs text-blue-500/80 mt-1">Protected by fail-safe</p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchPages}
            className="px-3 py-1 bg-red-900/80 hover:bg-red-800 rounded font-semibold text-[11px] transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Pages Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Sparkles size={16} className="text-[#c5a059]" /> Core Platform Pages
          </h2>
          <button
            onClick={fetchPages}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh Status
          </button>
        </div>

        {loading && pages.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
            <RefreshCw size={24} className="animate-spin text-[#c5a059] mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Loading page management registry...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <div
                key={page.slug}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-[#c5a059]/40 hover:bg-slate-900/90 transition-all duration-300 group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                      <FileText size={18} />
                    </div>

                    {page.isCustomized ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700 text-emerald-400">
                        <CheckCircle2 size={11} /> Customized Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-400">
                        <Clock size={11} /> PRD Factory Default
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#c5a059] transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Route: {page.path}
                  </p>

                  <p className="text-xs text-slate-400 mt-4 leading-relaxed font-light">
                    {page.slug === 'home' && 'Manage Hero headline, What is GBN, 4 Pillars, Eligibility badges, and Final Comparison Matrix.'}
                    {page.slug === 'about' && 'Update the founding brand story, mission, 4 Core Values, and company pillars.'}
                    {page.slug === 'community' && 'Manage membership tier thresholds, features matrix, and application calls-to-action.'}
                    {page.slug === 'leadership' && 'Edit executive leadership profiles, quotes, photos, and network journey stages.'}
                    {page.slug === 'contact' && 'Update office addresses, contact phone/email, social media links, and form labels.'}
                  </p>

                  {page.updatedAt && (
                    <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1">
                      <Clock size={12} /> Last modified: {new Date(page.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-3">
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Edit3 size={13} /> Edit Page Content
                  </Link>

                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition shrink-0"
                    title="Preview Live Page"
                  >
                    <Eye size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
