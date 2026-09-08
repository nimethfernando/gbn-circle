import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WhoIsGBNFor() {
    const cards = [
        {
            title: "Entrepreneurs",
            desc: "Build and expand your business network.",
        },
        {
            title: "Business Owners",
            desc: "Create meaningful relationships and discover opportunities.",
        },
        {
            title: "Professionals",
            desc: "Expand your professional and business connections.",
        },
        {
            title: "Industry Experts",
            desc: "Share knowledge, expertise and experience.",
        },
        {
            title: "Business Leaders",
            desc: "Build strategic relationships and explore collaboration.",
        },
    ];

    return (
        <section className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    <div className="sticky top-24">
                        <h2 className="text-3xl md:text-5xl font-bold text-gbn-navy mb-6 leading-tight">
                            Built for People Who Believe in the Power of Connection.
                        </h2>
                        <p className="text-lg text-gbn-text-muted mb-8 leading-relaxed">
                            GBN Circle is designed for entrepreneurs, professionals and business leaders who want to build stronger networks and explore meaningful business opportunities.
                        </p>

                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm mb-8">
                            <h4 className="text-sm uppercase tracking-wider text-gbn-gold font-bold mb-4">Eligibility</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-gbn-navy mt-2 shrink-0"></div>
                                    <p className="text-gbn-navy font-medium">
                                        <span className="font-bold">GBN Circle</span> is designed for businesses with ₹20 Lakh+ annual turnover.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-gbn-gold mt-2 shrink-0"></div>
                                    <p className="text-gbn-navy font-medium">
                                        <span className="font-bold">GBN Elite</span> is designed for established businesses with ₹5 Crore+ annual turnover.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/community"
                            className="inline-flex items-center justify-center bg-gbn-navy hover:bg-gbn-navy-light text-white font-semibold px-8 py-4 rounded-full transition-all"
                        >
                            Explore Membership <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group border-l-4 border-l-transparent hover:border-l-gbn-gold"
                            >
                                <h3 className="text-xl font-bold text-gbn-navy mb-2 group-hover:text-gbn-gold transition-colors">{card.title}</h3>
                                <p className="text-gbn-text-muted">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
