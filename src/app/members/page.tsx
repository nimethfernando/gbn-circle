'use client';

import { useState, useEffect } from 'react';

interface Member {
  id: string;
  name: string;
  designation: string;
  company: string;
  industry: string;
  tier: 'GBN Circle' | 'GBN Elite';
  city: string;
  turnoverBand: string;
  linkedIn?: string;
}

const MEMBERS_DATA: Member[] = [
  {
    id: 'm1',
    name: 'Rajesh Subramanian',
    designation: 'Managing Director',
    company: 'Apex Logistics & Freight Corp',
    industry: 'Logistics & Supply Chain',
    tier: 'GBN Elite',
    city: 'Mumbai',
    turnoverBand: '₹5Cr+',
    linkedIn: 'https://linkedin.com',
  },
  {
    id: 'm2',
    name: 'Kavita Menon',
    designation: 'Founder & Principal Architect',
    company: 'Studio Terra Spatial Labs',
    industry: 'Architecture & Design',
    tier: 'GBN Circle',
    city: 'Bengaluru',
    turnoverBand: '₹20L - ₹1Cr',
    linkedIn: 'https://linkedin.com',
  },
  {
    id: 'm3',
    name: 'Arunav Singhal',
    designation: 'Chief Executive Officer',
    company: 'Novus Precision Engineering',
    industry: 'Manufacturing',
    tier: 'GBN Elite',
    city: 'Pune',
    turnoverBand: '₹5Cr+',
    linkedIn: 'https://linkedin.com',
  },
  {
    id: 'm4',
    name: 'Priyanka Sen',
    designation: 'Managing Partner',
    company: 'Sen & Associates Corporate Law',
    industry: 'Legal & Compliance',
    tier: 'GBN Circle',
    city: 'New Delhi',
    turnoverBand: '₹1Cr - ₹5Cr',
    linkedIn: 'https://linkedin.com',
  },
  {
    id: 'm5',
    name: 'Vikramaditya Chawla',
    designation: 'Co-Founder & CTO',
    company: 'Synthetix Cloud Systems',
    industry: 'Information Technology',
    tier: 'GBN Circle',
    city: 'Hyderabad',
    turnoverBand: '₹1Cr - ₹5Cr',
    linkedIn: 'https://linkedin.com',
  },
  {
    id: 'm6',
    name: 'Deepak Merchant',
    designation: 'Chairman & MD',
    company: 'Merchant Polymers & Packaging',
    industry: 'Manufacturing',
    tier: 'GBN Elite',
    city: 'Ahmedabad',
    turnoverBand: '₹5Cr+',
    linkedIn: 'https://linkedin.com',
  },
];

const INDUSTRIES = [
  'All Sectors',
  'Logistics & Supply Chain',
  'Architecture & Design',
  'Manufacturing',
  'Legal & Compliance',
  'Information Technology',
];

export default function MembersDirectoryPage() {
  const [members, setMembers] = useState<Member[]>(MEMBERS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Sectors');
  const [selectedTier, setSelectedTier] = useState<'ALL' | 'GBN Circle' | 'GBN Elite'>('ALL');

  useEffect(() => {
    let ignore = false;
    fetch('/api/members')
      .then((res) => res.json())
      .then((json) => {
        if (!ignore && json.success && json.data && json.data.length > 0) {
          setMembers(json.data);
        }
      })
      .catch((err) => console.error('Error fetching live members:', err));
    return () => {
      ignore = true;
    };
  }, []);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      selectedIndustry === 'All Sectors' || m.industry === selectedIndustry;

    const matchesTier = selectedTier === 'ALL' || m.tier === selectedTier;

    return matchesSearch && matchesIndustry && matchesTier;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b19] text-slate-900 dark:text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#b38838] dark:text-[#c5a059] text-xs uppercase tracking-widest font-semibold border border-[#c5a059]/30 px-3.5 py-1 rounded-full bg-[#c5a059]/10">
            Member Register
          </span>
          <h1 className="text-4xl font-bold font-serif mt-4 text-slate-900 dark:text-white">
            Verified Founder Network
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm font-normal dark:font-light leading-relaxed">
            Browse verified entrepreneurs, business owners, and corporate partners within the GBN Circle and Elite rosters.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm dark:shadow-none">
          <input
            type="text"
            placeholder="Search by founder, firm, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#c5a059] outline-none"
          />

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white outline-none"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {ind}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            {(['ALL', 'GBN Circle', 'GBN Elite'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`flex-1 text-[11px] font-semibold rounded-xl py-2 transition ${
                  selectedTier === tier
                    ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tier === 'ALL' ? 'All Tiers' : tier}
              </button>
            ))}
          </div>
        </div>

        {/* Members Roster */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-transparent">
            <p className="text-slate-500 dark:text-slate-400 text-xs">No verified members match your search parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-[#c5a059]/60 dark:hover:border-[#c5a059]/40 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md dark:shadow-none flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                        member.tier === 'GBN Elite'
                          ? 'bg-[#c5a059] text-black shadow-sm'
                          : 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800/50'
                      }`}
                    >
                      {member.tier}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">{member.city}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">{member.name}</h3>
                  <p className="text-xs text-[#b38838] dark:text-[#c5a059] font-medium mt-0.5">{member.designation}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-semibold">{member.company}</p>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Industry:</span>
                      <span className="text-slate-800 dark:text-slate-300 font-semibold">{member.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Turnover Tier:</span>
                      <span className="text-slate-800 dark:text-slate-300 font-semibold">{member.turnoverBand}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified Member
                  </span>
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#b38838] dark:text-[#c5a059] hover:underline font-semibold"
                    >
                      View Profile &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}