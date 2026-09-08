import Link from "next/link";
import Image from "next/image";

export default function WhoIsGBNFor() {
    const matrix = [
        "Entrepreneurs", "Business Owners",
        "Founders", "Professionals",
        "Consultants", "Industry Leaders",
        "Investors", "Creators & Experts"
    ];

    return (
        <section className="py-24 bg-gbn-navy text-white relative">
            <Image src="/event-networking-BdmXOEy2 (1).jpg" alt="Background" fill className="object-cover opacity-10 pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-l from-gbn-navy via-gbn-navy/90 to-gbn-navy pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div className="animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                            <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                                The Community
                            </p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight max-w-lg">
                            Built for People Who Think Beyond Business Cards.
                        </h2>
                        <p className="text-lg text-gray-300 font-light mb-12 leading-relaxed max-w-md">
                            GBN Circle is for people who understand that business grows faster when relationships are built on trust.
                        </p>
                        <Link
                            href="/community"
                            className="inline-flex bg-transparent border border-white/20 text-white text-[10px] tracking-widest font-bold px-8 py-4 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase"
                        >
                            Explore the Community
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 bg-gbn-navy rounded-sm border border-white/5 premium-shadow overflow-hidden">
                        {matrix.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-8 border-white/5 flex items-center bg-gbn-navy-light/20 hover:bg-gbn-navy-light/60 transition-colors ${idx % 2 === 0 ? "border-r" : ""
                                    } ${idx < matrix.length - 2 ? "border-b" : ""}`}
                            >
                                <span className="text-sm font-medium text-gray-300 tracking-wide">{item}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
