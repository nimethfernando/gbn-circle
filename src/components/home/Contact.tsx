'use client';

import { useState } from 'react';
import { Mail, Phone, Globe, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
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
          message: json.message || 'Failed to submit your message. Please try again.',
        });
      }
    } catch {
      setStatus({
        success: false,
        message: 'Network error. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gbn-navy text-white relative" id="contact">
      <Image
        src="/event-leadership-C1eE1_9Q.jpg"
        alt="Background"
        fill
        className="object-cover opacity-10 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-gbn-navy via-gbn-navy/90 to-gbn-navy pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Information */}
          <div className="lg:w-1/2 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
              <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                Contact Us
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Let&apos;s Connect.</h2>
            <p className="text-lg text-gray-300 font-light mb-10 leading-relaxed max-w-lg">
              Whether you want to join GBN Circle, attend an event, explore a collaboration or learn more about the community, we&apos;d love to hear from you.
            </p>

            <div className="space-y-6 mb-10">
              <a href="mailto:gbncircle@gmail.com" className="flex items-center group">
                <div className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-gbn-gold group-hover:text-gbn-gold transition-colors text-white">
                  <Mail size={18} strokeWidth={1} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500">Email</p>
                  <p className="font-light text-gray-300 group-hover:text-white transition-colors">
                    gbncircle@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:+919783577773" className="flex items-center group">
                <div className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-gbn-gold group-hover:text-gbn-gold transition-colors text-white">
                  <Phone size={18} strokeWidth={1} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500">Phone</p>
                  <p className="font-light text-gray-300 group-hover:text-white transition-colors">
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
                <div className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center mr-4 group-hover:border-gbn-gold group-hover:text-gbn-gold transition-colors text-white shrink-0">
                  <Globe size={18} strokeWidth={1} />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500">Website</p>
                  <p className="font-light text-gray-300 group-hover:text-white transition-colors">
                    www.gbncircle.com
                  </p>
                </div>
              </a>

              <div className="flex items-start group pt-4 border-t border-white/5">
                <div className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center mr-4 text-gbn-gold shrink-0">
                  <MapPin size={18} strokeWidth={1} />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500">
                      Georgia Office
                    </p>
                    <p className="font-light text-gray-300 text-sm">
                      17 Ioane Shavteli St, Tbilisi, Georgia
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500">
                      India Office
                    </p>
                    <p className="font-light text-gray-300 text-sm leading-relaxed">
                      3rd floor, 261, Sewa Sadan Marg, <br />
                      Frontier Colony, Adarsh Nagar, <br />
                      Jaipur, Rajasthan 302004
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white hover:border-gbn-gold hover:text-gbn-gold transition-colors"
              >
                <span className="text-[10px]">IN</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white hover:border-gbn-gold hover:text-gbn-gold transition-colors"
              >
                <span className="text-[10px]">LI</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-gbn-navy-light/40 border border-white/5 p-8 md:p-10 rounded-sm premium-shadow">
              <h3 className="text-2xl font-serif text-white mb-6">Send us a message</h3>

              {status && (
                <div
                  className={`p-4 rounded-sm mb-6 text-xs flex items-center gap-2 border ${
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light text-sm"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                      Company / Business
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light text-sm"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                    Subject / Area of Interest
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light text-sm"
                    placeholder="e.g. Executive Membership, Partnership, Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-white/10 bg-gbn-navy text-white focus:outline-none focus:border-gbn-gold transition-colors font-light resize-none text-sm"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-[10px] tracking-widest uppercase font-bold py-4 rounded-sm transition-all mt-4 flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50"
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  {loading ? 'Contacting...' : 'Contact GBN Circle'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}