import React from 'react';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import ContactForm from '@/components/contact/ContactForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us | GBN Circle — Global Business Network',
  description:
    'Reach out to GBN Circle for membership queries, partnerships, and executive inquiries.',
};

export default async function ContactPage() {
  const content = await getPageContent('contact');

  const email = content?.channels?.email || 'gbncircle@gmail.com';
  const phone = content?.channels?.phone || '+91 9783577773';
  const website = content?.channels?.website || 'www.gbncircle.com';
  const websiteUrl = website.startsWith('http') ? website : `https://${website}`;

  const georgiaOffice = content?.channels?.georgiaOffice || '17 Ioane Shavteli St, Tbilisi, Georgia';
  const indiaOffice =
    content?.channels?.indiaOffice ||
    '3rd floor, 243, Seva Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004';

  const instagram = content?.channels?.instagramUrl || 'https://www.instagram.com/gbncircle?stkn=dTNpdGd1d3c2YjJ4&utm_source=qr';
  const linkedin = content?.channels?.linkedInUrl || 'https://www.linkedin.com/company/gbn-circle/';

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header / Hero (PRD Page 46) */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-[#c5a059] text-xs uppercase tracking-widest font-semibold border border-[#c5a059]/30 px-4 py-1.5 rounded-full bg-[#c5a059]/10">
            {content?.hero?.badge || 'Contact Us'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif mt-5 text-white">
            {content?.hero?.heading || "Let's Connect & Grow Together"}
          </h1>
          <p className="text-slate-300 mt-4 text-base leading-relaxed font-light">
            {content?.hero?.subtitle ||
              'GBN Circle se judne, membership ke baare mein jaanne, partnership ya kisi business enquiry ke liye humse contact karein.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Social Links (PRD Page 46) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white font-serif mb-6">Contact Details</h2>

              <div className="space-y-6 text-sm">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center group text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 text-[#c5a059] group-hover:border-[#c5a059] transition-colors shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                      Email
                    </span>
                    <span className="text-sm font-medium">{email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center group text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 text-[#c5a059] group-hover:border-[#c5a059] transition-colors shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                      Phone
                    </span>
                    <span className="text-sm font-medium">{phone}</span>
                  </div>
                </a>

                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center group text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 text-[#c5a059] group-hover:border-[#c5a059] transition-colors shrink-0">
                    <Globe size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                      Website
                    </span>
                    <span className="text-sm font-medium">{website}</span>
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
                    <span className="text-slate-400 leading-relaxed">{georgiaOffice}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin size={16} className="mr-3 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium text-xs mb-0.5 uppercase tracking-wider">
                      India Office
                    </strong>
                    <span className="text-slate-400 leading-relaxed">{indiaOffice}</span>
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
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded border border-slate-800 bg-slate-950/60 hover:border-[#c5a059] text-slate-300 hover:text-white text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                  >
                    <span className="text-[10px] text-[#c5a059] font-bold">IG</span> Instagram
                  </Link>
                  <Link
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded border border-slate-800 bg-slate-950/60 hover:border-[#c5a059] text-slate-300 hover:text-white text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                  >
                    <span className="text-[10px] text-[#c5a059] font-bold">LI</span> LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (PRD Page 46) */}
          <div className="lg:col-span-7">
            <ContactForm submitBtnText={content?.form?.submitBtnText} />
          </div>
        </div>
      </div>
    </div>
  );
}