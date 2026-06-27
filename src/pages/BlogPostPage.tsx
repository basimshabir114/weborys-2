import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Tag } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { useRouter } from '../lib/router';
import { Reveal, CosmicOrb } from '../components/ui';
import { FooterCTA } from '../components/Footer';
import { SocialShare } from '../components/SocialShare';
import { fetchPostBySlug, fetchPublishedPosts } from '../lib/data';
import { renderMarkdown } from '../lib/markdown';
import type { BlogPost } from '../lib/types';
import { formatDate } from '../lib/utils';

export function BlogPostPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPostBySlug(slug)
      .then((p) => {
        setPost(p);
        setLoading(false);
        if (p) {
          fetchPublishedPosts()
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

  const html = useMemo(() => (post ? renderMarkdown(post.content) : ''), [post]);

  useSeo({
    title: post?.meta_title || post?.title,
    description: post?.meta_description || post?.excerpt,
    canonicalPath: `/blog/${slug}`,
    ogType: 'article',
    ogImage: post?.cover_image || undefined,
    structuredData: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.created_at,
          dateModified: post.updated_at,
          author: { '@type': 'Organization', name: post.author || 'Weborys' },
          publisher: { '@type': 'Organization', name: 'Weborys', url: 'https://weborys.com' },
          image: post.cover_image ? [post.cover_image] : undefined,
          mainEntityOfPage: `https://weborys.com/blog/${post.slug}`,
        }
      : undefined,
  });

  if (loading) {
    return (
      <main className="pt-28">
        <div className="container-max container-px py-16">
          <div className="h-8 w-2/3 animate-pulse rounded bg-ink-800/60" />
          <div className="mt-6 h-4 w-1/3 animate-pulse rounded bg-ink-800/60" />
          <div className="mt-12 h-96 animate-pulse rounded-3xl bg-ink-800/60" />
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="pt-28">
        <div className="container-max container-px py-24 text-center">
          <h1 className="text-3xl font-semibold text-white">Article not found</h1>
          <p className="mt-4 text-slate-400">This article doesn't exist or isn't available.</p>
          <button onClick={() => navigate('/blog')} className="btn-primary mt-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
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
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </button>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="rounded-full bg-cosmic-400/10 px-3 py-1 text-2xs font-medium uppercase tracking-wider text-cosmic-300 ring-1 ring-cosmic-400/20">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.created_at)}
                </span>
                {post.reading_time && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.reading_time} min read
                  </span>
                )}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{post.excerpt}</p>
            </Reveal>
            {post.author && (
              <Reveal delay={260}>
                <p className="mt-6 text-sm text-slate-500">
                  By <span className="text-slate-300">{post.author}</span>
                </p>
              </Reveal>
            )}
          </div>
        </section>

        {/* Cover */}
        {post.cover_image && (
          <section className="container-max container-px">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-white/[0.08]">
                <img src={post.cover_image} alt={post.title} className="w-full" />
              </div>
            </Reveal>
          </section>
        )}

        {/* Body */}
        <section className="container-max container-px py-16">
          <div className="mx-auto max-w-3xl">
            <div
              className="prose-weborys"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Social Share */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
              <SocialShare url={`/blog/${post.slug}`} title={post.title} />
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-slate-500" />
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="container-max container-px py-12">
            <h2 className="text-2xl font-semibold text-white">Related articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <button
                    onClick={() => navigate(`/blog/${p.slug}`)}
                    className="card card-hover group flex w-full items-center gap-5 overflow-hidden p-5 text-left"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-ink-800">
                      {p.cover_image ? (
                        <img
                          src={p.cover_image}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-800">
                          <span className="font-display text-xl font-semibold text-white/20">
                            {p.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-2xs font-medium uppercase tracking-wider text-cosmic-300">
                        {p.category}
                      </div>
                      <h3 className="mt-1 text-base font-semibold text-white line-clamp-2">{p.title}</h3>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cosmic-300" />
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
