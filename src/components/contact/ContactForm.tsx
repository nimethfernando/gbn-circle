'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactFormProps {
  submitBtnText?: string;
}

export default function ContactForm({ submitBtnText }: ContactFormProps) {
  const { t } = useLanguage();

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
          message: json.message || t.contact.success,
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
          message: json.message || t.contact.error,
        });
      }
    } catch {
      setStatus({
        success: false,
        message: t.contact.networkError,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-sm shadow-xl dark:shadow-none transition-colors duration-300">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif mb-6">
        {t.contact.formTitle}
      </h2>

      {status && (
        <div
          className={`p-4 rounded-lg mb-6 text-xs flex items-center gap-2 border ${
            status.success
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
              : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-500/30 text-red-800 dark:text-red-300'
          }`}
        >
          {status.success ? (
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle size={16} className="shrink-0 text-red-600 dark:text-red-400" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-950 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
              {t.contact.fullName}
            </label>
            <input
              required
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded p-3 text-slate-900 dark:text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
              placeholder={t.contact.fullNamePlaceholder}
            />
          </div>
          <div>
            <label className="block text-slate-950 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
              {t.contact.email}
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded p-3 text-slate-900 dark:text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
              placeholder={t.contact.emailPlaceholder}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-950 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
              {t.contact.phone}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded p-3 text-slate-900 dark:text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
              placeholder={t.contact.phonePlaceholder}
            />
          </div>
          <div>
            <label className="block text-slate-950 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
              {t.contact.company}
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded p-3 text-slate-900 dark:text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
              placeholder={t.contact.companyPlaceholder}
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-950 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5 flex items-center justify-between">
            <span>{t.contact.tier}</span>
            <span className="text-[9px] text-[#a88235] dark:text-[#c5a059] font-medium normal-case">
              {t.contact.tierHint}
            </span>
          </label>
          <select
            required
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded p-3 text-slate-900 dark:text-white text-sm focus:border-[#c5a059] outline-none transition-colors cursor-pointer"
          >
            <option value="GBN Circle" className="bg-white dark:bg-[#070b19] text-slate-900 dark:text-white">
              {t.contact.tierCircle}
            </option>
            <option value="GBN Elite" className="bg-white dark:bg-[#070b19] text-[#a88235] dark:text-[#e5c158]">
              {t.contact.tierElite}
            </option>
            <option value="General Inquiry" className="bg-white dark:bg-[#070b19] text-slate-900 dark:text-slate-300">
              {t.contact.tierGeneral}
            </option>
          </select>
        </div>

        <div>
          <label className="block text-slate-950 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
            {t.contact.subject}
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded p-3 text-slate-900 dark:text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
            placeholder={t.contact.subjectPlaceholder}
          />
        </div>

        <div>
          <label className="block text-slate-950 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
            {t.contact.message}
          </label>
          <textarea
            required
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded p-3 text-slate-900 dark:text-white text-sm focus:border-[#c5a059] outline-none transition-colors resize-none"
            placeholder={t.contact.messagePlaceholder}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold uppercase rounded text-xs tracking-widest hover:opacity-95 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? t.contact.submitting : submitBtnText || t.contact.submitBtn}
        </button>
      </form>
    </div>
  );
}
