"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
    showMembers?: boolean;
    showEvents?: boolean;
    showBlogs?: boolean;
    showCommunity?: boolean;
    showLeadership?: boolean;
    showInstagram?: boolean;
    instagramUrl?: string;
    showLinkedIn?: boolean;
    linkedInUrl?: string;
}

export default function Footer({
    showMembers = false,
    showEvents = true,
    showBlogs = true,
    showCommunity = true,
    showLeadership = true,
    showInstagram = true,
    instagramUrl = "https://www.instagram.com/gbncircle?stkn=dTNpdGd1d3c2YjJ4&utm_source=qr",
    showLinkedIn = false,
    linkedInUrl = "https://www.linkedin.com/company/gbn-circle/",
}: FooterProps) {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: t.nav.home, href: "/" },
        { name: t.nav.about, href: "/about" },
        ...(showCommunity ? [{ name: t.nav.community, href: "/community" }] : []),
        ...(showLeadership ? [{ name: t.nav.leadership, href: "/leadership" }] : []),
        ...(showEvents ? [{ name: t.nav.events, href: "/events" }] : []),
        ...(showBlogs ? [{ name: t.nav.blogs, href: "/blogs" }] : []),
        ...(showMembers ? [{ name: t.nav.members, href: "/members" }] : []),
        { name: t.nav.contact, href: "/contact" },
    ];

    return (
        <footer className="bg-slate-100 dark:bg-[#070b19] text-slate-900 dark:text-white pt-20 pb-8 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
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
                                <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">GBN Circle</span>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-[#a88235] dark:text-gbn-gold font-semibold">
                                    Global Business Network
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate-600 dark:text-gray-400 max-w-xs font-light">
                            {t.footer.tagline}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-1">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
                            {t.footer.navigation}
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-slate-600 dark:text-gray-400 hover:text-[#c5a059] dark:hover:text-gbn-gold transition-colors font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="md:col-span-1">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">
                            {t.footer.contact}
                        </h4>
                        <ul className="space-y-3 mb-6 text-slate-600 dark:text-gray-400 font-medium">
                            <li><a href="mailto:gbncircle@gmail.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">gbncircle@gmail.com</a></li>
                            <li><a href="tel:+919783577773" className="hover:text-slate-900 dark:hover:text-white transition-colors">+91 9783577773</a></li>
                            <li><a href="https://www.gbncircle.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">www.gbncircle.com</a></li>
                        </ul>

                        <h4 className="text-[11px] font-bold text-[#a88235] dark:text-gbn-gold mb-3 uppercase tracking-wider">
                            {t.footer.offices}
                        </h4>
                        <ul className="space-y-4 mb-8 text-slate-600 dark:text-gray-400 font-light text-sm">
                            <li>
                                <strong className="block text-slate-900 dark:text-white font-medium text-xs mb-1 uppercase tracking-wider">
                                    {t.footer.georgiaOffice}
                                </strong>
                                {t.footer.georgiaAddress}
                            </li>
                            <li>
                                <strong className="block text-slate-900 dark:text-white font-medium text-xs mb-1 uppercase tracking-wider">
                                    {t.footer.indiaOffice}
                                </strong>
                                {t.footer.indiaAddress}
                            </li>
                        </ul>

                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Social</h4>
                        <div className="flex space-x-4 items-center flex-wrap gap-y-2">
                            {showInstagram && (
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <span className="font-bold border border-current rounded-full w-5 h-5 flex items-center justify-center text-[10px]">IG</span> Instagram
                                </a>
                            )}
                            {showInstagram && showLinkedIn && (
                                <span className="text-slate-400 dark:text-gray-600">|</span>
                            )}
                            {showLinkedIn && (
                                <a
                                    href={linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <span className="font-bold border border-current rounded-full w-5 h-5 flex items-center justify-center text-[10px]">LI</span> LinkedIn
                                </a>
                            )}
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-gray-500">
                    <p>© {currentYear} GBN Circle. {t.footer.rights}</p>
                    <p className="mt-2 md:mt-0">A Ditya Group Initiative</p>
                </div>
            </div>
        </footer>
    );
}
