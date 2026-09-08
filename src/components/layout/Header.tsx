"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Community", href: "/community" },
        { name: "Leadership", href: "/leadership" },
        { name: "Events", href: "/events" },
        { name: "Members", href: "/members" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gbn-navy/95 backdrop-blur-md shadow-lg py-3 border-b border-white/5" : "bg-transparent py-5"}`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/favicon.png"
                        alt="GBN Circle Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold tracking-tight text-white">GBN Circle</span>
                        <span className="text-[10px] tracking-widest uppercase mt-0.5 text-gbn-text-muted">
                            Global Business Network
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[10px] tracking-widest font-bold uppercase transition-colors hover:text-gbn-gold pb-1 border-b-2 ${link.name === "Home" ? "border-gbn-gold text-gbn-gold" : "border-transparent text-gray-300"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/join"
                        className="hidden md:inline-flex bg-gradient-to-r from-gbn-gold to-gbn-gold-hover text-gbn-navy-dark text-[10px] tracking-widest font-bold px-6 py-3 rounded-sm transition-all hover:scale-105 uppercase"
                    >
                        Join GBN Circle
                    </Link>
                    <button
                        className={`md:hidden p-2 ${isScrolled ? "text-gbn-navy" : "text-white"}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gbn-navy font-medium text-lg border-b border-gray-100 pb-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/join"
                        className="inline-flex justify-center bg-gbn-gold text-white font-semibold px-6 py-3 rounded-full mt-4"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Join GBN Circle
                    </Link>
                </div>
            )}
        </header>
    );
}
