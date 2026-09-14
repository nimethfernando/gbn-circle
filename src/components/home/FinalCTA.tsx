import Link from 'next/link';
import { Check, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  const comparisonRows = [
    {
      feature: 'Business Eligibility',
      circle: '₹20L+ annual turnover',
      elite: '₹5Cr+ annual turnover',
      isHighlight: true,
    },
    {
      feature: 'Membership Frequency',
      circle: 'Quarterly / Annual',
      elite: 'Monthly / Annual',
      isHighlight: false,
    },
    {
      feature: 'Online Meetings',
      circle: true,
      elite: false,
      isHighlight: false,
    },
    {
      feature: 'Physical Networking',
      circle: true,
      elite: true,
      isHighlight: false,
    },
    {
      feature: 'Member Presentations',
      circle: true,
      elite: true,
      isHighlight: false,
    },
    {
      feature: 'Collaboration Opportunities',
      circle: true,
      elite: true,
      isHighlight: false,
    },
    {
      feature: 'Premium Morning Experience',
      circle: false,
      elite: true,
      isHighlight: false,
    },
    {
      feature: 'Breakfast Experience',
      circle: false,
      elite: true,
      isHighlight: false,
    },
    {
      feature: 'Strategic Networking',
      circle: true,
      elite: true,
      isHighlight: false,
    },
    {
      feature: 'Pricing & Tiers',
      circle: 'Full details on request',
      elite: 'Full details on request',
      isHighlight: false,
      isPricing: true,
    },
  ];

  return (
    <section className="py-24 bg-[#070b19] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Ambience & Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b19] via-[#091024] to-[#070b19] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header (PRD Sec. 17, Page 11–12 & 14) */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[10px] uppercase tracking-widest font-bold mb-5">
            <Sparkles size={12} /> Membership Tiers &amp; Evaluation Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white mb-5 leading-tight font-bold">
            Ready to Expand Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] via-[#e5c158] to-[#c5a059]">Business Network?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Join GBN Circle today and become part of a global community built on meaningful relationships, trust, and shared growth.
          </p>
        </div>

        {/* 17. Complete Comparison Matrix (PRD Pages 11–12) */}
        <div className="border border-slate-800 rounded-2xl bg-[#0a1020]/90 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-950/95 border-b border-slate-800 py-6 px-4 sm:px-8 items-center">
            <div className="col-span-5 sm:col-span-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
              Evaluation Criteria
            </div>

            {/* GBN Circle Column Header */}
            <div className="col-span-3 sm:col-span-4 text-center px-2">
              <span className="inline-block text-xs sm:text-sm uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-slate-200 shadow-sm">
                GBN Circle
              </span>
              <p className="text-base sm:text-lg font-bold text-white mt-2 tracking-wide font-sans">
                ₹20L+ Cohort
              </p>
            </div>

            {/* GBN Elite Column Header */}
            <div className="col-span-4 text-center px-2">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black shadow-md">
                <ShieldCheck size={14} /> GBN Elite
              </span>
              <p className="text-base sm:text-lg font-bold text-[#f3d37a] mt-2 tracking-wide font-sans">
                ₹5Cr+ Council
              </p>
            </div>
          </div>

          {/* Table Rows (10 Features from PRD Sec. 17) */}
          <div className="divide-y divide-slate-800/60">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 py-4.5 sm:py-5.5 px-4 sm:px-8 items-center transition-colors hover:bg-slate-800/25 ${
                  row.isHighlight
                    ? 'bg-[#c5a059]/10'
                    : idx % 2 === 0
                    ? 'bg-transparent'
                    : 'bg-slate-950/30'
                }`}
              >
                {/* Feature Label */}
                <div className="col-span-5 sm:col-span-4 font-semibold text-slate-100 text-xs sm:text-sm md:text-base pr-2">
                  {row.feature}
                </div>

                {/* GBN Circle Value */}
                <div className="col-span-3 sm:col-span-4 text-center px-2">
                  {typeof row.circle === 'boolean' ? (
                    row.circle ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-950/70 border border-emerald-600 text-emerald-400 shadow-sm">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center text-slate-500 font-bold">
                        <Minus size={18} strokeWidth={2.5} />
                      </span>
                    )
                  ) : (
                    <span
                      className={`text-xs sm:text-sm md:text-base ${
                        row.isHighlight ? 'text-white font-bold' : 'text-slate-200 font-medium'
                      }`}
                    >
                      {row.circle}
                    </span>
                  )}
                </div>

                {/* GBN Elite Value */}
                <div className="col-span-4 text-center px-2">
                  {typeof row.elite === 'boolean' ? (
                    row.elite ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c5a059]/25 border border-[#c5a059]/70 text-[#f3d37a] shadow-sm">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center text-slate-500 font-bold">
                        <Minus size={18} strokeWidth={2.5} />
                      </span>
                    )
                  ) : (
                    <span
                      className={`text-xs sm:text-sm md:text-base ${
                        row.isHighlight ? 'text-[#f3d37a] font-bold' : 'text-[#e5c158] font-medium'
                      }`}
                    >
                      {row.elite}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer: Dual Action Buttons (PRD Page 12) */}
          <div className="grid grid-cols-12 py-6 px-4 sm:px-8 bg-slate-950/95 border-t border-slate-800 items-center gap-3 sm:gap-4">
            <div className="col-span-12 sm:col-span-4 mb-3 sm:mb-0 text-center sm:text-left">
              <span className="text-xs sm:text-sm uppercase tracking-wider text-slate-300 font-bold block">
                Next Steps
              </span>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                Select your qualifying tier to apply.
              </p>
            </div>

            {/* CTA 1: Join GBN Circle */}
            <div className="col-span-6 sm:col-span-4 px-1 sm:px-2">
              <Link
                href="/community"
                className="w-full py-3.5 sm:py-4 px-3 sm:px-5 rounded-md border border-white/20 hover:border-[#c5a059] bg-slate-900 hover:bg-slate-800 text-white hover:text-[#c5a059] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 text-center whitespace-nowrap"
              >
                <span>Join GBN Circle</span>
                <ArrowRight size={15} className="hidden sm:inline" />
              </Link>
            </div>

            {/* CTA 2: Apply for GBN Elite */}
            <div className="col-span-6 sm:col-span-4 px-1 sm:px-2">
              <Link
                href="/contact"
                className="w-full py-3.5 sm:py-4 px-3 sm:px-5 rounded-md bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e5c158] text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all hover:scale-[1.02] shadow-lg shadow-[#c5a059]/20 flex items-center justify-center gap-2 text-center whitespace-nowrap"
              >
                <span>Apply for GBN Elite</span>
                <ArrowRight size={15} className="hidden sm:inline" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Note (PRD Page 6 & 15 Rule) */}
        <p className="text-center text-xs sm:text-sm text-slate-400 font-light mt-6 italic">
          * Full membership plans, regional chapter dues, and onboarding schedules are provided upon executive application review.
        </p>
      </div>
    </section>
  );
}
