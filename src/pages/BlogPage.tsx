import { useEffect, useState, useMemo } from 'react';
import { Search, ArrowUpRight, Clock } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { useRouter } from '../lib/router';
import { Reveal, CosmicOrb, Badge } from '../components/ui';
import { FooterCTA } from '../components/Footer';
import { fetchPublishedPosts } from '../lib/data';
import type { BlogPost } from '../lib/types';
import { cx, formatDate } from '../lib/utils';

export function BlogPage() {
  useSeo({
    title: 'Blog',
    description:
      'Insights, guides, and perspectives on web design, development, and digital craft from the Weborys studio.',
    canonicalPath: '/blog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Weborys Blog',
      url: 'https://weborys.com/blog',
    },
  });

  const { navigate } = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetchPublishedPosts()
      .then((p) => { setPosts(p); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [posts]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 12);
  }, [posts]);

  const featured = useMemo(() => posts.find((p) => p.featured) ?? posts[0] ?? null, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (activeTag && !p.tags.includes(activeTag)) return false;
      const q = query.toLowerCase();
      if (q && !p.title.toLowerCase().includes(q) && !p.excerpt.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [posts, category, activeTag, query]);

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <CosmicOrb className="right-1/3 top-0 h-[350px] w-[550px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-faint mask-fade-b opacity-30" />
        <div className="container-max container-px relative">
          <Reveal>
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-cosmic-400 animate-pulse-soft" />
              Blog
            </Badge>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-white sm:text-5xl lg:text-6xl">
              Ideas on design, code, and the craft of the web.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate-400 sm:text-xl">
              Perspectives, guides, and notes from the studio — on building digital experiences that perform.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured post — magazine style */}
      {!loading && !error && featured && !query && category === 'All' && !activeTag && (
        <section className="container-max container-px">
          <Reveal>
            <button
              onClick={() => navigate(`/blog/${featured.slug}`)}
              className="card card-hover group block w-full overflow-hidden text-left"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-800 lg:aspect-auto">
                  {featured.cover_image ? (
                    <img
                      src={featured.cover_image}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-[800ms] ease-smooth group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-800">
                      <span className="font-display text-5xl font-semibold text-white/15">W</span>
                    </div>
                  )}
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold-400/90 px-3 py-1.5 text-2xs font-semibold uppercase tracking-wider text-ink-950 backdrop-blur">
                    <Star className="h-3 w-3 fill-ink-950" />
                    Featured
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="font-medium uppercase tracking-wider text-cosmic-300">{featured.category}</span>
                    <span>·</span>
                    <span>{formatDate(featured.created_at)}</span>
                    {featured.reading_time && (
                      <>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featured.reading_time} min read
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-5 text-balance text-2xl font-semibold tracking-tighter text-white sm:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-400">{featured.excerpt}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cosmic-300 transition-all group-hover:gap-3">
                    Read article
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        </section>
      )}

      {/* Filters */}
      <section className="container-max container-px py-12">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/[0.06] bg-ink-900/40 p-5 backdrop-blur-sm">
            <div className="relative sm:max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="input pl-10"
                aria-label="Search articles"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cx(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                    category === c
                      ? 'bg-cosmic-400 text-ink-950 shadow-glow'
                      : 'border border-white/10 text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(activeTag === t ? null : t)}
                    className={cx(
                      'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300',
                      activeTag === t
                        ? 'bg-white/10 text-white ring-1 ring-white/20'
                        : 'text-slate-500 hover:text-slate-300'
                    )}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="container-max container-px pb-12">
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-3xl bg-ink-800/60" />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-error-500/20 bg-error-500/5 p-8 text-center">
            <p className="text-sm text-error-400">Couldn't load articles. {error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-3xl border border-white/[0.06] bg-ink-900/40 p-12 text-center">
            <p className="text-slate-400">No articles match your search.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 80}>
                <button
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="card card-hover group flex h-full w-full flex-col overflow-hidden text-left"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[800ms] ease-smooth group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-800">
                        <span className="font-display text-3xl font-semibold text-white/15">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium uppercase tracking-wider text-cosmic-300">{post.category}</span>
                      {post.reading_time && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.reading_time} min
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">{formatDate(post.created_at)}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-cosmic-300 transition-all group-hover:gap-2">
                        Read
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <div className="mt-16">
        <FooterCTA />
      </div>
    </>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6-6.3 4.6L7.9 14 2 9.4h7.6z" />
    </svg>
  );
}
