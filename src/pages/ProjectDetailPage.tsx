import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ExternalLink, Calendar, Tag, Check, Briefcase } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { useRouter } from '../lib/router';
import { Reveal, CosmicOrb } from '../components/ui';
import { FooterCTA } from '../components/Footer';
import { SocialShare } from '../components/SocialShare';
import { fetchProjectBySlug, fetchPublishedProjects } from '../lib/data';
import type { Project } from '../lib/types';
import { formatDate } from '../lib/utils';

export function ProjectDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProjectBySlug(slug)
      .then((p) => {
        setProject(p);
        setLoading(false);
        if (p) {
          fetchPublishedProjects()
            .then((all) =>
              setRelated(
                all.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 2)
              )
            )
            .catch(() => setRelated([]));
        }
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [slug]);

  useSeo({
    title: project?.title,
    description: project?.description,
    canonicalPath: `/portfolio/${slug}`,
    ogType: 'article',
    ogImage: project?.screenshots?.[0],
    structuredData: project
      ? {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          url: `https://weborys.com/portfolio/${project.slug}`,
          image: project.screenshots,
          creator: { '@type': 'Organization', name: 'Weborys' },
          dateCreated: project.created_at,
        }
      : undefined,
  });

  if (loading) {
    return (
      <main className="pt-28">
        <div className="container-max container-px py-16">
          <div className="aspect-[16/9] animate-pulse rounded-3xl bg-ink-800/60" />
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="pt-28">
        <div className="container-max container-px py-24 text-center">
          <h1 className="text-3xl font-semibold text-white">Project not found</h1>
          <p className="mt-4 text-slate-400">
            The project you're looking for doesn't exist or isn't available.
          </p>
          <button onClick={() => navigate('/portfolio')} className="btn-primary mt-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28">
      <article>
        {/* Header */}
        <section className="relative overflow-hidden py-12">
          <CosmicOrb className="left-1/3 top-0 h-[280px] w-[500px] opacity-25" />
          <div className="container-max container-px relative">
            <Reveal>
              <button
                onClick={() => navigate('/portfolio')}
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </button>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cosmic-400/10 px-3 py-1 text-2xs font-medium uppercase tracking-wider text-cosmic-300 ring-1 ring-cosmic-400/20">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="rounded-full bg-gold-400/10 px-3 py-1 text-2xs font-medium uppercase tracking-wider text-gold-400 ring-1 ring-gold-400/20">
                    Featured
                  </span>
                )}
                {project.year && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {project.year}
                  </span>
                )}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
                {project.description}
              </p>
            </Reveal>
            {project.live_url && (
              <Reveal delay={260}>
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-8"
                >
                  Visit Live Site
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Reveal>
            )}
          </div>
        </section>

        {/* Hero screenshot */}
        {project.screenshots[0] && (
          <section className="container-max container-px">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-white/[0.08]">
                <img
                  src={project.screenshots[0]}
                  alt={project.title}
                  className="w-full"
                />
              </div>
            </Reveal>
          </section>
        )}

        {/* Body */}
        <section className="container-max container-px py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              {project.long_description && (
                <Reveal>
                  <div className="prose-weborys whitespace-pre-line text-lg leading-relaxed text-slate-300">
                    {project.long_description}
                  </div>
                </Reveal>
              )}

              {/* Additional screenshots */}
              {project.screenshots.length > 1 && (
                <div className="mt-12 space-y-6">
                  {project.screenshots.slice(1).map((shot, i) => (
                    <Reveal key={i} delay={i * 80}>
                      <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
                        <img src={shot} alt={`${project.title} screenshot ${i + 2}`} loading="lazy" className="w-full" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-white/[0.06] bg-ink-900/40 p-7">
                <h2 className="text-2xs font-semibold uppercase tracking-ultra text-slate-500">
                  Project Details
                </h2>
                <dl className="mt-5 space-y-5">
                  {project.client && (
                    <div>
                      <dt className="text-xs text-slate-500">Client</dt>
                      <dd className="mt-1 text-sm text-white">{project.client}</dd>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <dt className="text-xs text-slate-500">Year</dt>
                      <dd className="mt-1 text-sm text-white">{project.year}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs text-slate-500">Category</dt>
                    <dd className="mt-1 text-sm text-white">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Published</dt>
                    <dd className="mt-1 text-sm text-white">{formatDate(project.created_at)}</dd>
                  </div>
                </dl>

                {project.technologies.length > 0 && (
                  <div className="mt-6 border-t border-white/[0.06] pt-6">
                    <h3 className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-ultra text-slate-500">
                      <Tag className="h-3 w-3" />
                      Technologies
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-6 w-full"
                  >
                    Visit Live Site
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}

                {/* Social Share */}
                <div className="mt-6 border-t border-white/[0.06] pt-6">
                  <SocialShare url={`/portfolio/${project.slug}`} title={project.title} />
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="container-max container-px py-12">
            <h2 className="text-2xl font-semibold text-white">Related projects</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <button
                    onClick={() => navigate(`/portfolio/${p.slug}`)}
                    className="card card-hover group block w-full overflow-hidden text-left"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
                      {p.screenshots[0] ? (
                        <img
                          src={p.screenshots[0]}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-800">
                          <span className="font-display text-2xl font-semibold text-white/20">
                            {p.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="text-2xs font-medium uppercase tracking-wider text-cosmic-300">
                        {p.category}
                      </div>
                      <h3 className="mt-1.5 text-base font-semibold text-white">{p.title}</h3>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </article>

      <div className="mt-16">
        <FooterCTA />
      </div>
    </main>
  );
}
