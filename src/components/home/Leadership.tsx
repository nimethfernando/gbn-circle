import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Leadership() {
    const leaders = [
        {
            name: "Amit Batra",
            role: "Founder",
            image: "linear-gradient(135deg, #0B162C 0%, #152A55 100%)", // placeholder bg
        },
        {
            name: "Asha Bhasin",
            role: "Co-Founder",
            image: "linear-gradient(135deg, #0B162C 0%, #152A55 100%)",
        },
        {
            name: "Ditya Batra",
            role: "Chief Inspiration Officer",
            image: "linear-gradient(135deg, #0B162C 0%, #152A55 100%)",
        },
    ];

    return (
        <section className="py-24 bg-gbn-navy text-white relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                        <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                            Leadership
                        </p>
                        <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Meet the Leadership <span className="text-gradient-gold block mt-2">Behind GBN Circle</span>
                    </h2>
                    <p className="text-lg text-gray-300 font-light leading-relaxed">
                        GBN Circle is built on a simple belief: meaningful connections can create meaningful possibilities.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {leaders.map((leader, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div
                                className="w-full aspect-[4/5] rounded-sm border border-white/5 premium-shadow mb-6 relative overflow-hidden"
                                style={{ background: leader.image }}
                            >
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 bg-gbn-navy/40 group-hover:bg-transparent transition-colors duration-700"></div>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-1 group-hover:text-gbn-gold transition-colors">{leader.name}</h3>
                            <p className="text-gray-400 font-light text-sm uppercase tracking-wider mb-4">{leader.role}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/leadership"
                        className="inline-flex bg-transparent border border-white/20 text-white text-[10px] tracking-widest font-bold px-8 py-4 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase"
                    >
                        Meet Our Leadership
                    </Link>
                </div>
            </div>
        </section>
    );
}
