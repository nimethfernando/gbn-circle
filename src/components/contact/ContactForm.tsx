'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  submitBtnText?: string;
}

export default function ContactForm({ submitBtnText }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    tier: 'GBN Circle',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          companyName: formData.companyName || null,
          interest: formData.tier || 'GBN Circle',
          message: formData.subject
            ? `[Subject: ${formData.subject}]\n\n${formData.message}`
            : formData.message,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus({
          success: true,
          message: json.message || 'Your message has been sent successfully.',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          tier: 'GBN Circle',
          subject: '',
          message: '',
        });
      } else {
        setStatus({
          success: false,
          message: json.message || 'Failed to submit message. Please try again.',
        });
      }
    } catch {
      setStatus({
        success: false,
        message: 'A network error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white font-serif mb-6">Contact Form</h2>

      {status && (
        <div
          className={`p-4 rounded-lg mb-6 text-xs flex items-center gap-2 border ${
            status.success
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : 'bg-red-950/40 border-red-500/30 text-red-300'
          }`}
        >
          {status.success ? (
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle size={16} className="shrink-0 text-red-400" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
              Full Name *
            </label>
            <input
              required
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
              Email *
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
              placeholder="+91 9783577773"
            />
          </div>
          <div>
            <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
              Company / Business
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
              placeholder="Company or Business Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5 flex items-center justify-between">
            <span>Applying For / Network Tier *</span>
            <span className="text-[9px] text-[#c5a059] font-normal normal-case">Select community tier</span>
          </label>
          <select
            required
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:border-[#c5a059] outline-none transition-colors cursor-pointer"
          >
            <option value="GBN Circle" className="bg-[#070b19] text-white">
              GBN Circle — For businesses with ₹20 Lakh+ annual turnover
            </option>
            <option value="GBN Elite" className="bg-[#070b19] text-[#e5c158]">
              GBN Elite — For businesses with ₹5 Crore+ annual turnover
            </option>
            <option value="General Inquiry" className="bg-[#070b19] text-slate-300">
              General Inquiry / Strategic Collaboration
            </option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
            Subject / Specific Inquiry (Optional)
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
            placeholder="e.g. Chapter Membership, Guest Visit, Cross-Border Expansion"
          />
        </div>

        <div>
          <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
            Message *
          </label>
          <textarea
            required
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:border-[#c5a059] outline-none transition-colors resize-none"
            placeholder="Write your message or inquiry here..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold uppercase rounded text-xs tracking-widest hover:opacity-95 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? 'Contacting...' : submitBtnText || 'Contact GBN Circle'}
        </button>
      </form>
    </div>
  );
}
