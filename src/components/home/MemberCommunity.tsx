import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MemberCommunity() {
    const categories = [
        "Entrepreneurs",
        "Business Owners",
        "Professionals",
        "Industry Experts",
        "Consultants",
        "Founders",
        "Business Leaders"
    ];

    return (
        <section className="py-24 bg-gbn-navy text-white border-t border-white/5 relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                            <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                                Member Base
                            </p>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                            Meet People. <br /><span className="text-gradient-gold">Discover Possibilities.</span>
                        </h2>
                        <p className="text-lg text-gray-300 font-light mb-6 leading-relaxed">
                            Every member brings something different—experience, expertise, ideas, opportunities and relationships.
                        </p>
                        <p className="text-lg text-gray-300 font-light mb-10 leading-relaxed">
                            GBN Circle brings these strengths together to create an environment where people can connect, collaborate and grow.
                        </p>

                        <Link
                            href="/members"
                            className="inline-flex bg-transparent border border-white/20 text-white text-[10px] tracking-widest font-bold px-8 py-4 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase"
                        >
                            Explore Members
                        </Link>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {categories.map((cat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gbn-navy-light/40 border border-white/5 p-4 rounded-sm text-center text-gray-300 hover:text-gbn-gold text-xs tracking-widest uppercase font-bold hover:border-gbn-gold/50 hover:bg-gbn-navy-light/60 transition-all cursor-default premium-shadow"
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
