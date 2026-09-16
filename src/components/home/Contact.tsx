"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, Globe, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
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
    <section className="py-24 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white relative transition-colors duration-300" id="contact">
      <Image
        src="/event-leadership-C1eE1_9Q.jpg"
        alt="Background"
        fill
        className="object-cover opacity-[0.03] dark:opacity-10 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-slate-50 via-slate-50/90 to-slate-50 dark:from-gbn-navy dark:via-gbn-navy/90 dark:to-gbn-navy pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Information */}
          <div className="lg:w-1/2 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#c5a059] rounded-full"></div>
              <p className="text-[#a88235] dark:text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                {t.contact.badge}
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              {t.contact.heading}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 font-light mb-10 leading-relaxed max-w-lg">
              {t.contact.desc}
            </p>

            <div className="space-y-6 mb-10">
              <a href="mailto:gbncircle@gmail.com" className="flex items-center group">
                <div className="w-12 h-12 border border-slate-300 dark:border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-[#c5a059] group-hover:text-[#c5a059] transition-colors text-slate-700 dark:text-white bg-white dark:bg-transparent shadow-sm">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Email</p>
                  <p className="font-light text-slate-800 dark:text-gray-300 group-hover:text-[#c5a059] dark:group-hover:text-white transition-colors">
                    gbncircle@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:+919783577773" className="flex items-center group">
                <div className="w-12 h-12 border border-slate-300 dark:border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-[#c5a059] group-hover:text-[#c5a059] transition-colors text-slate-700 dark:text-white bg-white dark:bg-transparent shadow-sm">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Phone</p>
                  <p className="font-light text-slate-800 dark:text-gray-300 group-hover:text-[#c5a059] dark:group-hover:text-white transition-colors">
                    +91 9783577773
                  </p>
                </div>
              </a>

              <a
                href="https://www.gbncircle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <div className="w-12 h-12 border border-slate-300 dark:border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-[#c5a059] group-hover:text-[#c5a059] transition-colors text-slate-700 dark:text-white bg-white dark:bg-transparent shadow-sm shrink-0">
                  <Globe size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Website</p>
                  <p className="font-light text-slate-800 dark:text-gray-300 group-hover:text-[#c5a059] dark:group-hover:text-white transition-colors">
                    www.gbncircle.com
                  </p>
                </div>
              </a>

              <div className="flex items-start group pt-4 border-t border-slate-200 dark:border-white/5">
                <div className="w-12 h-12 border border-slate-300 dark:border-white/10 rounded-sm flex items-center justify-center mr-4 text-[#c5a059] bg-white dark:bg-transparent shadow-sm shrink-0">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">
                      {t.footer.georgiaOffice}
                    </p>
                    <p className="font-light text-slate-800 dark:text-gray-300 text-sm">
                      {t.footer.georgiaAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">
                      {t.footer.indiaOffice}
                    </p>
                    <p className="font-light text-slate-800 dark:text-gray-300 text-sm leading-relaxed">
                      {t.footer.indiaAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gbn-navy-light/40 border border-slate-200 dark:border-white/5 p-8 md:p-10 rounded-sm shadow-xl dark:shadow-none">
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">
                {t.contact.formTitle}
              </h3>

              {status && (
                <div
                  className={`p-4 rounded-sm mb-6 text-xs flex items-center gap-2 border ${
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-gray-400 mb-1">
                      {t.contact.fullName}
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-sm border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white focus:outline-none focus:border-[#c5a059] dark:focus:border-gbn-gold transition-colors font-light text-sm"
                      placeholder={t.contact.fullNamePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-gray-400 mb-1">
                      {t.contact.email}
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-sm border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white focus:outline-none focus:border-[#c5a059] dark:focus:border-gbn-gold transition-colors font-light text-sm"
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-gray-400 mb-1">
                      {t.contact.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-sm border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white focus:outline-none focus:border-[#c5a059] dark:focus:border-gbn-gold transition-colors font-light text-sm"
                      placeholder={t.contact.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-gray-400 mb-1">
                      {t.contact.company}
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-sm border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white focus:outline-none focus:border-[#c5a059] dark:focus:border-gbn-gold transition-colors font-light text-sm"
                      placeholder={t.contact.companyPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-gray-400 mb-1.5 flex items-center justify-between">
                    <span>{t.contact.tier}</span>
                    <span className="text-[9px] text-[#a88235] dark:text-[#c5a059] font-normal normal-case">
                      {t.contact.tierHint}
                    </span>
                  </label>
                  <select
                    required
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white focus:outline-none focus:border-[#c5a059] dark:focus:border-gbn-gold transition-colors font-light text-sm cursor-pointer"
                  >
                    <option value="GBN Circle" className="bg-white dark:bg-[#070b19] text-slate-900 dark:text-white">
                      {t.contact.tierCircle}
                    </option>
                    <option value="GBN Elite" className="bg-white dark:bg-[#070b19] text-[#a88235] dark:text-[#e5c158]">
                      {t.contact.tierElite}
                    </option>
                    <option value="General Inquiry" className="bg-white dark:bg-[#070b19] text-slate-600 dark:text-slate-300">
                      {t.contact.tierGeneral}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-gray-400 mb-1">
                    {t.contact.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white focus:outline-none focus:border-[#c5a059] dark:focus:border-gbn-gold transition-colors font-light text-sm"
                    placeholder={t.contact.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-gray-400 mb-1">
                    {t.contact.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-gbn-navy text-slate-900 dark:text-white focus:outline-none focus:border-[#c5a059] dark:focus:border-gbn-gold transition-colors font-light resize-none text-sm"
                    placeholder={t.contact.messagePlaceholder}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-[10px] tracking-widest uppercase font-bold py-4 rounded-sm transition-all mt-4 flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50 shadow-md"
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  {loading ? t.contact.submitting : t.contact.submitBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
