'use client';

import Link from 'next/link';

export default function CommunityPage() {
  const comparisonItems = [
    {
      feature: 'Revenue Eligibility Threshold',
      circle: '₹20 Lakhs+ Annual Turnover',
      elite: '₹5 Crores+ Annual Turnover',
      highlight: true,
    },
    {
      feature: 'Target Profile',
      circle: 'Emerging founders, agency owners, and service partners',
      elite: 'Industrialists, large enterprise CXOs, and seasoned founders',
      highlight: false,
    },
    {
      feature: 'Meeting Frequency',
      circle: 'Weekly Virtual Connects & Monthly Chapter Meets',
      elite: 'Bi-weekly Closed Masterminds & Quarterly Retreats',
      highlight: false,
    },
    {
      feature: 'Room Format',
      circle: 'Structured cross-industry peer networking',
      elite: 'Strategic roundtables, investment syndication & advisory',
      highlight: false,
    },
    {
      feature: 'Category Exclusivity',
      circle: 'Limited representation per business vertical',
      elite: 'Strict single-seat exclusivity per industry',
      highlight: true,
    },
    {
      feature: 'Global Business Delegations',
      circle: 'Standard international directory access',
      elite: 'Priority access to overseas trade summits & bilateral delegations',
      highlight: false,
    },
    {
      feature: 'Credential Verification',
      circle: 'Financial statement & business verification review',
      elite: 'Board-level screening & peer council endorsement',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[#c5a059] text-xs uppercase tracking-widest font-semibold border border-[#c5a059]/30 px-3 py-1 rounded-full">
          Membership Tiers
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif mt-4 text-white">
          Architected for Scaled Founders
        </h1>
        <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
          GBN Circle maintains strict revenue-verified entry barriers to ensure high-velocity cross-referrals and high-trust peer collaborations.
        </p>
      </div>

      {/* Comparison Matrix */}
      <div className="max-w-6xl mx-auto mt-14 overflow-x-auto">
        <div className="min-w-[700px] border border-slate-800 rounded-xl bg-slate-900/40 backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-950/80 border-b border-slate-800 p-6 items-center">
            <div className="col-span-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Evaluation Criteria
            </div>
            <div className="col-span-4 text-center">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-blue-950/80 text-blue-300 border border-blue-800/50">
                GBN Circle
              </span>
              <div className="text-sm font-bold text-white mt-1">₹20L+ Cohort</div>
            </div>
            <div className="col-span-4 text-center">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#c5a059] text-black font-semibold">
                GBN Elite
              </span>
              <div className="text-sm font-bold text-[#c5a059] mt-1">₹5Cr+ Council</div>
            </div>
          </div>

          <div className="divide-y divide-slate-800/60">
            {comparisonItems.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-5 items-center text-xs ${
                  row.highlight ? 'bg-[#c5a059]/5' : ''
                }`}
              >
                <div className="col-span-4 font-semibold text-slate-200">
                  {row.feature}
                </div>
                <div className="col-span-4 text-center text-slate-300 px-4">
                  {row.circle}
                </div>
                <div className="col-span-4 text-center text-[#c5a059] font-medium px-4">
                  {row.elite}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 p-6 bg-slate-950/80 border-t border-slate-800 items-center">
            <div className="col-span-4"></div>
            <div className="col-span-4 text-center px-4">
              <Link
                href="/events"
                className="inline-block w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition"
              >
                Attend as Circle Visitor
              </Link>
            </div>
            <div className="col-span-4 text-center px-4">
              <Link
                href="/contact"
                className="inline-block w-full py-2.5 px-4 bg-[#c5a059] hover:bg-[#d4af37] text-black rounded text-xs font-bold uppercase tracking-wider transition shadow-md shadow-[#c5a059]/20"
              >
                Request Elite Invitation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}