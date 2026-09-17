'use client';

import { useState, useEffect } from 'react';
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
      name: 'Rajesh Subramanian',
      role: 'Managing Director, Apex Logistics & GBN Elite Member',
    },
    image: '/event-networking-BdmXOEy2 (1).jpg',
    takeaways: [
      'Dual-sourcing strategies across non-correlated jurisdictions reduce disruption vulnerability by 40%.',
      'Informal peer intelligence often precedes formal trade alerts by weeks.',
      'Bilateral trusted partnerships streamline customs friction faster than formal trade litigation.',
    ],
    content: [
      'The era of frictionless global just-in-time inventory has been replaced by just-in-case resilience. Industrial leaders across India and the GCC are actively restructuring supply lines to avoid single-point chokeholds.',
      'In our recent closed-door GBN Elite boardroom session, members examined how bilateral relationship agreements facilitated immediate port warehousing alternatives during recent Red Sea logistics delays.',
      'When crisis strikes, commercial contracts define liabilities, but personal relationship capital moves cargo.',
    ],
  },
  {
    id: '4',
    slug: 'transitioning-from-operator-to-statesperson',
    title: 'From Operator to Industry Statesperson: The Second Curve of Executive Growth',
    excerpt:
      'Reaching ₹50Cr+ turnover requires a profound mindset shift: moving from operational dominance to institutional governance, relationship capital, and sovereign ecosystem influence.',
    category: 'Leadership & Scaling',
    readTime: '7 min read',
    date: 'January 28, 2026',
    author: {
      name: 'Dr. Vikramaditya Sen',
      role: 'Executive Coach & Governance Advisor',
    },
    image: '/event-leadership-C1eE1_9Q (1).jpg',
    takeaways: [
      'Micromanaging scale creates a founder ceiling; institutional trust unlocks exponential enterprise value.',
      'High-tier founders transition their time allocation from internal firefighting to external alliance building.',
      'Reputational integrity is the rarest asset in late-stage capital raising and M&A.',
    ],
    content: [
      'The cognitive skills that propel a founder from zero to ten crores are rarely the same attributes required to scale from fifty to five hundred crores. The initial phase rewards relentless execution, hyper-involvement, and decisive command.',
      'The second curve demands something counter-intuitive: intentional delegation, psychological safety, and the deliberate cultivation of institutional relationships.',
      'In GBN Circle’s senior cohorts, we observe that the most accomplished chairpersons spend up to 60% of their bandwidth nurturing peer alliances, mentoring promising venture heads, and shaping policy environments.',
    ],
  },
  {
    id: '5',
    slug: 'capital-allocation-family-office-trends-2026',
    title: 'Private Capital Allocation: Family Office Direct Investment Trends in High-Growth SMBs',
    excerpt:
      'Why prominent family offices are bypassing traditional private equity funds in favor of direct co-investments alongside trusted founder-operators in specialized sectors.',
    category: 'Capital & Investment',
    readTime: '6 min read',
    date: 'January 15, 2026',
    author: {
      name: 'Ananya Singhania',
      role: 'Principal, Singhania Strategic Holdings',
    },
    image: '/chapter-jaipur-D6rR1Z-z.jpg',
    takeaways: [
      'Family offices increasingly seek sector-specialist founders rather than blind-pool financial managers.',
      'Patient capital values EBITDA profitability and clean balance sheets over vanity growth multiples.',
      'Peer-vetted business communities serve as pre-screened deal origination pipelines.',
    ],
    content: [
      'The global private wealth landscape is undergoing a decisive structural pivot. Dissatisfied with generic private equity management fees and disconnected fund managers, family offices are allocating significant balance sheet reserves directly into verified, profitable enterprises.',
      'This direct investment wave particularly benefits mid-market manufacturing, high-margin B2B services, and specialized logistics operators who have established operational profitability but require strategic growth capital to enter overseas territories.',
      'Within private circles like GBN Elite, syndicate conversations emerge organically from table interactions rather than aggressive investment banking decks.',
    ],
  },
  {
    id: '6',
    slug: 'building-defensible-brands-b2b',
    title: 'Building Defensible Moats in Commodity B2B Sectors Through Relationship Equity',
    excerpt:
      'When products and pricing reach parity, relationship equity and flawless institutional trust remain the only unassailable competitive advantage.',
    category: 'Networking & Trust',
    readTime: '5 min read',
    date: 'January 04, 2026',
    author: {
      name: 'Kavita Menon',
      role: 'Founder & Principal Architect, Studio Terra',
    },
    image: '/event-leadership-C1eE1_9Q.jpg',
    takeaways: [
      'Commodity features can be copied in months; trusted bilateral client history cannot be replicated.',
      'High-touch executive accessibility preserves customer accounts through market downturns.',
      'A founder’s personal network often represents the primary barrier to entry against well-funded incumbents.',
    ],
    content: [
      'In saturated industrial segments, technological differentiation has a shrinking half-life. Competitors reverse-engineer formulations, match automated manufacturing specs, and match logistics timelines.',
      'What competitors cannot copy is thirty years of shared handshakes, delivered promises under duress, and unconditional personal accountability.',
      'Relationship equity is not a soft sentiment; it is a measurable corporate asset that reduces client churn to near zero and commands premium pricing power.',
    ],
  },
];

const CATEGORIES = [
  'All',
  'Networking & Trust',
  'Global Expansion',
  'Cross-Border Trade',
  'Leadership & Scaling',
  'Capital & Investment',
];

export default function BlogsPage() {
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          const mapped: Article[] = json.data.map((b: any) => ({
            id: b.id,
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt,
            category: b.category,
            readTime: b.readTime,
            date: new Date(b.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            author: {
              name: b.authorName,
              role: b.authorRole,
            },
            image: b.image || '/vision-wide-Dafp-BMf.jpg',
            featured: b.featured,
            content:
              b.contentParagraphs && b.contentParagraphs.length > 0
                ? b.contentParagraphs
                : [b.content],
            takeaways: b.takeaways || [],
          }));
          setArticles(mapped);
        }
      } catch (err) {
        console.error('Error fetching live blogs:', err);
      }
    };
    fetchLiveBlogs();
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      (activeCategory === 'All' || article.category === activeCategory) &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail) {
      setSubscribed(true);
      setSubscribeEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b19] text-slate-900 dark:text-white pb-24 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pb-24 border-b border-slate-200 dark:border-white/5">
        <div className="absolute inset-0 bg-radial-gradient from-slate-200/60 dark:from-slate-900/60 via-slate-100/40 dark:via-[#070b19] to-slate-50 dark:to-[#070b19]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#b38838] dark:text-[#c5a059] text-xs uppercase tracking-widest font-bold mb-6">
            <Sparkles size={14} /> GBN Circle Perspectives
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
            Thought Leadership & Executive Intelligence
          </h1>

          <p className="text-xl sm:text-2xl font-serif text-[#b38838] dark:text-[#c5a059] mt-3 font-medium">
            Insights. Strategic Frameworks. Cross-Border Wisdom.
          </p>

          <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-relaxed font-normal dark:font-light">
            Practical knowledge, market intelligence, and partnership insights authored by entrepreneurs, chapter chairs, and executive board members across our global network.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perspectives by keyword or topic..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 focus:border-[#c5a059] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors shadow-sm dark:shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs"
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
                  ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/10 font-bold'
                  : 'bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
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
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-[#c5a059]/30 bg-white dark:bg-slate-950 group shadow-xl dark:shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[320px] overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-slate-950/40 dark:via-[#070b19]/40 to-slate-950/80 dark:to-[#070b19]"></div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-white dark:bg-[#0b1021]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#c5a059] text-black shadow-xs">
                      Featured Pick
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-medium">
                      <Tag size={12} className="text-[#b38838] dark:text-[#c5a059]" /> {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#b38838] dark:group-hover:text-[#c5a059] transition-colors leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm mt-4 line-clamp-4 leading-relaxed font-normal dark:font-light">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 mt-6 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-900 dark:text-white font-semibold block">{featuredArticle.author.name}</span>
                    <span className="text-slate-500 text-[11px]">{featuredArticle.date} &bull; {featuredArticle.readTime}</span>
                  </div>

                  <button
                    onClick={() => setReadingArticle(featuredArticle)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm"
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
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
            {activeCategory === 'All' ? 'Latest Perspectives' : `${activeCategory} Articles`} ({filteredArticles.length})
          </h3>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
            <BookOpen size={36} className="mx-auto text-slate-400 mb-3" />
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">No perspectives found matching your search.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-[#b38838] dark:text-[#c5a059] font-semibold rounded-lg border border-slate-300 dark:border-transparent transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-[#c5a059]/60 dark:hover:border-[#c5a059]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-[#c5a059]/5"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-black/70 text-[#c5a059] border border-white/10">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2.5 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#b38838] dark:text-[#c5a059]" /> {art.date}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[#b38838] dark:text-[#c5a059]" /> {art.readTime}
                      </span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#b38838] dark:group-hover:text-[#c5a059] transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h4>

                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-3 line-clamp-3 leading-relaxed font-normal dark:font-light">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent flex items-center justify-center text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                      <User size={12} />
                    </div>
                    <div className="text-[11px] truncate max-w-[130px]">
                      <span className="text-slate-800 dark:text-slate-300 block truncate font-semibold">{art.author.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setReadingArticle(art)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#b38838] dark:text-[#c5a059] hover:text-[#d4af37] uppercase tracking-wider transition-colors"
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
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-[#0b1021] border border-slate-200 dark:border-[#c5a059]/30 text-center relative overflow-hidden shadow-xl dark:shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#b38838] dark:text-[#c5a059] text-[10px] uppercase font-bold tracking-widest mb-4 border border-[#c5a059]/20">
            Executive Dispatch
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Receive The Monthly GBN Intelligence Briefing
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed font-normal dark:font-light">
            Curated cross-border analyses, sovereign regulatory digests, and advance notices for private masterminds delivered directly to verified business leaders.
          </p>

          {subscribed ? (
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs max-w-md mx-auto flex items-center justify-center gap-2 font-medium">
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
                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-[#c5a059] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0b1021] border border-slate-200 dark:border-[#c5a059]/40 rounded-2xl max-w-3xl w-full p-6 sm:p-10 relative my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white text-2xl p-1 z-10 transition-colors"
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
                <span className="text-slate-500 dark:text-slate-400">{readingArticle.date}</span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-500 dark:text-slate-400">{readingArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                {readingArticle.title}
              </h2>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{readingArticle.author.name}</div>
                  <div className="text-xs text-[#b38838] dark:text-[#c5a059] font-medium">{readingArticle.author.role}</div>
                </div>

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Perspective link copied to clipboard!');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
            </div>

            {/* Article Image */}
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden my-6 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
              <Image
                src={readingArticle.image}
                alt={readingArticle.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Key Executive Takeaways */}
            <div className="my-8 p-6 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-[#c5a059]/30 rounded-xl space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#b38838] dark:text-[#c5a059] flex items-center gap-2">
                <CheckCircle2 size={14} /> Executive Takeaways
              </h4>
              <ul className="space-y-2">
                {readingArticle.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-normal font-medium">
                    <span className="text-[#b38838] dark:text-[#c5a059] font-bold">&bull;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
              {readingArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Footer action */}
            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Published by GBN Circle Thought Leadership Desk
              </span>
              <div className="flex gap-3">
                <Link
                  href="/events"
                  className="px-4 py-2 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm"
                >
                  Explore Upcoming Sessions
                </Link>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-transparent text-xs font-semibold rounded-lg transition-colors"
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
