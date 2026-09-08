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
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-6">
                        Meet the Leadership Behind GBN Circle
                    </h2>
                    <p className="text-lg text-gbn-text-muted leading-relaxed">
                        GBN Circle is built on a simple belief: meaningful connections can create meaningful possibilities.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {leaders.map((leader, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div
                                className="w-full aspect-[4/5] rounded-3xl mb-6 relative overflow-hidden"
                                style={{ background: leader.image }}
                            >
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 bg-gbn-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-gbn-navy mb-1 group-hover:text-gbn-gold transition-colors">{leader.name}</h3>
                            <p className="text-gbn-text-muted font-medium mb-4">{leader.role}</p>
                            {/* Note: The PRD says "LinkedIn icon only if his official LinkedIn profile is available" -> we can just put it conditionally or leave it out for now on homepage, usually we put it on Leadership page as per instructions for Leadership page, but we can add small icons here. */}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/leadership"
                        className="inline-flex items-center text-gbn-navy font-semibold hover:text-gbn-gold transition-colors text-lg"
                    >
                        Meet Our Leadership <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
