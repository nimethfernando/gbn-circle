import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GBN Circle - Global Business Network",
  description: "GBN Circle is a global business network for entrepreneurs, professionals and business leaders seeking meaningful connections, collaboration and new opportunities.",
  keywords: ["GBN Circle", "Global Business Network", "Business Leaders", "Networking", "Entrepreneurs", "Professionals"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col text-gbn-navy bg-white">
        {children}
      </body>
    </html>
  );
}
