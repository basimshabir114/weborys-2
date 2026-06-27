import { useEffect, useState, useMemo } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, Star } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { useRouter } from '../lib/router';
import { Reveal, CosmicOrb, Badge } from '../components/ui';
import { FooterCTA } from '../components/Footer';
import { fetchPublishedProjects } from '../lib/data';
import type { Project } from '../lib/types';
import { cx } from '../lib/utils';

export function PortfolioPage() {
  useSeo({
    title: 'Portfolio',
    description:
      'Explore selected web design, development, and digital experience projects crafted by the Weborys studio.',
    canonicalPath: '/portfolio',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Weborys Portfolio',
      url: 'https://weborys.com/portfolio',
    },
  });

  const { navigate } = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchPublishedProjects()
      .then((p) => { setProjects(p); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = category === 'All' || p.category === category;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [projects, category, query]);

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <CosmicOrb className="left-1/3 top-0 h-[350px] w-[550px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-faint mask-fade-b opacity-30" />
        <div className="container-max container-px relative">
          <Reveal>
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-cosmic-400 animate-pulse-soft" />
              Portfolio
            </Badge>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-white sm:text-5xl lg:text-6xl">
              Selected work, built to stand out.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate-400 sm:text-xl">
              A curated selection of the websites, applications, and digital experiences we have crafted. Every project is custom-built — no templates, no shortcuts.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="container-max container-px">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/[0.06] bg-ink-900/40 p-5 backdrop-blur-sm">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="input pl-10"
                aria-label="Search projects"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-slate-500" />
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cx(
                    'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                    category === c
                      ? 'bg-cosmic-400 text-ink-950 shadow-glow'
                      : 'border border-white/10 text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="container-max container-px py-12">
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-3xl bg-ink-800/60" />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-error-500/20 bg-error-500/5 p-8 text-center">
            <p className="text-sm text-error-400">Couldn't load projects. {error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-3xl border border-white/[0.06] bg-ink-900/40 p-12 text-center">
            <p className="text-slate-400">No projects match your search. Try a different filter.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 80}>
                <button
                  onClick={() => navigate(`/portfolio/${project.slug}`)}
                  className="card card-hover group block h-full w-full overflow-hidden text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                    {project.screenshots[0] ? (
                      <img
                        src={project.screenshots[0]}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[800ms] ease-smooth group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-800">
                        <span className="font-display text-3xl font-semibold text-white/20">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {project.featured && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold-400/90 px-3 py-1 text-2xs font-semibold uppercase tracking-wider text-ink-950 backdrop-blur">
                        <Star className="h-2.5 w-2.5 fill-ink-950" />
                        Featured
                      </span>
                    )}
                    {/* Arrow indicator */}
                    <div className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-cosmic-400 text-ink-950 opacity-0 shadow-glow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-2xs font-medium uppercase tracking-wider text-cosmic-300">
                      {project.category}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-2xs text-slate-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
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
