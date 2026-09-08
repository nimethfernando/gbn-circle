import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gbn-navy pt-20 overflow-hidden">
            {/* Background elegant pattern or subtle gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gbn-navy-light/40 via-gbn-navy to-gbn-navy"></div>

            {/* Subtle global/network visual placeholder */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-gbn-gold/50 fill-none" strokeWidth="0.1">
                    {/* Abstract network nodes */}
                    <circle cx="20" cy="30" r="1" />
                    <circle cx="80" cy="40" r="1" />
                    <circle cx="50" cy="70" r="1.5" />
                    <circle cx="30" cy="80" r="1" />
                    <circle cx="70" cy="80" r="1" />
                    <path d="M20,30 L50,70 L80,40 M50,70 L30,80 M50,70 L70,80" />
                </svg>
            </div>

            <div className="container relative mx-auto px-6 md:px-12 z-10 text-center max-w-4xl mt-12">
                <p className="text-gbn-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6 animate-fade-in-up">
                    Connect • Collaborate • Grow
                </p>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                    Connect With Business Leaders. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gbn-gold to-yellow-200">Grow Together.</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    GBN Circle is a global business network for entrepreneurs, professionals and business leaders seeking meaningful connections, collaboration and new opportunities.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <Link
                        href="/join"
                        className="w-full sm:w-auto bg-gbn-gold hover:bg-gbn-gold-hover text-white text-base font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                        Join GBN Circle <ArrowRight size={18} />
                    </Link>
                    <Link
                        href="/community"
                        className="w-full sm:w-auto bg-transparent border border-white/30 hover:border-white text-white text-base font-medium px-8 py-4 rounded-full transition-all hover:bg-white/5"
                    >
                        Explore the Community
                    </Link>
                </div>
            </div>

            {/* Decorative gradient blur at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
}
