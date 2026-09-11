'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  Tag,
  CheckCircle2,
  Sparkles,
  Search,
  X,
} from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  image: string;
  featured?: boolean;
  content: string[];
  takeaways: string[];
}

const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'anatomy-of-high-trust-business-networks',
    title: 'The Anatomy of High-Trust Business Networks: Why Quality Always Trumps Quantity',
    excerpt:
      'In a hyper-connected world inundated with digital spam and transactional requests, high-tier founders are returning to curated, vetted private circles where confidentiality and trust form the bedrock of dealmaking.',
    category: 'Networking & Trust',
    readTime: '6 min read',
    date: 'March 8, 2026',
    author: {
      name: 'GBN Executive Board',
      role: 'Global Business Network Leadership',
    },
    image: '/vision-wide-Dafp-BMf.jpg',
    featured: true,
    takeaways: [
      'Transactional networking yields shallow contacts; curated peer circles unlock transformational joint ventures.',
      'Trust is cultivated through rigorous peer screening and non-solicitation community norms.',
      'High-table relationships compound in value over decades, acting as an executive balance sheet.',
    ],
    content: [
      'In modern commerce, the volume of your contact book has ceased to be an advantage. What matters today is relationship density — the proportion of contacts in your circle with whom you share mutual trust, intellectual alignment, and strategic synergy.',
      'Traditional networking platforms often suffer from the "tragedy of the commons": as open networks expand, signal-to-noise ratio collapses. Unfiltered solicitation displaces thoughtful dialogue, causing the most experienced leaders to withdraw behind closed doors.',
      'GBN Circle was founded on the opposite premise: intentional curation. By capping cohort sizes, vetting track records, and establishing a culture of mutual exchange rather than one-sided sales pitching, we create an environment where peer-to-peer vulnerability and high-stakes partnerships can flourish.',
      'When business leaders meet with guaranteed parity, conversations bypass superficial posturing and immediately address cross-border expansion, supply chain bottlenecks, sovereign regulatory navigation, and capital allocation.',
    ],
  },
  {
    id: '2',
    slug: 'caucasus-to-south-asia-trade-corridor',
    title: 'The Emerging Caucasus Corridor: Strategic Synergies Between India and Georgia',
    excerpt:
      'How Tbilisi has emerged as a frictionless bridge connecting South Asian enterprises to European and Black Sea trade corridors with progressive tax frameworks and strategic logistics.',
    category: 'Global Expansion',
    readTime: '8 min read',
    date: 'February 24, 2026',
    author: {
      name: 'Davit Kvirikashvili',
      role: 'Director of International Trade, Caucasus Desk',
    },
    image: '/chapter-georgia-D8E7sW8X.jpg',
    takeaways: [
      'Georgia offers zero corporate tax on reinvested earnings and duty-free access to EU and CIS markets.',
      'Indian manufacturing and agricultural exporters are increasingly leveraging Tbilisi as an EU distribution staging hub.',
      'Bilateral business delegations organized through GBN Circle facilitate direct ministerial and chamber access.',
    ],
    content: [
      'Over the past decade, Georgia has positioned itself as one of the world’s most business-friendly regulatory regimes, consistently ranking among global leaders for ease of doing business and low corruption.',
      'For Indian enterprises seeking export expansion beyond traditional Middle Eastern markets, Georgia offers a strategic gateway directly into Europe. With Deep and Comprehensive Free Trade Agreements (DCFTA) in place with the European Union, goods processed or warehoused in Georgia can reach over 500 million high-income European consumers with reduced tariffs.',
      'GBN Circle’s active presence in Tbilisi (Ioane Shavteli St) serves as a physical liaison office for delegation members looking to incorporate, acquire commercial real estate, or forge joint distribution pacts with regional partners.',
    ],
  },
  {
    id: '3',
    slug: 'cross-border-supply-chain-resilience',
    title: 'Navigating Volatility: Architecting Resilient Cross-Border Supply Chains in 2026',
    excerpt:
      'Geopolitical shifts and shipping route recalculations demand flexible supplier ecosystems. Insights from leading manufacturing and logistics CEOs.',
    category: 'Cross-Border Trade',
    readTime: '5 min read',
    date: 'February 12, 2026',
    author: {
      name: 'Aditya Mathur',
      role: 'Global Supply Chain & Logistics Practice Lead',
    },
    image: '/event-networking-BdmXOEy2 (1).jpg',
    takeaways: [
      'Single-source dependencies are no longer acceptable risk profiles for mid-tier enterprises.',
      'Multi-hub warehousing across regional free zones safeguards against local geopolitical disruptions.',
      'Peer intelligence sharing provides 60-day early warnings ahead of macroeconomic shipping bottlenecks.',
    ],
    content: [
      'The past three years have irrevocably dismantled the assumption of frictionless just-in-time global logistics. Between maritime chokepoints and currency swings, business leaders must design operational resilience into their core contracts.',
      'In our quarterly closed-door masterminds, enterprise members consistently highlight "friend-shoring" — partnering with vetted owner-operators in allied jurisdictions — as the most cost-effective hedge against global instability.',
      'Rather than relying exclusively on public broker boards, GBN Circle members leverage bilateral verified introductions to secure priority capacity and preferential payment credit lines.',
    ],
  },
  {
    id: '4',
    slug: 'modern-boardroom-governance-and-agility',
    title: 'The Modern Boardroom: Balancing High-Growth Agility with Executive Governance',
    excerpt:
      'How first-generation founders can construct advisory boards that protect equity value without suffocating the entrepreneurial instinct that birthed the venture.',
    category: 'Leadership',
    readTime: '7 min read',
    date: 'January 28, 2026',
    author: {
      name: 'Sanjeev Goel',
      role: 'Senior Partner, Governance & Capital Structuring',
    },
    image: '/hero-business-CEo9t7bF.jpg',
    takeaways: [
      'Independent advisory boards provide external accountability before private equity or institutional rounds.',
      'Compensation should combine modest equity retainers with clear milestones tied to strategic introductions.',
      'Cultivate board members with complementary jurisdictional expertise rather than identical industry backgrounds.',
    ],
    content: [
      'Every ambitious founder reaches an inflection point where instinctive, seat-of-the-pants decision making transitions from being a superpower to a structural bottleneck.',
      'Instituting a high-caliber Advisory Board does not signify bureaucratic slowdown. Done right, it grants the CEO access to decades of battle-tested wisdom, preventing catastrophic legal, capital, and partner missteps.',
      'Through the GBN Circle ecosystem, members routinely match with seasoned board directors and former corporate officers who provide mentorship, governance hygiene, and strategic introductions that accelerate valuation multiples.',
    ],
  },
  {
    id: '5',
    slug: 'art-of-high-value-referral-partnerships',
    title: 'Why Most Business Introductions Fail — And How to Structure Referrals That Convert',
    excerpt:
      'Passing a business card is not an introduction. Master the double-opt-in protocol, context briefing, and alignment incentives that generate multi-million dollar contracts.',
    category: 'Networking & Trust',
    readTime: '5 min read',
    date: 'January 14, 2026',
    author: {
      name: 'Editorial Board',
      role: 'GBN Circle Practice Insights',
    },
    image: '/chapter-india-CQb3c-u7.jpg',
    takeaways: [
      'Always practice the Double Opt-In rule before introducing two executive contacts.',
      'Frame introductions with the "Why Now & Why Each Other" two-sentence context elevator.',
      'Follow up discreetly after 14 days to preserve relationship hygiene regardless of commercial outcome.',
    ],
    content: [
      'The cardinal sin of business networking is the "unsolicited forward" — forcing two busy executives into an awkward email thread without confirming appetite or schedule availability.',
      'At GBN Circle, our internal protocol insists on bilateral readiness. When a member requests an introduction to another chapter leader, a private context brief is shared detailing the exact scope, synergy thesis, and respect for the recipient’s time.',
      'This single protocol difference is why over 78% of GBN Circle executive introductions progress past the initial exploratory conversation into tangible commercial agreements.',
    ],
  },
  {
    id: '6',
    slug: 'innovation-ai-and-cross-border-enterprise',
    title: 'AI in Enterprise Workflows: Moving Past the Hype to Operational Margin Expansion',
    excerpt:
      'Real-world case studies of mid-sized traditional businesses using automated intelligence to slash overheads and accelerate international response times.',
    category: 'Innovation',
    readTime: '6 min read',
    date: 'January 5, 2026',
    author: {
      name: 'Technology Advisory Council',
      role: 'GBN Innovation Taskforce',
    },
    image: '/community-grid-1-DFJ2a7e7.jpg',
    takeaways: [
      'Do not replace human customer relationships; automate repetitive back-office documentation and compliance checks.',
      'Cross-border customs and multilingual contract analysis have achieved 80% acceleration through localized models.',
      'Mid-market enterprises that embrace pragmatic workflow automation achieve immediate EBITDA margin expansion.',
    ],
    content: [
      'While tech media focuses on existential debates, pragmatic business leaders are quietly deploying targeted automation to resolve granular operational headaches.',
      'Within the GBN Circle network, members from real estate, export-import, and specialized professional services have shared operational playbooks demonstrating substantial cost reduction in translation, export invoice validation, and RFP response times.',
      'Our cross-chapter Innovation Roundtables connect non-technical founders with vetted enterprise implementers, avoiding expensive consultants and ensuring rapid return on investment.',
    ],
  },
];

const CATEGORIES = [
  'All',
  'Networking & Trust',
  'Global Expansion',
  'Cross-Border Trade',
  'Leadership',
  'Innovation',
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail) {
      setSubscribed(true);
      setSubscribeEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-white/5">
        <div className="absolute inset-0 bg-radial-gradient from-slate-900/60 via-[#070b19] to-[#070b19]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-xs uppercase tracking-widest font-bold mb-6">
            <Sparkles size={14} /> GBN Circle Perspectives
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
            Thought Leadership & Executive Intelligence
          </h1>

          <p className="text-xl sm:text-2xl font-serif text-[#c5a059] mt-3 font-light">
            Insights. Strategic Frameworks. Cross-Border Wisdom.
          </p>

          <p className="text-slate-300 max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-relaxed font-light">
            Practical knowledge, market intelligence, and partnership insights authored by entrepreneurs, chapter chairs, and executive board members across our global network.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perspectives by keyword or topic..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 focus:border-[#c5a059] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-colors shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/10'
                  : 'bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Editor's Pick (Shown when category is 'All' and no search query) */}
      {activeCategory === 'All' && !searchQuery && featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="relative rounded-3xl overflow-hidden border border-[#c5a059]/30 bg-slate-950 group shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[320px] overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#070b19]/40 to-[#070b19]"></div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#0b1021]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#c5a059] text-black">
                      Featured Pick
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Tag size={12} className="text-[#c5a059]" /> {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm mt-4 line-clamp-4 leading-relaxed font-light">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-800/80 mt-6 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-white font-medium block">{featuredArticle.author.name}</span>
                    <span className="text-slate-500 text-[11px]">{featuredArticle.date} &bull; {featuredArticle.readTime}</span>
                  </div>

                  <button
                    onClick={() => setReadingArticle(featuredArticle)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
                  >
                    Read <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-white">
            {activeCategory === 'All' ? 'Latest Perspectives' : `${activeCategory} Articles`} ({filteredArticles.length})
          </h3>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
            <BookOpen size={36} className="mx-auto text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm">No perspectives found matching your search.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-[#c5a059] font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-slate-900/50 border border-slate-800 hover:border-[#c5a059]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg hover:shadow-[#c5a059]/5"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-black/70 text-[#c5a059] border border-[#c5a059]/30">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#c5a059]" /> {art.date}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[#c5a059]" /> {art.readTime}
                      </span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-white group-hover:text-[#c5a059] transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h4>

                    <p className="text-slate-400 text-xs mt-3 line-clamp-3 leading-relaxed font-light">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 text-[10px] font-bold">
                      <User size={12} />
                    </div>
                    <div className="text-[11px] truncate max-w-[130px]">
                      <span className="text-slate-300 block truncate font-medium">{art.author.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setReadingArticle(art)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#c5a059] hover:text-[#d4af37] uppercase tracking-wider transition-colors"
                  >
                    Read Article <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Dispatch Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0b1021] border border-[#c5a059]/30 text-center relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-[10px] uppercase font-bold tracking-widest mb-4">
            Executive Dispatch
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Receive The Monthly GBN Intelligence Briefing
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed font-light">
            Curated cross-border analyses, sovereign regulatory digests, and advance notices for private masterminds delivered directly to verified business leaders.
          </p>

          {subscribed ? (
            <div className="mt-6 p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 size={16} /> Thank you. Your email has been added to our executive dispatch list.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter your corporate email..."
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 focus:border-[#c5a059] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-md shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Interactive Article Reading Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b1021] border border-[#c5a059]/40 rounded-2xl max-w-3xl w-full p-6 sm:p-10 relative my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-2xl p-1 z-10"
              title="Close article"
            >
              <X size={20} />
            </button>

            {/* Header info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 text-xs mb-3">
                <span className="px-2.5 py-1 rounded bg-[#c5a059] text-black text-[10px] font-bold uppercase tracking-wider">
                  {readingArticle.category}
                </span>
                <span className="text-slate-400">{readingArticle.date}</span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-400">{readingArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                {readingArticle.title}
              </h2>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{readingArticle.author.name}</div>
                  <div className="text-xs text-[#c5a059]">{readingArticle.author.role}</div>
                </div>

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Perspective link copied to clipboard!');
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
            </div>

            {/* Article Image */}
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden my-6 border border-slate-800">
              <Image
                src={readingArticle.image}
                alt={readingArticle.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Key Executive Takeaways */}
            <div className="my-8 p-6 bg-slate-950/70 border border-[#c5a059]/30 rounded-xl space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#c5a059] flex items-center gap-2">
                <CheckCircle2 size={14} /> Executive Takeaways
              </h4>
              <ul className="space-y-2">
                {readingArticle.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-normal">
                    <span className="text-[#c5a059] font-bold">&bull;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {readingArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Footer action */}
            <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Published by GBN Circle Thought Leadership Desk
              </span>
              <div className="flex gap-3">
                <Link
                  href="/events"
                  className="px-4 py-2 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-lg"
                >
                  Explore Upcoming Sessions
                </Link>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

