'use client';

import { useState } from 'react';
import { Mail, Phone, Globe, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          interest: formData.subject || 'General Inquiry',
          message: formData.message,
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
    <div className="min-h-screen bg-[#070b19] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header / Hero (PRD Page 46) */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-[#c5a059] text-xs uppercase tracking-widest font-semibold border border-[#c5a059]/30 px-4 py-1.5 rounded-full bg-[#c5a059]/10">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif mt-5 text-white">
            Let&apos;s Connect &amp; Grow Together
          </h1>
          <p className="text-slate-300 mt-4 text-base leading-relaxed font-light">
            GBN Circle se judne, membership ke baare mein jaanne, partnership ya kisi business enquiry ke liye humse contact karein.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Social Links (PRD Page 46) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white font-serif mb-6">Contact Details</h2>

              <div className="space-y-6 text-sm">
                <a
                  href="mailto:gbncircle@gmail.com"
                  className="flex items-center group text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 text-[#c5a059] group-hover:border-[#c5a059] transition-colors shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">Email</span>
                    <span className="text-sm font-medium">gbncircle@gmail.com</span>
                  </div>
                </a>

                <a
                  href="tel:+919783577773"
                  className="flex items-center group text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 text-[#c5a059] group-hover:border-[#c5a059] transition-colors shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">Phone</span>
                    <span className="text-sm font-medium">+91 9783577773</span>
                  </div>
                </a>

                <a
                  href="https://www.gbncircle.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center group text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 text-[#c5a059] group-hover:border-[#c5a059] transition-colors shrink-0">
                    <Globe size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">Website</span>
                    <span className="text-sm font-medium">www.gbncircle.com</span>
                  </div>
                </a>
              </div>

              {/* Offices */}
              <div className="pt-8 mt-8 border-t border-slate-800/80 space-y-4 text-xs text-slate-300">
                <div className="flex items-start">
                  <MapPin size={16} className="mr-3 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium text-xs mb-0.5 uppercase tracking-wider">
                      Georgia Office
                    </strong>
                    <span className="text-slate-400">17 Ioane Shavteli St, Tbilisi, Georgia</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin size={16} className="mr-3 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium text-xs mb-0.5 uppercase tracking-wider">
                      India Office
                    </strong>
                    <span className="text-slate-400 leading-relaxed">
                      3rd floor, 261, Sewa Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links (PRD Page 46) */}
              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-3">
                  Social Links
                </span>
                <div className="flex items-center space-x-3">
                  <Link
                    href="#"
                    className="px-4 py-2 rounded border border-slate-800 bg-slate-950/60 hover:border-[#c5a059] text-slate-300 hover:text-white text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                  >
                    <span className="text-[10px] text-[#c5a059] font-bold">IG</span> Instagram
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2 rounded border border-slate-800 bg-slate-950/60 hover:border-[#c5a059] text-slate-300 hover:text-white text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                  >
                    <span className="text-[10px] text-[#c5a059] font-bold">LI</span> LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (PRD Page 46) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
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
                <label className="block text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm focus:border-[#c5a059] outline-none transition-colors"
                  placeholder="e.g. Membership Inquiry, Event Collaboration, Partnership"
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
                {loading ? 'Submitting Message...' : 'Submit Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}