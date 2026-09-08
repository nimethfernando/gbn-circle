import { Video, Coffee, Presentation, Target, Puzzle, Lightbulb } from "lucide-react";

export default function InsideGBN() {
    const experiences = [
        {
            title: "ONLINE CONNECT",
            desc: "Connect virtually with fellow members.",
            icon: <Video size={32} strokeWidth={1.5} />,
        },
        {
            title: "PHYSICAL MEET",
            desc: "Meet and interact with the community in person.",
            icon: <Coffee size={32} strokeWidth={1.5} />,
        },
        {
            title: "BUSINESS PRESENTATIONS",
            desc: "Present your business, expertise and offerings.",
            icon: <Presentation size={32} strokeWidth={1.5} />,
        },
        {
            title: "NETWORKING",
            desc: "Discover people, ideas and business possibilities.",
            icon: <Target size={32} strokeWidth={1.5} />,
        },
        {
            title: "COLLABORATION",
            desc: "Explore referrals, partnerships and opportunities.",
            icon: <Puzzle size={32} strokeWidth={1.5} />,
        },
        {
            title: "KNOWLEDGE EXCHANGE",
            desc: "Learn from the experience and expertise of the community.",
            icon: <Lightbulb size={32} strokeWidth={1.5} />,
        },
    ];

    return (
        <section className="py-24 bg-gbn-navy text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gbn-gold opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gbn-navy-light opacity-50 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        It's More Than a Meeting. <span className="text-gradient-gold block mt-2">It's a Business Experience.</span>
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed text-balance font-light">
                        GBN Circle creates regular opportunities for members to meet, introduce themselves, present their businesses, exchange ideas and discover opportunities for collaboration.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((exp, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 backdrop-blur-md group hover:-translate-y-1 premium-shadow"
                        >
                            <div className="text-gbn-gold mb-6 group-hover:scale-110 transition-transform duration-500">{exp.icon}</div>
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-3 text-white">{exp.title}</h3>
                            <p className="text-gray-400 font-light leading-relaxed">{exp.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
