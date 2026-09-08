import Image from "next/image";

export default function ThreePrinciples() {
    const principles = [
        {
            title: "CONNECT",
            desc: "Build meaningful relationships with entrepreneurs, professionals and business leaders.",
            color: "border-b-blue-500",
        },
        {
            title: "COLLABORATE",
            desc: "Exchange ideas, expertise, referrals and opportunities.",
            color: "border-b-gbn-gold",
        },
        {
            title: "GROW",
            desc: "Expand your network, knowledge, visibility and business possibilities.",
            color: "border-b-green-500",
        },
    ];

    return (
        <section className="py-24 bg-gbn-navy text-white relative">
            <Image src="/vision-wide-Dafp-BMf.jpg" alt="Background" fill className="object-cover opacity-10 pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-b from-gbn-navy/80 via-gbn-navy/95 to-gbn-navy/80 pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Three Principles. One Business Community.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {principles.map((p, idx) => (
                        <div
                            key={idx}
                            className={`p-10 bg-gbn-navy-light/40 border border-white/5 rounded-sm hover:-translate-y-2 transition-transform duration-500 premium-shadow group`}
                        >
                            <h3 className="text-xl tracking-[0.2em] uppercase font-bold text-gbn-gold mb-4 group-hover:scale-105 transition-transform duration-500 origin-left">{p.title}</h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm">{p.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-2xl md:text-3xl font-serif font-light text-gbn-gold italic">
                        "Your network can become your next opportunity."
                    </p>
                </div>
            </div>
        </section>
    );
}
