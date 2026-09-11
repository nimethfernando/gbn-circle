import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function WhoIsGBNFor() {
  const cards = [
    {
      title: "Entrepreneurs",
      desc: "Build and expand your business network.",
    },
    {
      title: "Business Owners",
      desc: "Create meaningful relationships and discover opportunities.",
    },
    {
      title: "Professionals",
      desc: "Expand your professional and business connections.",
    },
    {
      title: "Industry Experts",
      desc: "Share knowledge, expertise and experience.",
    },
    {
      title: "Business Leaders",
      desc: "Build strategic relationships and explore collaboration.",
    },
  ];

  return (
    <section className="py-24 bg-gbn-navy text-white relative">
      <Image
        src="/event-networking-BdmXOEy2 (1).jpg"
        alt="Background"
        fill
        className="object-cover opacity-10 pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gbn-navy via-gbn-navy/95 to-gbn-navy pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
            <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
              Who is GBN Circle For?
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Built for People Who Believe in the Power of Connection.
          </h2>

          <p className="text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
            GBN Circle is designed for entrepreneurs, professionals and business leaders who want to build stronger networks and explore meaningful business opportunities.
          </p>
        </div>

        {/* 5 Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 bg-gbn-navy-light/40 border border-white/5 rounded-sm hover:border-[#c5a059]/40 hover:bg-gbn-navy-light/70 transition-all duration-300 flex flex-col justify-between group premium-shadow"
            >
              <div>
                <span className="text-[10px] font-bold text-gbn-gold tracking-widest uppercase mb-2 block">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-serif text-white group-hover:text-gbn-gold transition-colors mb-2">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-400 font-light text-xs leading-relaxed mt-2">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Eligibility Highlight */}
        <div className="bg-gradient-to-r from-gbn-navy-light/80 via-[#101b3b]/90 to-gbn-navy-light/80 border border-[#c5a059]/20 rounded-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-10 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
              <ShieldCheck size={20} />
            </div>
            <div className="space-y-1 text-sm text-gray-300">
              <p className="font-medium text-white">
                <span className="text-[#c5a059] font-bold">GBN Circle</span> is designed for businesses with <span className="text-white font-semibold">₹20 Lakh+</span> annual turnover.
              </p>
              <p className="font-medium text-white">
                <span className="text-[#c5a059] font-bold">GBN Elite</span> is designed for established businesses with <span className="text-white font-semibold">₹5 Crore+</span> annual turnover.
              </p>
            </div>
          </div>

          <Link
            href="/community"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black text-xs tracking-widest font-bold px-7 py-3.5 rounded-sm transition-all hover:scale-105 uppercase whitespace-nowrap shadow-md"
          >
            <span>Explore Membership</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
