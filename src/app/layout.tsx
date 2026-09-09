import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GBN Circle — Global Business Network",
  description: "Connect • Collaborate • Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[#070b19] text-white flex flex-col min-h-screen selection:bg-[#c5a059] selection:text-black font-sans">
        {/* Persistent Sticky Header */}
        <Header />

        {/* Dynamic Page Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Persistent Global Footer */}
        <Footer />
      </body>
    </html>
  );
}