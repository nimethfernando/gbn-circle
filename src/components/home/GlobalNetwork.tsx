export default function GlobalNetwork() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-6">
                        Business Has No Borders. Neither Should Your Network.
                    </h2>
                    <p className="text-lg text-gbn-text-muted leading-relaxed">
                        GBN Circle connects people beyond their immediate business environment, creating opportunities to build relationships across cities, industries and borders.
                    </p>
                </div>

                <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-gbn-navy h-64 md:h-96 overflow-hidden flex items-center justify-center premium-shadow group">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gbn-navy-light/50 via-gbn-navy to-gbn-navy"></div>
                    {/* Conceptual World Map Animation / Visualization placeholder */}
                    <div className="absolute inset-0 opacity-40 flex items-center justify-center overflow-hidden">
                        <svg viewBox="0 0 100 50" className="w-[120%] h-[120%] text-white fill-current animate-float">
                            {/* Abstract map lines */}
                            <path d="M10,25 Q30,15 50,25 T90,25" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="0.5 1" className="opacity-30" />
                            <path d="M20,35 Q40,25 60,35 T100,35" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="0.5 1" className="opacity-20" />
                            <path d="M30,15 Q50,5 70,15 T110,15" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="0.5 1" className="opacity-20" />

                            {/* Active connection paths */}
                            <path d="M25,18 Q37.5,10 50,25" fill="none" stroke="url(#goldGradient1)" strokeWidth="0.2" className="animate-pulse" />
                            <path d="M50,25 Q65,40 80,30" fill="none" stroke="url(#goldGradient1)" strokeWidth="0.2" className="animate-pulse" style={{ animationDelay: "1s" }} />

                            <defs>
                                <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--color-gbn-gold)" />
                                    <stop offset="100%" stopColor="var(--color-gbn-gold-light)" />
                                </linearGradient>
                            </defs>

                            {/* Gold Nodes */}
                            <circle cx="25" cy="18" r="0.8" className="text-gbn-gold fill-current animate-pulse-gold" />
                            <circle cx="50" cy="25" r="1.2" className="text-gbn-gold fill-current animate-pulse-gold group-hover:scale-[1.5] transition-transform duration-700" />
                            <circle cx="80" cy="30" r="0.8" className="text-gbn-gold fill-current animate-pulse-gold" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center bg-gbn-navy/50 py-8 px-12 rounded-2xl glass-effect border border-white/10 premium-shadow">
                        <span className="text-white font-medium text-lg lg:text-xl">People</span>
                        <span className="hidden md:inline text-gbn-gold">→</span>
                        <span className="text-white font-medium text-lg lg:text-xl">Connections</span>
                        <span className="hidden md:inline text-gbn-gold">→</span>
                        <span className="text-white font-medium text-lg lg:text-xl">Collaboration</span>
                        <span className="hidden md:inline text-gbn-gold">→</span>
                        <span className="text-white font-medium text-lg lg:text-xl">Growth</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
