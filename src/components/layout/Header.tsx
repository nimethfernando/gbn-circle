"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070b19]/95 backdrop-blur-md shadow-lg py-3 border-b border-white/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 mr-4">
          <Image
            src="/favicon.png"
            alt="GBN Circle Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-white whitespace-nowrap">
              GBN Circle
            </span>
            <span className="text-[10px] tracking-widest uppercase mt-0.5 text-slate-400 whitespace-nowrap">
              Global Business Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] tracking-widest font-bold uppercase transition-colors pb-1 border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-[#c5a059] text-[#c5a059]"
                    : "border-transparent text-slate-300 hover:text-[#c5a059]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/events"
            className="hidden sm:inline-flex border border-slate-700 hover:border-[#c5a059]/50 text-slate-300 hover:text-white text-[10px] tracking-widest font-semibold px-4 py-2.5 rounded transition-all uppercase"
          >
            Admin
          </Link>

          <Link
            href="/events"
            className="hidden lg:inline-flex bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black text-[10px] tracking-widest font-bold px-5 py-2.5 rounded transition-all hover:scale-105 uppercase whitespace-nowrap shadow-md"
          >
            Join Session
          </Link>

          <button
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#070b19] shadow-2xl py-5 px-6 flex flex-col space-y-4 lg:hidden border-t border-white/10">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium text-sm tracking-widest uppercase border-b border-white/5 pb-2 transition-colors ${
                  isActive ? "text-[#c5a059]" : "text-slate-300 hover:text-[#c5a059]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/admin/events"
              className="text-center py-2.5 border border-slate-800 text-slate-300 text-xs font-semibold uppercase rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Portal
            </Link>
            <Link
              href="/events"
              className="inline-flex justify-center bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black text-[11px] tracking-widest font-bold px-6 py-3 rounded uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}