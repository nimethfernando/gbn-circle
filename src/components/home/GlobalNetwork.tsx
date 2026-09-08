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

                <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-gbn-navy h-64 md:h-96 overflow-hidden flex items-center justify-center border border-gray-100 shadow-lg">
                    {/* Conceptual World Map Animation / Visualization placeholder */}
                    <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                        <svg viewBox="0 0 100 50" className="w-full h-full text-white fill-current">
                            {/* Abstract tiny dots representing map */}
                            <circle cx="20" cy="20" r="0.5" />
                            <circle cx="25" cy="18" r="0.8" className="text-gbn-gold" />
                            <circle cx="30" cy="22" r="0.5" />
                            <circle cx="45" cy="15" r="0.5" />
                            <circle cx="50" cy="25" r="0.8" className="text-gbn-gold" />
                            <circle cx="55" cy="28" r="0.5" />
                            <circle cx="70" cy="20" r="0.5" />
                            <circle cx="80" cy="30" r="0.8" className="text-gbn-gold" />

                            <path d="M25,18 Q37.5,10 50,25" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="0.5 1" className="animate-pulse" />
                            <path d="M50,25 Q65,40 80,30" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="0.5 1" className="animate-pulse" style={{ animationDelay: "1s" }} />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center bg-gbn-navy/40 py-6 px-12 rounded-2xl backdrop-blur-md border border-white/10">
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
