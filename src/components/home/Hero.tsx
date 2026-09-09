import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-start pt-20 overflow-hidden text-left bg-gbn-navy">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-[url('/vision-wide-Dafp-BMf.jpg')] bg-cover bg-center bg-no-repeat opacity-40 animate-slow-zoom"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gbn-navy-dark via-gbn-navy/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gbn-navy-dark via-transparent to-transparent"></div>

            <div className="container relative mx-auto px-6 md:px-12 z-10 max-w-7xl mt-12">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                        <div className="h-px w-0 bg-gold-gradient animate-draw-line" style={{ animationDelay: '0.2s', background: 'linear-gradient(to right, transparent, var(--color-gbn-gold))' }}></div>
                        <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                            Connect • Collaborate • Grow
                        </p>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight animate-fade-in-up delay-100">
                        Where Business Connections <br className="hidden md:block" />Become <span className="text-gradient-gold">Global Opportunities.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 font-light mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
                        GBN Circle brings ambitious entrepreneurs, professionals and business leaders together to connect, collaborate and grow through meaningful relationships.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-fade-in-up delay-300">
                        <Link
                            href="/join"
                            className="w-full sm:w-auto bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-sm transition-all hover:scale-105 flex items-center justify-center uppercase hover-shine"
                        >
                            Join GBN Circle
                        </Link>
                        <Link
                            href="/community"
                            className="w-full sm:w-auto bg-transparent border border-white/20 text-white text-xs tracking-[0.15em] font-bold px-8 py-4 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase"
                        >
                            Explore the Community
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
