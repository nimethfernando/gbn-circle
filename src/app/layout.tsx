import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppProviders from "@/components/providers/AppProviders";
import { getSiteVisibility } from "@/lib/getPageContent";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const visibility = await getSiteVisibility();

  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        {/* Instant pre-hydration script to prevent any theme flickering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('gbn-theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  }
                  var lang = localStorage.getItem('gbn-lang');
                  if (lang) {
                    document.documentElement.lang = lang;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#f8f9fa] text-[#0b162c] dark:bg-[#070b19] dark:text-white flex flex-col min-h-screen selection:bg-[#c5a059] selection:text-black font-sans transition-colors duration-300"
      >
        <AppProviders>
          {/* Persistent Sticky Header */}
          <Header
            showMembers={visibility.showMemberNav}
            showEvents={visibility.showEventsNav}
            showBlogs={visibility.showBlogsNav}
            showCommunity={visibility.showCommunityNav}
            showLeadership={visibility.showLeadershipNav}
          />

          {/* Dynamic Page Content */}
          <div className="flex-1">{children}</div>

          {/* Persistent Global Footer */}
          <Footer
            showMembers={visibility.showMemberNav}
            showEvents={visibility.showEventsNav}
            showBlogs={visibility.showBlogsNav}
            showCommunity={visibility.showCommunityNav}
            showLeadership={visibility.showLeadershipNav}
            showInstagram={visibility.showInstagram}
            instagramUrl={visibility.instagramUrl}
            showLinkedIn={visibility.showLinkedIn}
            linkedInUrl={visibility.linkedInUrl}
          />
        </AppProviders>
      </body>
    </html>
  );
}
