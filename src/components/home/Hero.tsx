import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gbn-navy pt-20 overflow-hidden">
            {/* Background elegant pattern or subtle gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gbn-navy-light/40 via-gbn-navy to-gbn-navy"></div>

            {/* Gold Particles Animation */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gbn-gold animate-pulse-gold blur-[1px]"
                        style={{
                            width: Math.random() * 6 + 2 + 'px',
                            height: Math.random() * 6 + 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${Math.random() * 3 + 3}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Subtle animated world map placeholder background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full stroke-gbn-gold fill-none" strokeWidth="0.5">
                    {/* Abstract representation of continents */}
                    <path className="animate-float" d="M150,150 Q200,100 250,160 T350,120 T400,200" strokeDasharray="4 4" />
                    <path className="animate-float" style={{ animationDelay: '1s' }} d="M450,250 Q500,200 550,220 T650,180 T700,280" strokeDasharray="4 4" />
                    <path className="animate-float" style={{ animationDelay: '2s' }} d="M750,150 Q800,100 850,140 T950,100" strokeDasharray="4 4" />
                    <path className="animate-float" style={{ animationDelay: '3s' }} d="M250,300 Q300,250 350,350 T450,320" strokeDasharray="4 4" />
                    {/* Connecting nodes */}
                    <circle cx="250" cy="160" r="3" className="fill-gbn-gold animate-pulse-gold" />
                    <circle cx="400" cy="200" r="2" className="fill-gbn-gold animate-pulse-gold" style={{ animationDelay: '1s' }} />
                    <circle cx="550" cy="220" r="4" className="fill-gbn-gold animate-pulse-gold" style={{ animationDelay: '2s' }} />
                    <circle cx="700" cy="280" r="3" className="fill-gbn-gold animate-pulse-gold" style={{ animationDelay: '0.5s' }} />
                    <circle cx="850" cy="140" r="2" className="fill-gbn-gold animate-pulse-gold" style={{ animationDelay: '1.5s' }} />
                    <circle cx="350" cy="350" r="3" className="fill-gbn-gold animate-pulse-gold" style={{ animationDelay: '2.5s' }} />
                </svg>
            </div>

            <div className="container relative mx-auto px-6 md:px-12 z-10 text-center max-w-4xl mt-12">
                <p className="text-gbn-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6 animate-fade-in-up">
                    Connect • Collaborate • Grow
                </p>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-8 leading-tight tracking-tight">
                    Where Business Connections Become <br className="hidden md:block" /><span className="text-gradient-gold">Global Opportunities.</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    GBN Circle brings ambitious entrepreneurs, professionals and business leaders together to connect, collaborate and grow through meaningful relationships.
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
