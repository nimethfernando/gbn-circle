import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Community", href: "/community" },
        { name: "Leadership", href: "/leadership" },
        { name: "Events", href: "/events" },
        { name: "Blogs", href: "/blogs" },
        { name: "Members", href: "/members" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <footer className="bg-gbn-navy text-white pt-20 pb-8 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6">
                            <Image
                                src="/favicon.png"
                                alt="GBN Circle Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold tracking-tight text-white mb-1">GBN Circle</span>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-gbn-gold font-semibold">
                                    Global Business Network
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-400 max-w-xs font-light">
                            Connect • Collaborate • Grow
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-1">
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-sm">Navigation</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-400 hover:text-gbn-gold transition-colors font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="md:col-span-1">
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-3 mb-6 text-gray-400 font-medium">
                            <li><a href="mailto:gbncircle@gmail.com" className="hover:text-white transition-colors">gbncircle@gmail.com</a></li>
                            <li><a href="tel:+919783577773" className="hover:text-white transition-colors">+91 9783577773</a></li>
                            <li><a href="https://www.gbncircle.com" className="hover:text-white transition-colors">www.gbncircle.com</a></li>
                        </ul>

                        <h4 className="text-[11px] font-bold text-gbn-gold mb-3 uppercase tracking-wider">Offices</h4>
                        <ul className="space-y-4 mb-8 text-gray-400 font-light text-sm">
                            <li>
                                <strong className="block text-white font-medium text-xs mb-1 uppercase tracking-wider">Georgia</strong>
                                17 Ioane Shavteli St, Tbilisi, Georgia
                            </li>
                            <li>
                                <strong className="block text-white font-medium text-xs mb-1 uppercase tracking-wider">India</strong>
                                3rd floor, 261, Sewa Sadan Marg,<br />Frontier Colony, Adarsh Nagar,<br />Jaipur, Rajasthan 302004
                            </li>
                        </ul>

                        <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm">Social</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                                <span className="font-bold border border-current rounded-full w-5 h-5 flex items-center justify-center text-[10px]">IG</span> Instagram
                            </a>
                            <span className="text-gray-600">|</span>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                                <span className="font-bold border border-current rounded-full w-5 h-5 flex items-center justify-center text-[10px]">LI</span> LinkedIn
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {currentYear} GBN Circle. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">A Ditya Group Initiative</p>
                </div>
            </div>
        </footer>
    );
}
