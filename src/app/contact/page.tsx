'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    turnover: '₹20L - ₹1Cr',
    inquiryType: 'Membership Application',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#c5a059] text-xs uppercase tracking-widest font-semibold border border-[#c5a059]/30 px-3 py-1 rounded-full">
            Connect With Directorate
          </span>
          <h1 className="text-4xl font-bold font-serif mt-4 text-white">
            Initiate Your Engagement
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Speak directly with chapter directors or submit inquiries for membership eligibility and corporate partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-white font-serif mb-4">Direct Communication Channels</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Telephone / WhatsApp Desk</span>
                  <a
                    href="https://wa.me/919783577773"
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-semibold text-[#c5a059] hover:underline"
                  >
                    +91 9783577773
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Central Secretariat</span>
                  <a
                    href="mailto:gbncircle@gmail.com"
                    className="text-sm text-slate-200 hover:text-white"
                  >
                    gbncircle@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Executive Hours</span>
                  <p className="text-slate-300">Monday &ndash; Saturday: 09:00 AM &ndash; 06:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-white font-serif mb-3">Chapter Presence</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span>National Chapter Hub</span>
                  <span className="text-[#c5a059]">Bengaluru, India</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span>Western Regional Council</span>
                  <span className="text-slate-400">Mumbai &amp; Pune</span>
                </div>
                <div className="flex justify-between">
                  <span>Global Virtual Desks</span>
                  <span className="text-slate-400">GCC &amp; Southeast Asia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Submission Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="text-3xl text-emerald-400">&check;</div>
                <h3 className="text-lg font-bold text-white">Inquiry Forwarded</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your details have been submitted to the regional coordinator. An executive will reach out to you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Corporate Email *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">WhatsApp Contact Number *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Organization / Brand *</label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Annual Turnover Bracket</label>
                    <select
                      value={formData.turnover}
                      onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white outline-none"
                    >
                      <option value="₹20L - ₹1Cr">₹20 Lakhs &ndash; ₹1 Crore (Circle Candidate)</option>
                      <option value="₹1Cr - ₹5Cr">₹1 Crore &ndash; ₹5 Crores (Circle Senior)</option>
                      <option value="₹5Cr+">₹5 Crores+ (Elite Candidate)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Nature of Inquiry</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white outline-none"
                    >
                      <option value="Membership Application">Membership Application</option>
                      <option value="Chapter Launch Inquiry">Chapter Launch Inquiry</option>
                      <option value="Cross-Chapter Collaboration">Cross-Chapter Collaboration</option>
                      <option value="Visitor Support">Visitor Attendance Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Message / Collaboration Intent *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase rounded text-xs tracking-wider transition"
                >
                  Submit Inquiry to Directorate
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}