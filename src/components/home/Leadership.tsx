import Link from "next/link";
import Image from "next/image";

export interface LeaderItem {
    name: string;
    role: string;
    image: string;
    statement?: string;
}

export interface LeadershipSectionData {
    badge?: string;
    heading?: string;
    description?: string;
    btnText?: string;
    btnLink?: string;
}

interface LeadershipProps {
    data?: LeadershipSectionData;
    leaders?: LeaderItem[];
}

const defaultLeaders: LeaderItem[] = [
    {
        name: "Amit Batra",
        role: "Founder",
        image: "/event-leadership-C1eE1_9Q.jpg",
    },
    {
        name: "Asha Bhasin",
        role: "Co-Founder",
        image: "/event-leadership-C1eE1_9Q (1).jpg",
    },
    {
        name: "Ditya Batra",
        role: "Chief Inspiration Officer",
        image: "/vision-wide-Dafp-BMf.jpg",
    },
];

export default function Leadership({ data, leaders: propLeaders }: LeadershipProps) {
    const leadersList = (propLeaders && propLeaders.length > 0 ? propLeaders : defaultLeaders).map((leader, idx) => ({
        name: leader.name || defaultLeaders[idx]?.name || "Leader",
        role: leader.role || defaultLeaders[idx]?.role || "",
        image: leader.image || defaultLeaders[idx]?.image || "/vision-wide-Dafp-BMf.jpg",
    }));

    const badge = data?.badge || "Leadership";
    const rawHeading = data?.heading || "Meet the Leadership Behind GBN Circle";
    const description =
        data?.description ||
        "GBN Circle is built on a simple belief: meaningful connections can create meaningful possibilities.";
    const btnText = data?.btnText || "Meet Our Leadership";
    const btnLink = data?.btnLink || "/leadership";

    // Split heading nicely if it contains "Behind GBN Circle" to maintain luxury gold gradient
    let headingPart1 = rawHeading;
    let headingPart2 = "";
    if (rawHeading.includes("Behind GBN Circle")) {
        const parts = rawHeading.split("Behind GBN Circle");
        headingPart1 = parts[0].trim();
        headingPart2 = "Behind GBN Circle";
    }

    return (
        <section className="py-24 bg-gbn-navy text-white relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                        <p className="text-gbn-gold uppercase tracking-[0.2em] text-xs font-semibold">
                            {badge}
                        </p>
                        <div className="h-px w-8 bg-gbn-gold rounded-full"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        {headingPart1}
                        {headingPart2 ? (
                            <span className="text-gradient-gold block mt-2">{headingPart2}</span>
                        ) : null}
                    </h2>
                    <p className="text-lg text-gray-300 font-light leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {leadersList.map((leader, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="w-full aspect-[4/5] rounded-sm border border-white/5 premium-shadow mb-6 relative overflow-hidden bg-[#070b19]">
                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    fill
                                    unoptimized={leader.image?.startsWith('data:') || leader.image?.startsWith('http')}
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gbn-navy/30 group-hover:bg-transparent transition-colors duration-700"></div>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-1 group-hover:text-gbn-gold transition-colors">
                                {leader.name}
                            </h3>
                            <p className="text-gray-400 font-light text-sm uppercase tracking-wider mb-4">
                                {leader.role}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href={btnLink}
                        className="inline-flex bg-transparent border border-white/20 text-white text-[10px] tracking-widest font-bold px-8 py-4 rounded-sm transition-all hover:border-gbn-gold hover:text-gbn-gold uppercase"
                    >
                        {btnText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
