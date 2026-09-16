import Link from "next/link";

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
        <section className="py-24 bg-white dark:bg-gbn-navy text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/5 relative transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-8 bg-[#c5a059] rounded-full"></div>
                            <p className="text-[#a88235] dark:text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                                Member Base
                            </p>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 leading-tight">
                            Meet People. <br /><span className="text-gradient-gold">Discover Possibilities.</span>
                        </h2>
                        <p className="text-lg text-slate-800 dark:text-gray-300 font-normal mb-6 leading-relaxed">
                            Every member brings something different—experience, expertise, ideas, opportunities and relationships.
                        </p>
                        <p className="text-lg text-slate-800 dark:text-gray-300 font-normal mb-10 leading-relaxed">
                            GBN Circle brings these strengths together to create an environment where people can connect, collaborate and grow.
                        </p>

                        <Link
                            href="/members"
                            className="inline-flex bg-slate-100 hover:bg-slate-200 dark:bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:border-[#c5a059] dark:hover:border-gbn-gold hover:text-[#c5a059] dark:hover:text-gbn-gold text-[10px] tracking-widest font-bold px-8 py-4 rounded-sm transition-all uppercase shadow-sm dark:shadow-none"
                        >
                            Explore Members
                        </Link>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {categories.map((cat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-slate-50 dark:bg-gbn-navy-light/40 border border-slate-200 dark:border-white/5 p-4 rounded-sm text-center text-slate-800 dark:text-gray-300 hover:text-[#c5a059] dark:hover:text-gbn-gold text-xs tracking-widest uppercase font-bold hover:border-[#c5a059]/50 hover:bg-white dark:hover:bg-gbn-navy-light/60 transition-all cursor-default shadow-sm dark:shadow-none"
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
