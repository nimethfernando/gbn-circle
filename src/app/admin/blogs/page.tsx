'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  AlertCircle,
  Clock,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  takeaways?: string | null;
  image: string;
  category: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  'Networking & Trust',
  'Global Expansion',
  'Cross-Border Trade',
  'Leadership',
  'Innovation',
  'Strategic Partnerships',
];

const PRESET_IMAGES = [
  { label: 'Vision & Architecture', url: '/vision-wide-Dafp-BMf.jpg' },
  { label: 'Global Summit', url: '/event-global-CKOLaEg2 (1).jpg' },
  { label: 'Executive Boardroom', url: '/event-leadership-C1eE1_9Q (1).jpg' },
  { label: 'Founders Leadership', url: '/event-leadership-C1eE1_9Q.jpg' },
  { label: 'Structured Networking', url: '/event-networking-BdmXOEy2 (1).jpg' },
];

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    takeaways: '',
    image: '/vision-wide-Dafp-BMf.jpg',
    category: 'Networking & Trust',
    readTime: '5 min read',
    authorName: 'GBN Executive Board',
    authorRole: 'Global Business Network Leadership',
    published: true,
    featured: false,
  });

  const reloadBlogs = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching admin blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch('/api/admin/blogs');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (!ignore && data.success) {
          setBlogs(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching admin blogs:', err);
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
    } catch {
      alert('Failed to sign out');
    } finally {
      setLoggingOut(false);
    }
  };

  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setSelectedBlogId(null);
    setFormError(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      takeaways: '',
      image: '/vision-wide-Dafp-BMf.jpg',
      category: 'Networking & Trust',
      readTime: '5 min read',
      authorName: 'GBN Executive Board',
      authorRole: 'Global Business Network Leadership',
      published: true,
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog: BlogArticle) => {
    setIsEditing(true);
    setSelectedBlogId(blog.id);
    setFormError(null);

    let parsedTakeaways = '';
    if (blog.takeaways) {
      try {
        const arr = JSON.parse(blog.takeaways);
        if (Array.isArray(arr)) parsedTakeaways = arr.join('\n');
        else parsedTakeaways = blog.takeaways;
      } catch {
        parsedTakeaways = blog.takeaways;
      }
    }

    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      takeaways: parsedTakeaways,
      image: blog.image,
      category: blog.category,
      readTime: blog.readTime,
      authorName: blog.authorName,
      authorRole: blog.authorRole,
      published: blog.published,
      featured: blog.featured,
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const autoSlug = !isEditing || !prev.slug
        ? val
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
        : prev.slug;
      return { ...prev, title: val, slug: autoSlug };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    try {
      const payload = {
        ...formData,
        takeaways: formData.takeaways
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const url = isEditing
        ? `/api/admin/blogs/${selectedBlogId}`
        : '/api/admin/blogs';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setFormError(json.message || 'Failed to save blog article');
        setSaving(false);
        return;
      }

      setIsModalOpen(false);
      reloadBlogs();
    } catch {
      setFormError('Network error while saving article');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (blog: BlogArticle) => {
    try {
      setActionLoading(`toggle-${blog.id}`);
      const res = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !blog.published }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, published: !b.published } : b))
        );
      }
    } catch {
      alert('Failed to toggle publish state');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleFeatured = async (blog: BlogArticle) => {
    try {
      setActionLoading(`featured-${blog.id}`);
      const res = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !blog.featured }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, featured: !b.featured } : b))
        );
      }
    } catch {
      alert('Failed to toggle featured state');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (blog: BlogArticle) => {
    if (!confirm(`Are you sure you want to permanently delete "${blog.title}"?`)) {
      return;
    }

    try {
      setActionLoading(`delete-${blog.id}`);
      const res = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      } else {
        alert('Failed to delete blog article');
      }
    } catch {
      alert('Network error while deleting article');
    } finally {
      setActionLoading(null);
    }
  };

  // Metrics
  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.published).length;
  const draftsCount = blogs.filter((b) => !b.published).length;
  const featuredCount = blogs.filter((b) => b.featured).length;

  // Filtered List
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' || blog.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'PUBLISHED' && blog.published) ||
      (statusFilter === 'DRAFT' && !blog.published);

    return matchesSearch && matchesCategory && matchesStatus;
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
            Blogs Management CMS
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blogs"
            target="_blank"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5"
          >
            <span>Live Blogs</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-4 py-2 bg-slate-900 hover:bg-red-950/60 border border-slate-800 hover:border-red-600/50 text-slate-300 hover:text-red-300 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-8 pb-3">
        <Link
          href="/admin/events"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          Events Management
        </Link>
        <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] rounded-lg shadow-md">
          Blogs CMS
        </div>
        <Link
          href="/admin/inquiries"
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          Inquiries &amp; Leads
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Total Articles
          </div>
          <div className="text-3xl font-bold text-white mt-1 font-serif">{totalCount}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Published Live
          </div>
          <div className="text-3xl font-bold text-emerald-400 mt-1 font-serif">{publishedCount}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Drafts
          </div>
          <div className="text-3xl font-bold text-amber-400 mt-1 font-serif">{draftsCount}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Featured
          </div>
          <div className="text-3xl font-bold text-[#c5a059] mt-1 font-serif">{featuredCount}</div>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-5 mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search title, author, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-[#c5a059] outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-[#c5a059] outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-[#c5a059] outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Drafts Only</option>
          </select>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold uppercase text-xs tracking-wider rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shrink-0 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Blog Article</span>
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-3">
            <Loader2 size={28} className="animate-spin text-[#c5a059]" />
            <span>Loading blog articles...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-sm">
            <BookOpen size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="font-semibold text-white">No blog articles match your filters</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or click &ldquo;Add New Blog Article&rdquo; to publish one.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4 font-semibold">Article</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Author</th>
                  <th className="py-3 px-4 font-semibold">Read Time</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-center">Featured</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded overflow-hidden shrink-0 border border-slate-800 bg-slate-950">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-sm line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-slate-500 text-[11px] font-mono line-clamp-1">
                            /{blog.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {blog.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-200">{blog.authorName}</div>
                      <div className="text-[10px] text-slate-500">{blog.authorRole}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-500" />
                        <span>{blog.readTime}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        disabled={actionLoading === `toggle-${blog.id}`}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border transition flex items-center gap-1.5 ${
                          blog.published
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900'
                            : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        {blog.published ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{blog.published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleToggleFeatured(blog)}
                        disabled={actionLoading === `featured-${blog.id}`}
                        title={blog.featured ? 'Unset Featured' : 'Mark as Featured'}
                        className={`p-1.5 rounded transition ${
                          blog.featured
                            ? 'text-[#c5a059] bg-[#c5a059]/10'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        <Star size={16} fill={blog.featured ? 'currentColor' : 'none'} />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(blog)}
                          className="p-1.5 text-slate-300 hover:text-[#c5a059] bg-slate-950 border border-slate-800 rounded hover:border-[#c5a059]/40 transition"
                          title="Edit Article"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog)}
                          disabled={actionLoading === `delete-${blog.id}`}
                          className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-950 border border-slate-800 rounded hover:border-red-600/40 transition"
                          title="Delete Article"
                        >
                          <Trash2 size={14} />
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1329] border border-slate-800 rounded-2xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white font-serif">
                    {isEditing ? 'Edit Blog Article' : 'Create New Blog Article'}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Content will be instantly published or saved as draft in the GBN Circle repository.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
              {formError && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-300 rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title & Slug */}
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                    Article Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Cross-Border Market Entry for Mid-Market Enterprises"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-sm focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. cross-border-market-entry"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono text-xs focus:border-[#c5a059] outline-none"
                  />
                </div>
              </div>

              {/* Category, Read Time, Image */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#c5a059] outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 6 min read"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                    Preset Image
                  </label>
                  <select
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#c5a059] outline-none"
                  >
                    {PRESET_IMAGES.map((img) => (
                      <option key={img.url} value={img.url}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    placeholder="e.g. Amit Batra"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#c5a059] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                    Author Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    placeholder="e.g. Founder & President, GBN Circle"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-[#c5a059] outline-none"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                  Summary Excerpt (Shown on Cards) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A concise 2-sentence synopsis summarizing the core thesis..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-xs focus:border-[#c5a059] outline-none resize-none"
                ></textarea>
              </div>

              {/* Key Takeaways */}
              <div>
                <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                  Key Takeaways (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.takeaways}
                  onChange={(e) => setFormData({ ...formData, takeaways: e.target.value })}
                  placeholder="Key point 1&#10;Key point 2&#10;Key point 3"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-xs font-mono focus:border-[#c5a059] outline-none resize-none"
                ></textarea>
              </div>

              {/* Full Article Content */}
              <div>
                <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                  Full Article Body (Paragraphs separated by double line breaks) *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full text of the executive dispatch or thought leadership piece..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white text-xs leading-relaxed focus:border-[#c5a059] outline-none"
                ></textarea>
              </div>

              {/* Checkbox Options */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-[#c5a059] focus:ring-0"
                  />
                  <span className="text-slate-200 text-xs font-semibold">
                    Publish immediately (Visible on website)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-[#c5a059] focus:ring-0"
                  />
                  <span className="text-[#c5a059] text-xs font-semibold">
                    Set as Featured Article (Top banner)
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold uppercase text-xs tracking-wider rounded-lg transition hover:scale-105 disabled:opacity-50 flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {saving ? 'Saving Article...' : isEditing ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

