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
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-6">
                        Three Principles. One Business Community.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {principles.map((p, idx) => (
                        <div
                            key={idx}
                            className={`p-10 bg-gray-50 rounded-2xl border-b-4 ${p.color} hover:-translate-y-2 transition-transform duration-300`}
                        >
                            <h3 className="text-2xl font-bold text-gbn-navy mb-4">{p.title}</h3>
                            <p className="text-gbn-text-muted leading-relaxed text-lg">{p.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-2xl md:text-3xl font-light text-gbn-navy italic">
                        "Your network can become your next opportunity."
                    </p>
                </div>
            </div>
        </section>
    );
}
