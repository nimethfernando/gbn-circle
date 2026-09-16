/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  HelpCircle,
  Upload,
  ImageIcon,
  Trash2,
} from 'lucide-react';

export default function AdminPageEditor() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [path, setPath] = useState('/');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [isCustomized, setIsCustomized] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [uploadingLeaderIdx, setUploadingLeaderIdx] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<{ [idx: number]: string }>({});

  const fetchPageData = useCallback(async () => {
    try {
      setLoading(true);
      setStatusMessage(null);
      const res = await fetch(`/api/admin/pages/${slug}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const json = await res.json();
      if (json.success && json.data) {
        setTitle(json.data.title);
        setPath(json.data.path);
        setContent(json.data.content);
        setIsCustomized(json.data.isCustomized);
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to load page content' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network error while loading editor data' });
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    let ignore = false;
    async function init() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/admin/pages/${slug}`);
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        const json = await res.json();
        if (!ignore) {
          if (json.success && json.data) {
            setTitle(json.data.title);
            setPath(json.data.path);
            setContent(json.data.content);
            setIsCustomized(json.data.isCustomized);
          } else {
            setStatusMessage({ type: 'error', text: json.message || 'Failed to load page content' });
          }
        }
      } catch {
        if (!ignore) {
          setStatusMessage({ type: 'error', text: 'Network error while loading editor data' });
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
  }, [slug, router]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      setStatusMessage(null);

      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const json = await res.json();
      if (json.success) {
        setIsCustomized(true);
        setStatusMessage({ type: 'success', text: 'Changes saved live to the database successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save updates' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network error while saving changes' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    const confirm = window.confirm(
      `Are you sure you want to reset "${title}" back to the original factory PRD defaults? Any custom edits saved in the database will be cleared.`
    );
    if (!confirm) return;

    try {
      setResetting(true);
      setStatusMessage(null);

      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'DELETE',
      });

      const json = await res.json();
      if (json.success) {
        await fetchPageData();
        setStatusMessage({ type: 'success', text: 'Page content has been restored to factory PRD defaults.' });
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to reset page' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network error while resetting page' });
    } finally {
      setResetting(false);
    }
  };

  // Generic state updater helpers
  const updateNestedField = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateArrayItem = (section: string, arrayKey: string, index: number, field: string, value: any) => {
    setContent((prev: any) => {
      const arr = [...(prev[section]?.[arrayKey] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayKey]: arr,
        },
      };
    });
  };

  const updateDirectArrayItem = (arrayKey: string, index: number, field: string, value: any) => {
    setContent((prev: any) => {
      const arr = [...(prev[arrayKey] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return {
        ...prev,
        [arrayKey]: arr,
      };
    });
  };

  const compressImageForUpload = (
    file: File,
    maxWidth = 1200,
    quality = 0.85
  ): Promise<File> => {
    return new Promise((resolve) => {
      if (
        typeof window === 'undefined' ||
        file.type === 'image/svg+xml' ||
        file.type === 'image/gif' ||
        file.size < 200 * 1024
      ) {
        resolve(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const optimizedFile = new File([blob], file.name, {
                  type: outputType,
                  lastModified: Date.now(),
                });
                resolve(optimizedFile);
              } else {
                resolve(file);
              }
            },
            outputType,
            quality
          );
        };
        img.onerror = () => resolve(file);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const handleLeaderImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    leaderIdx: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous error for this item
    setUploadError((prev) => ({ ...prev, [leaderIdx]: '' }));

    // Client-side file size check (12MB)
    if (file.size > 12 * 1024 * 1024) {
      setUploadError((prev) => ({
        ...prev,
        [leaderIdx]: 'File exceeds 12MB limit. Please choose a smaller photo.',
      }));
      return;
    }

    try {
      setUploadingLeaderIdx(leaderIdx);
      const readyFile = await compressImageForUpload(file);

      const formData = new FormData();
      formData.append('file', readyFile);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        updateDirectArrayItem('leaders', leaderIdx, 'image', data.url);
      } else {
        setUploadError((prev) => ({
          ...prev,
          [leaderIdx]: data.message || 'Failed to upload photo',
        }));
      }
    } catch {
      setUploadError((prev) => ({
        ...prev,
        [leaderIdx]: 'Network error while uploading photo',
      }));
    } finally {
      setUploadingLeaderIdx(null);
      e.target.value = '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white pt-32 pb-20 flex flex-col items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#c5a059] mb-4" />
        <p className="text-slate-400 text-sm">Loading visual page editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-24 pb-24 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-slate-400 hover:text-[#c5a059] transition-colors mb-2"
          >
            <ArrowLeft size={13} /> Back to All Pages
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold font-serif text-white">
              Editing {title}
            </h1>
            {isCustomized ? (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300">
                Customized Live
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">
                Factory Default
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Live Route: <span className="font-mono text-slate-300">{path}</span>
          </p>
        </div>

        {/* Global Save / Reset / Preview Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <ExternalLink size={13} /> Preview Live Page
          </a>

          <button
            type="button"
            onClick={handleReset}
            disabled={resetting || saving}
            className="px-3.5 py-2 rounded-lg bg-slate-900 border border-red-900/40 hover:bg-red-950/50 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <RotateCcw size={13} className={resetting ? 'animate-spin' : ''} /> Reset to Defaults
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving || resetting}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Status Feedback Toast */}
      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-xl border text-xs flex items-center gap-2.5 animate-fade-in ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : 'bg-red-950/60 border-red-800 text-red-300'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span className="flex-1 font-medium">{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {/* Editor Body by Page Slug */}
      {content && (
        <div className="space-y-10">
          {/* ======================= HOME PAGE EDITOR ======================= */}
          {slug === 'home' && (
            <>
              {/* Feature Visibility Controls (No-Code Toggles) */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-[#c5a059]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#c5a059]">
                      <Sparkles size={20} />
                      <h2 className="text-xl font-bold font-serif text-white">
                        Feature Visibility &amp; Social Links Controls (No-Code)
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Control visibility of all sections, menus, and configure live social profile links without touching code. Click &quot;Save Changes&quot; below to update the live website.
                    </p>
                  </div>
                </div>

                {/* --- 1. SOCIAL MEDIA CHANNELS & PROFILE LINKS --- */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a059] mb-3 flex items-center gap-2">
                    <span>1. Social Media Channels &amp; Links</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Instagram Card */}
                    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-pink-900/60 border border-pink-700/50 flex items-center justify-center text-[10px] font-bold text-pink-300">IG</span>
                          <span className="text-xs font-bold uppercase tracking-wider text-white">Instagram Profile</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            content.visibility?.showInstagram !== false
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-slate-900 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {content.visibility?.showInstagram !== false ? 'Visible' : 'Hidden'}
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Instagram URL / QR Link
                        </label>
                        <input
                          type="text"
                          value={content.visibility?.instagramUrl ?? 'https://www.instagram.com/gbncircle?stkn=dTNpdGd1d3c2YjJ4&utm_source=qr'}
                          onChange={(e) => updateNestedField('visibility', 'instagramUrl', e.target.value)}
                          placeholder="https://www.instagram.com/username"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-[#c5a059] outline-none font-mono"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          updateNestedField('visibility', 'showInstagram', content.visibility?.showInstagram === false)
                        }
                        className={`w-full py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          content.visibility?.showInstagram !== false
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {content.visibility?.showInstagram !== false ? 'Hide Instagram from Site' : 'Unhide Instagram on Site'}
                      </button>
                    </div>

                    {/* LinkedIn Card */}
                    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-[10px] font-bold text-blue-300">LI</span>
                          <span className="text-xs font-bold uppercase tracking-wider text-white">LinkedIn Profile</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            content.visibility?.showLinkedIn
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-slate-900 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {content.visibility?.showLinkedIn ? 'Visible' : 'Hidden'}
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          LinkedIn Company / Profile URL
                        </label>
                        <input
                          type="text"
                          value={content.visibility?.linkedInUrl ?? 'https://www.linkedin.com/company/gbn-circle/'}
                          onChange={(e) => updateNestedField('visibility', 'linkedInUrl', e.target.value)}
                          placeholder="https://www.linkedin.com/company/..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-[#c5a059] outline-none font-mono"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          updateNestedField('visibility', 'showLinkedIn', !content.visibility?.showLinkedIn)
                        }
                        className={`w-full py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          content.visibility?.showLinkedIn
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {content.visibility?.showLinkedIn ? 'Hide LinkedIn from Site' : 'Unhide LinkedIn on Site'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* --- 2. MEMBERS & COMMUNITY VISIBILITY --- */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a059] mb-3 flex items-center gap-2">
                    <span>2. Member Community &amp; Navigation</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Toggle: Member Community Section */}
                    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            Member Community Section
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              content.visibility?.showMemberSection
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-slate-900 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {content.visibility?.showMemberSection ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Show the &quot;Member Community&quot; showcase section on the homepage.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          updateNestedField('visibility', 'showMemberSection', !content.visibility?.showMemberSection)
                        }
                        className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          content.visibility?.showMemberSection
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {content.visibility?.showMemberSection ? 'Hide from Homepage' : 'Unhide on Homepage'}
                      </button>
                    </div>

                    {/* Toggle: Members in Navigation */}
                    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            &quot;Members&quot; Menu Item
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              content.visibility?.showMemberNav
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-slate-900 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {content.visibility?.showMemberNav ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Show &quot;Members&quot; in top Header navigation and bottom Footer navigation.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          updateNestedField('visibility', 'showMemberNav', !content.visibility?.showMemberNav)
                        }
                        className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          content.visibility?.showMemberNav
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {content.visibility?.showMemberNav ? 'Hide from Navigation' : 'Unhide in Navigation'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* --- 3. HOMEPAGE KEY SECTIONS --- */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a059] mb-3 flex items-center gap-2">
                    <span>3. Homepage Key Sections</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Events Section */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Events Section</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${content.visibility?.showEventsSection !== false ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>
                            {content.visibility?.showEventsSection !== false ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Live upcoming networking sessions</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showEventsSection', content.visibility?.showEventsSection === false)}
                        className={`w-full py-1.5 px-3 rounded text-[11px] font-bold transition ${content.visibility?.showEventsSection !== false ? 'bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300' : 'bg-emerald-700 hover:bg-emerald-600 text-white'}`}
                      >
                        {content.visibility?.showEventsSection !== false ? 'Hide Section' : 'Unhide Section'}
                      </button>
                    </div>

                    {/* Leadership Section */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Leadership Section</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${content.visibility?.showLeadershipSection !== false ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>
                            {content.visibility?.showLeadershipSection !== false ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Founders &amp; executive leadership preview</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showLeadershipSection', content.visibility?.showLeadershipSection === false)}
                        className={`w-full py-1.5 px-3 rounded text-[11px] font-bold transition ${content.visibility?.showLeadershipSection !== false ? 'bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300' : 'bg-emerald-700 hover:bg-emerald-600 text-white'}`}
                      >
                        {content.visibility?.showLeadershipSection !== false ? 'Hide Section' : 'Unhide Section'}
                      </button>
                    </div>

                    {/* Inspiration Section */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Inspiration Quote</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${content.visibility?.showInspirationSection !== false ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>
                            {content.visibility?.showInspirationSection !== false ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Inspiration statement banner</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showInspirationSection', content.visibility?.showInspirationSection === false)}
                        className={`w-full py-1.5 px-3 rounded text-[11px] font-bold transition ${content.visibility?.showInspirationSection !== false ? 'bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300' : 'bg-emerald-700 hover:bg-emerald-600 text-white'}`}
                      >
                        {content.visibility?.showInspirationSection !== false ? 'Hide Section' : 'Unhide Section'}
                      </button>
                    </div>

                    {/* Journey Section */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">GBN Journey</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${content.visibility?.showJourneySection !== false ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>
                            {content.visibility?.showJourneySection !== false ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Structured journey progression roadmap</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showJourneySection', content.visibility?.showJourneySection === false)}
                        className={`w-full py-1.5 px-3 rounded text-[11px] font-bold transition ${content.visibility?.showJourneySection !== false ? 'bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300' : 'bg-emerald-700 hover:bg-emerald-600 text-white'}`}
                      >
                        {content.visibility?.showJourneySection !== false ? 'Hide Section' : 'Unhide Section'}
                      </button>
                    </div>

                    {/* Global Network Section */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Global Network</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${content.visibility?.showGlobalNetworkSection !== false ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>
                            {content.visibility?.showGlobalNetworkSection !== false ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Worldwide reach &amp; office locations</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showGlobalNetworkSection', content.visibility?.showGlobalNetworkSection === false)}
                        className={`w-full py-1.5 px-3 rounded text-[11px] font-bold transition ${content.visibility?.showGlobalNetworkSection !== false ? 'bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300' : 'bg-emerald-700 hover:bg-emerald-600 text-white'}`}
                      >
                        {content.visibility?.showGlobalNetworkSection !== false ? 'Hide Section' : 'Unhide Section'}
                      </button>
                    </div>

                    {/* GBN Experience Section */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">GBN Experience</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${content.visibility?.showExperienceSection !== false ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}>
                            {content.visibility?.showExperienceSection !== false ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">Circle vs Elite tier comparisons</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showExperienceSection', content.visibility?.showExperienceSection === false)}
                        className={`w-full py-1.5 px-3 rounded text-[11px] font-bold transition ${content.visibility?.showExperienceSection !== false ? 'bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-300' : 'bg-emerald-700 hover:bg-emerald-600 text-white'}`}
                      >
                        {content.visibility?.showExperienceSection !== false ? 'Hide Section' : 'Unhide Section'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* --- 4. NAVIGATION MENU TOGGLES --- */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a059] mb-3 flex items-center gap-2">
                    <span>4. Navigation Menu Items (Header Navbar &amp; Footer)</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Events Nav */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-200">Events</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${content.visibility?.showEventsNav !== false ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                          {content.visibility?.showEventsNav !== false ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showEventsNav', content.visibility?.showEventsNav === false)}
                        className="w-full py-1 text-[10px] font-bold uppercase rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        {content.visibility?.showEventsNav !== false ? 'Hide Menu' : 'Unhide Menu'}
                      </button>
                    </div>

                    {/* Blogs Nav */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-200">Blogs</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${content.visibility?.showBlogsNav !== false ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                          {content.visibility?.showBlogsNav !== false ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showBlogsNav', content.visibility?.showBlogsNav === false)}
                        className="w-full py-1 text-[10px] font-bold uppercase rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        {content.visibility?.showBlogsNav !== false ? 'Hide Menu' : 'Unhide Menu'}
                      </button>
                    </div>

                    {/* Community Nav */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-200">Community</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${content.visibility?.showCommunityNav !== false ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                          {content.visibility?.showCommunityNav !== false ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showCommunityNav', content.visibility?.showCommunityNav === false)}
                        className="w-full py-1 text-[10px] font-bold uppercase rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        {content.visibility?.showCommunityNav !== false ? 'Hide Menu' : 'Unhide Menu'}
                      </button>
                    </div>

                    {/* Leadership Nav */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-200">Leadership</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${content.visibility?.showLeadershipNav !== false ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                          {content.visibility?.showLeadershipNav !== false ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateNestedField('visibility', 'showLeadershipNav', content.visibility?.showLeadershipNav === false)}
                        className="w-full py-1 text-[10px] font-bold uppercase rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        {content.visibility?.showLeadershipNav !== false ? 'Hide Menu' : 'Unhide Menu'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Hero */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">1. Hero Section</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Top Pill Badge
                    </label>
                    <input
                      type="text"
                      value={content.hero?.badge || ''}
                      onChange={(e) => updateNestedField('hero', 'badge', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Main Heading (Line 1)
                    </label>
                    <input
                      type="text"
                      value={content.hero?.headingLine1 || ''}
                      onChange={(e) => updateNestedField('hero', 'headingLine1', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Main Heading (Gold Accent Line 2)
                    </label>
                    <input
                      type="text"
                      value={content.hero?.headingLine2 || ''}
                      onChange={(e) => updateNestedField('hero', 'headingLine2', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-[#e5c158] focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Supporting Subtitle
                    </label>
                    <textarea
                      rows={3}
                      value={content.hero?.subtitle || ''}
                      onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={content.hero?.primaryBtnText || ''}
                      onChange={(e) => updateNestedField('hero', 'primaryBtnText', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Primary Button Link
                    </label>
                    <input
                      type="text"
                      value={content.hero?.primaryBtnLink || ''}
                      onChange={(e) => updateNestedField('hero', 'primaryBtnLink', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section: What is GBN */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Layers size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">2. What is GBN Circle</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={content.whatIsGbn?.heading || ''}
                      onChange={(e) => updateNestedField('whatIsGbn', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Main Description
                    </label>
                    <textarea
                      rows={3}
                      value={content.whatIsGbn?.description || ''}
                      onChange={(e) => updateNestedField('whatIsGbn', 'description', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {content.whatIsGbn?.pillars?.map((pillar: any, idx: number) => (
                      <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                        <label className="block text-[11px] font-bold uppercase text-[#c5a059] mb-1">
                          Pillar {idx + 1} Title
                        </label>
                        <input
                          type="text"
                          value={pillar.title || ''}
                          onChange={(e) => updateArrayItem('whatIsGbn', 'pillars', idx, 'title', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white mb-2"
                        />
                        <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={pillar.desc || ''}
                          onChange={(e) => updateArrayItem('whatIsGbn', 'pillars', idx, 'desc', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section: Who is GBN For */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Layers size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">3. Who is GBN Circle For &amp; Eligibility</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={content.whoIsGbnFor?.heading || ''}
                      onChange={(e) => updateNestedField('whoIsGbnFor', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                      <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                        GBN Circle Turnover Requirement
                      </label>
                      <input
                        type="text"
                        value={content.whoIsGbnFor?.circleEligibility || ''}
                        onChange={(e) => updateNestedField('whoIsGbnFor', 'circleEligibility', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                      <label className="block text-[11px] font-bold uppercase text-[#c5a059] mb-1">
                        GBN Elite Turnover Requirement
                      </label>
                      <input
                        type="text"
                        value={content.whoIsGbnFor?.eliteEligibility || ''}
                        onChange={(e) => updateNestedField('whoIsGbnFor', 'eliteEligibility', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-[#e5c158]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Choose Your GBN Experience */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Layers size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">4. Choose Your GBN Experience</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.gbnExperience?.heading || ''}
                      onChange={(e) => updateNestedField('gbnExperience', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Explanatory Subtitle
                    </label>
                    <textarea
                      rows={2}
                      value={content.gbnExperience?.subtitle || ''}
                      onChange={(e) => updateNestedField('gbnExperience', 'subtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-sm font-bold text-white mb-3">GBN Circle Experience</h4>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Badge</label>
                      <input
                        type="text"
                        value={content.gbnExperience?.circleBadge || ''}
                        onChange={(e) => updateNestedField('gbnExperience', 'circleBadge', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white mb-3"
                      />
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={content.gbnExperience?.circleDesc || ''}
                        onChange={(e) => updateNestedField('gbnExperience', 'circleDesc', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300"
                      />
                    </div>

                    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-sm font-bold text-[#c5a059] mb-3">GBN Elite Experience</h4>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Badge</label>
                      <input
                        type="text"
                        value={content.gbnExperience?.eliteBadge || ''}
                        onChange={(e) => updateNestedField('gbnExperience', 'eliteBadge', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-[#e5c158] mb-3"
                      />
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={content.gbnExperience?.eliteDesc || ''}
                        onChange={(e) => updateNestedField('gbnExperience', 'eliteDesc', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Final Comparison Matrix CTA */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Layers size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">5. Final Join CTA &amp; Comparison Table</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.finalCta?.heading || ''}
                      onChange={(e) => updateNestedField('finalCta', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Section Subtitle
                    </label>
                    <textarea
                      rows={2}
                      value={content.finalCta?.subtitle || ''}
                      onChange={(e) => updateNestedField('finalCta', 'subtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Circle CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={content.finalCta?.circleBtnText || ''}
                        onChange={(e) => updateNestedField('finalCta', 'circleBtnText', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1.5">
                        Elite CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={content.finalCta?.eliteBtnText || ''}
                        onChange={(e) => updateNestedField('finalCta', 'eliteBtnText', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-[#e5c158]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Leadership Section & Team Portraits */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Layers size={18} className="text-[#c5a059]" />
                    <h2 className="text-lg font-bold font-serif text-white">6. Leadership Section &amp; Team Portraits</h2>
                  </div>
                  <Link
                    href="/admin/pages/leadership"
                    className="text-xs text-[#c5a059] hover:text-[#e5c158] inline-flex items-center gap-1.5 font-semibold transition-colors"
                  >
                    <span>Open Full Leaders Page Editor</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Section Badge
                    </label>
                    <input
                      type="text"
                      value={content.leadershipSection?.badge || ''}
                      onChange={(e) => updateNestedField('leadershipSection', 'badge', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.leadershipSection?.heading || ''}
                      onChange={(e) => updateNestedField('leadershipSection', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Section Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.leadershipSection?.description || ''}
                      onChange={(e) => updateNestedField('leadershipSection', 'description', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={content.leadershipSection?.btnText || ''}
                      onChange={(e) => updateNestedField('leadershipSection', 'btnText', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      CTA Button Destination Link
                    </label>
                    <input
                      type="text"
                      value={content.leadershipSection?.btnLink || ''}
                      onChange={(e) => updateNestedField('leadershipSection', 'btnLink', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                {/* Team Portraits & Members Preview/Edit */}
                <div className="pt-6 border-t border-slate-800/80">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#c5a059] flex items-center gap-2">
                      <span>Leadership Members &amp; Portrait Photos</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Members and photos configured here are displayed on both the Home page leadership section and the Leadership page. Any photo uploaded or changed here updates the live site upon saving.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(content.leaders || []).map((leader: any, idx: number) => (
                      <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={leader.name || ''}
                            onChange={(e) => updateDirectArrayItem('leaders', idx, 'name', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-sm font-bold text-white focus:border-[#c5a059] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-[#c5a059] mb-1">Role Title</label>
                          <input
                            type="text"
                            value={leader.role || ''}
                            onChange={(e) => updateDirectArrayItem('leaders', idx, 'role', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-[#e5c158] focus:border-[#c5a059] outline-none"
                          />
                        </div>

                        {/* Portrait Photo Upload & Preview */}
                        <div className="pt-2 border-t border-slate-800/80">
                          <label className="block text-[10px] uppercase font-bold text-[#c5a059] mb-2 flex items-center justify-between">
                            <span>Portrait Photo</span>
                            {leader.image && (
                              <button
                                type="button"
                                onClick={() => updateDirectArrayItem('leaders', idx, 'image', '')}
                                className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
                                title="Clear photo"
                              >
                                <Trash2 size={11} />
                                <span>Clear</span>
                              </button>
                            )}
                          </label>

                          <div className="flex gap-3 items-start">
                            {/* Photo Preview Thumbnail */}
                            <div className="relative w-20 h-24 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center group/thumb">
                              {leader.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={leader.image}
                                  alt={leader.name || 'Leader Portrait'}
                                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center text-slate-600 gap-1">
                                  <ImageIcon size={22} />
                                  <span className="text-[9px]">No photo</span>
                                </div>
                              )}

                              {uploadingLeaderIdx === idx && (
                                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-[10px] text-[#e6ca85] backdrop-blur-xs">
                                  <Loader2 size={18} className="animate-spin mb-1 text-[#c5a059]" />
                                  <span className="font-semibold text-[9px]">Uploading...</span>
                                </div>
                              )}
                            </div>

                            {/* File Uploader Button & Direct Path */}
                            <div className="flex-1 min-w-0 space-y-2">
                              <div>
                                <input
                                  type="file"
                                  id={`home-leader-photo-upload-${idx}`}
                                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                                  className="hidden"
                                  onChange={(e) => handleLeaderImageUpload(e, idx)}
                                  disabled={uploadingLeaderIdx === idx}
                                />
                                <label
                                  htmlFor={`home-leader-photo-upload-${idx}`}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                                    uploadingLeaderIdx === idx
                                      ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                                      : 'bg-[#c5a059]/15 text-[#e6ca85] border-[#c5a059]/40 hover:bg-[#c5a059]/25 hover:border-[#c5a059]'
                                  }`}
                                >
                                  {uploadingLeaderIdx === idx ? (
                                    <>
                                      <Loader2 size={13} className="animate-spin" />
                                      <span>Uploading...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Upload size={13} />
                                      <span>Upload Photo</span>
                                    </>
                                  )}
                                </label>
                              </div>

                              <div>
                                <input
                                  type="text"
                                  value={leader.image || ''}
                                  onChange={(e) => updateDirectArrayItem('leaders', idx, 'image', e.target.value)}
                                  placeholder="/event-leadership-... or https://"
                                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-[11px] text-slate-300 font-mono placeholder:text-slate-600 focus:border-[#c5a059] outline-none"
                                />
                              </div>

                              {uploadError[idx] && (
                                <p className="text-[10px] text-rose-400 leading-tight">
                                  {uploadError[idx]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ======================= ABOUT PAGE EDITOR ======================= */}
          {slug === 'about' && (
            <>
              {/* Hero */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">1. Hero Section</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Badge</label>
                    <input
                      type="text"
                      value={content.hero?.badge || ''}
                      onChange={(e) => updateNestedField('hero', 'badge', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Heading</label>
                    <input
                      type="text"
                      value={content.hero?.heading || ''}
                      onChange={(e) => updateNestedField('hero', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Subtitle</label>
                    <textarea
                      rows={3}
                      value={content.hero?.subtitle || ''}
                      onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Story */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Layers size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">2. Our Story</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Story Heading</label>
                    <input
                      type="text"
                      value={content.story?.heading || ''}
                      onChange={(e) => updateNestedField('story', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Paragraph 1</label>
                    <textarea
                      rows={3}
                      value={content.story?.paragraph1 || ''}
                      onChange={(e) => updateNestedField('story', 'paragraph1', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Paragraph 2</label>
                    <textarea
                      rows={3}
                      value={content.story?.paragraph2 || ''}
                      onChange={(e) => updateNestedField('story', 'paragraph2', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Paragraph 3</label>
                    <textarea
                      rows={3}
                      value={content.story?.paragraph3 || ''}
                      onChange={(e) => updateNestedField('story', 'paragraph3', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Core Values */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Layers size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">3. Core Values</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.values?.map((val: any, idx: number) => (
                    <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                      <label className="block text-[11px] font-bold uppercase text-[#c5a059] mb-1">
                        Value {idx + 1} Title
                      </label>
                      <input
                        type="text"
                        value={val.title || ''}
                        onChange={(e) => updateDirectArrayItem('values', idx, 'title', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white mb-2"
                      />
                      <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={val.description || ''}
                        onChange={(e) => updateDirectArrayItem('values', idx, 'description', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision & Purpose */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">4. Vision &amp; Purpose</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Badge</label>
                    <input
                      type="text"
                      value={content.vision?.badge || ''}
                      onChange={(e) => updateNestedField('vision', 'badge', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Heading</label>
                    <input
                      type="text"
                      value={content.vision?.heading || ''}
                      onChange={(e) => updateNestedField('vision', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Vision Quote</label>
                    <input
                      type="text"
                      value={content.vision?.quote || ''}
                      onChange={(e) => updateNestedField('vision', 'quote', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* About Final CTA */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">5. Final Call to Action</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Heading</label>
                    <input
                      type="text"
                      value={content.finalCta?.heading || ''}
                      onChange={(e) => updateNestedField('finalCta', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Description</label>
                    <textarea
                      rows={2}
                      value={content.finalCta?.description || ''}
                      onChange={(e) => updateNestedField('finalCta', 'description', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Button Text</label>
                      <input
                        type="text"
                        value={content.finalCta?.btnText || ''}
                        onChange={(e) => updateNestedField('finalCta', 'btnText', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Button Link</label>
                      <input
                        type="text"
                        value={content.finalCta?.btnLink || ''}
                        onChange={(e) => updateNestedField('finalCta', 'btnLink', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ======================= COMMUNITY PAGE EDITOR ======================= */}
          {slug === 'community' && (
            <>
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">1. Hero Section</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Badge</label>
                    <input
                      type="text"
                      value={content.hero?.badge || ''}
                      onChange={(e) => updateNestedField('hero', 'badge', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Heading</label>
                    <input
                      type="text"
                      value={content.hero?.heading || ''}
                      onChange={(e) => updateNestedField('hero', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Subtitle</label>
                    <textarea
                      rows={3}
                      value={content.hero?.subtitle || ''}
                      onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Comparison Matrix Items */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Layers size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">2. Evaluation Matrix Criteria</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      GBN Circle Cohort Header
                    </label>
                    <input
                      type="text"
                      value={content.comparisonMatrix?.circleCohort || ''}
                      onChange={(e) => updateNestedField('comparisonMatrix', 'circleCohort', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1.5">
                      GBN Elite Council Header
                    </label>
                    <input
                      type="text"
                      value={content.comparisonMatrix?.eliteCouncil || ''}
                      onChange={(e) => updateNestedField('comparisonMatrix', 'eliteCouncil', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-[#e5c158]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {content.comparisonMatrix?.items?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Criteria Name</label>
                        <input
                          type="text"
                          value={item.feature || ''}
                          onChange={(e) => updateArrayItem('comparisonMatrix', 'items', idx, 'feature', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1">GBN Circle Value</label>
                        <input
                          type="text"
                          value={item.circle || ''}
                          onChange={(e) => updateArrayItem('comparisonMatrix', 'items', idx, 'circle', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#c5a059] mb-1">GBN Elite Value</label>
                        <input
                          type="text"
                          value={item.elite || ''}
                          onChange={(e) => updateArrayItem('comparisonMatrix', 'items', idx, 'elite', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-[#e5c158]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Action Buttons */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">3. Action Buttons</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Circle Button Text</label>
                    <input
                      type="text"
                      value={content.cta?.circleBtnText || ''}
                      onChange={(e) => updateNestedField('cta', 'circleBtnText', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Circle Button Link</label>
                    <input
                      type="text"
                      value={content.cta?.circleBtnLink || ''}
                      onChange={(e) => updateNestedField('cta', 'circleBtnLink', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1.5">Elite Button Text</label>
                    <input
                      type="text"
                      value={content.cta?.eliteBtnText || ''}
                      onChange={(e) => updateNestedField('cta', 'eliteBtnText', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-[#e5c158]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1.5">Elite Button Link</label>
                    <input
                      type="text"
                      value={content.cta?.eliteBtnLink || ''}
                      onChange={(e) => updateNestedField('cta', 'eliteBtnLink', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ======================= LEADERSHIP PAGE EDITOR ======================= */}
          {slug === 'leadership' && (
            <>
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">1. Hero Section &amp; Intro</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Heading</label>
                    <input
                      type="text"
                      value={content.hero?.heading || ''}
                      onChange={(e) => updateNestedField('hero', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Subtitle</label>
                    <textarea
                      rows={2}
                      value={content.hero?.subtitle || ''}
                      onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Executive Intro Paragraph</label>
                    <textarea
                      rows={3}
                      value={content.hero?.intro || ''}
                      onChange={(e) => updateNestedField('hero', 'intro', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Profiles */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Layers size={18} className="text-[#c5a059]" />
                    <h2 className="text-lg font-bold font-serif text-white">2. Leadership Profiles</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setContent((prev: any) => ({ ...prev, showLinkedIn: !prev?.showLinkedIn }))}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                      content.showLinkedIn
                        ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>LinkedIn on Cards:</span>
                    <span>{content.showLinkedIn ? '● Visible' : '○ Hidden'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.leaders?.map((leader: any, idx: number) => (
                    <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={leader.name || ''}
                          onChange={(e) => updateDirectArrayItem('leaders', idx, 'name', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-sm font-bold text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#c5a059] mb-1">Role Title</label>
                        <input
                          type="text"
                          value={leader.role || ''}
                          onChange={(e) => updateDirectArrayItem('leaders', idx, 'role', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-[#e5c158]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Bio / Statement</label>
                        <textarea
                          rows={4}
                          value={leader.statement || ''}
                          onChange={(e) => updateDirectArrayItem('leaders', idx, 'statement', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300 leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">LinkedIn URL (Optional)</label>
                        <input
                          type="text"
                          value={leader.linkedinUrl || ''}
                          onChange={(e) => updateDirectArrayItem('leaders', idx, 'linkedinUrl', e.target.value)}
                          placeholder="https://linkedin.com/in/profile"
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300 font-mono"
                        />
                      </div>

                      {/* Photo Upload & Preview Widget */}
                      <div className="pt-2 border-t border-slate-800/80">
                        <label className="block text-[10px] uppercase font-bold text-[#c5a059] mb-2 flex items-center justify-between">
                          <span>Portrait Photo</span>
                          {leader.image && (
                            <button
                              type="button"
                              onClick={() => updateDirectArrayItem('leaders', idx, 'image', '')}
                              className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
                              title="Clear photo"
                            >
                              <Trash2 size={11} />
                              <span>Clear</span>
                            </button>
                          )}
                        </label>

                        <div className="flex gap-3 items-start">
                          {/* Photo Preview Thumbnail */}
                          <div className="relative w-20 h-24 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center group/thumb">
                            {leader.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={leader.image}
                                alt={leader.name || 'Leader Portrait'}
                                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-slate-600 gap-1">
                                <ImageIcon size={22} />
                                <span className="text-[9px]">No photo</span>
                              </div>
                            )}

                            {uploadingLeaderIdx === idx && (
                              <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-[10px] text-[#e6ca85] backdrop-blur-xs">
                                <Loader2 size={18} className="animate-spin mb-1 text-[#c5a059]" />
                                <span className="font-semibold text-[9px]">Uploading...</span>
                              </div>
                            )}
                          </div>

                          {/* File Uploader Button & Direct Path */}
                          <div className="flex-1 min-w-0 space-y-2">
                            <div>
                              <input
                                type="file"
                                id={`leader-photo-upload-${idx}`}
                                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                                className="hidden"
                                onChange={(e) => handleLeaderImageUpload(e, idx)}
                                disabled={uploadingLeaderIdx === idx}
                              />
                              <label
                                htmlFor={`leader-photo-upload-${idx}`}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                                  uploadingLeaderIdx === idx
                                    ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                                    : 'bg-[#c5a059]/15 text-[#e6ca85] border-[#c5a059]/40 hover:bg-[#c5a059]/25 hover:border-[#c5a059]'
                                }`}
                              >
                                {uploadingLeaderIdx === idx ? (
                                  <>
                                    <Loader2 size={13} className="animate-spin" />
                                    <span>Uploading...</span>
                                  </>
                                ) : (
                                  <>
                                    <Upload size={13} />
                                    <span>Upload Portrait</span>
                                  </>
                                )}
                              </label>
                            </div>

                            {uploadError[idx] && (
                              <p className="text-[11px] text-rose-400 font-medium leading-tight">
                                {uploadError[idx]}
                              </p>
                            )}

                            <div>
                              <label className="block text-[9px] uppercase font-mono text-slate-500 mb-0.5">
                                Image Path / URL
                              </label>
                              <input
                                type="text"
                                value={leader.image || ''}
                                onChange={(e) => updateDirectArrayItem('leaders', idx, 'image', e.target.value)}
                                placeholder="/uploads/... or https://..."
                                className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-[11px] text-slate-400 font-mono focus:border-[#c5a059] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership Final CTA */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">3. Final Call to Action</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Badge</label>
                    <input
                      type="text"
                      value={content.finalCta?.badge || ''}
                      onChange={(e) => updateNestedField('finalCta', 'badge', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Heading</label>
                    <input
                      type="text"
                      value={content.finalCta?.heading || ''}
                      onChange={(e) => updateNestedField('finalCta', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Subtitle</label>
                    <textarea
                      rows={2}
                      value={content.finalCta?.subtitle || ''}
                      onChange={(e) => updateNestedField('finalCta', 'subtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Primary Button Text</label>
                    <input
                      type="text"
                      value={content.finalCta?.primaryBtnText || ''}
                      onChange={(e) => updateNestedField('finalCta', 'primaryBtnText', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Primary Button Link</label>
                    <input
                      type="text"
                      value={content.finalCta?.primaryBtnLink || ''}
                      onChange={(e) => updateNestedField('finalCta', 'primaryBtnLink', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Secondary Button Text</label>
                    <input
                      type="text"
                      value={content.finalCta?.secondaryBtnText || ''}
                      onChange={(e) => updateNestedField('finalCta', 'secondaryBtnText', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Secondary Button Link</label>
                    <input
                      type="text"
                      value={content.finalCta?.secondaryBtnLink || ''}
                      onChange={(e) => updateNestedField('finalCta', 'secondaryBtnLink', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ======================= CONTACT PAGE EDITOR ======================= */}
          {slug === 'contact' && (
            <>
              {/* Hero */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Sparkles size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">1. Hero Section</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Badge</label>
                    <input
                      type="text"
                      value={content.hero?.badge || ''}
                      onChange={(e) => updateNestedField('hero', 'badge', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Heading</label>
                    <input
                      type="text"
                      value={content.hero?.heading || ''}
                      onChange={(e) => updateNestedField('hero', 'heading', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Subtitle</label>
                    <textarea
                      rows={2}
                      value={content.hero?.subtitle || ''}
                      onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Direct Channels & Addresses */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-800 pb-3">
                  <Layers size={18} className="text-[#c5a059]" />
                  <h2 className="text-lg font-bold font-serif text-white">2. Contact Channels &amp; Office Addresses</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Official Email Address
                    </label>
                    <input
                      type="text"
                      value={content.channels?.email || ''}
                      onChange={(e) => updateNestedField('channels', 'email', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Official Phone Number
                    </label>
                    <input
                      type="text"
                      value={content.channels?.phone || ''}
                      onChange={(e) => updateNestedField('channels', 'phone', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={content.channels?.website || ''}
                      onChange={(e) => updateNestedField('channels', 'website', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Form Submit Button Label
                    </label>
                    <input
                      type="text"
                      value={content.form?.submitBtnText || ''}
                      onChange={(e) => updateNestedField('form', 'submitBtnText', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Georgia Office Address
                    </label>
                    <input
                      type="text"
                      value={content.channels?.georgiaOffice || ''}
                      onChange={(e) => updateNestedField('channels', 'georgiaOffice', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      India Office Address
                    </label>
                    <textarea
                      rows={2}
                      value={content.channels?.indiaOffice || ''}
                      onChange={(e) => updateNestedField('channels', 'indiaOffice', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Instagram Profile URL
                    </label>
                    <input
                      type="text"
                      value={content.channels?.instagramUrl || ''}
                      onChange={(e) => updateNestedField('channels', 'instagramUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        LinkedIn Profile URL
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          updateNestedField('channels', 'showLinkedIn', !content.channels?.showLinkedIn)
                        }
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                          content.channels?.showLinkedIn
                            ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {content.channels?.showLinkedIn ? '● Visible on Page' : '○ Hidden on Page'}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={content.channels?.linkedInUrl || ''}
                      onChange={(e) => updateNestedField('channels', 'linkedInUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Sticky Bottom Save Floating Bar */}
          <div className="sticky bottom-6 z-20 bg-slate-950/95 border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <HelpCircle size={14} className="text-[#c5a059]" />
              <span>All updates apply immediately to the live public page upon clicking Save.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={resetting || saving}
                className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-600/50 text-slate-300 hover:text-red-300 text-xs font-semibold transition disabled:opacity-50"
              >
                Reset to Defaults
              </button>

              <button
                type="button"
                onClick={() => handleSave()}
                disabled={saving || resetting}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
