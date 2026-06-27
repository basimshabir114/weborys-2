import { useState } from 'react';
import { Check, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { useRouter } from '../lib/router';
import { Reveal, SectionHeading, CosmicOrb, Badge } from '../components/ui';
import { FooterCTA } from '../components/Footer';
import { SERVICES } from '../lib/services-data';
import { cx } from '../lib/utils';

export function ServicesPage() {
  useSeo({
    title: 'Services',
    description:
      'Web design, web development, UI/UX, landing pages, e-commerce, custom web apps, and optimization — premium digital services from the Weborys studio.',
    canonicalPath: '/services',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: { '@type': 'Organization', name: 'Weborys', url: 'https://weborys.com' },
      serviceType: 'Digital Studio Services',
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Weborys Services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.short },
        })),
      },
    },
  });

  const { navigate } = useRouter();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <CosmicOrb className="right-1/4 top-0 h-[350px] w-[550px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-faint mask-fade-b opacity-30" />
        <div className="container-max container-px relative">
          <Reveal>
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-cosmic-400 animate-pulse-soft" />
              Our Services
            </Badge>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-white sm:text-5xl lg:text-6xl">
              Everything you need to build a premium digital presence.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate-400 sm:text-xl">
              Ten specialized services, one cohesive studio. Whether you need a single landing page or a full custom platform, we bring the same standard of craft to every engagement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services accordion */}
      <section className="container-max container-px py-8">
        <div className="space-y-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isOpen = openIdx === i;
            return (
              <Reveal key={service.slug} delay={i * 40}>
                <div
                  className={cx(
                    'group overflow-hidden rounded-3xl border transition-all duration-500',
                    isOpen
                      ? 'border-white/12 bg-ink-850/60 shadow-card'
                      : 'border-white/[0.06] bg-ink-900/40 hover:border-white/10'
                  )}
                >
                  {/* Header row */}
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 p-6 text-left sm:p-8"
                  >
                    <div className={cx(
                      'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 transition-all duration-500',
                      isOpen
                        ? 'bg-cosmic-400/15 ring-cosmic-400/25 shadow-glow'
                        : 'bg-white/[0.04] ring-white/10 group-hover:bg-cosmic-400/10'
                    )}>
                      <Icon className={cx('h-6 w-6 transition-colors', isOpen ? 'text-cosmic-300' : 'text-slate-400 group-hover:text-cosmic-300')} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                        <h2 className="text-xl font-semibold text-white sm:text-2xl">{service.title}</h2>
                      </div>
                      <p className="mt-1.5 text-sm text-slate-400 line-clamp-1">{service.short}</p>
                    </div>
                    <div className={cx(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                      isOpen ? 'border-cosmic-400/30 bg-cosmic-400/10 text-cosmic-300 rotate-180' : 'border-white/10 text-slate-400'
                    )}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>

                  {/* Expandable content */}
                  <div className={cx(
                    'grid transition-all duration-500 ease-smooth',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}>
                    <div className="overflow-hidden">
                      <div className="border-t border-white/[0.06] p-6 sm:p-8">
                        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                          {/* Left: description + benefits */}
                          <div>
                            <p className="text-base leading-relaxed text-slate-300">{service.description}</p>
                            <div className="mt-6">
                              <h3 className="text-2xs font-semibold uppercase tracking-ultra text-slate-500">Benefits</h3>
                              <ul className="mt-4 space-y-2.5">
                                {service.benefits.map((b) => (
                                  <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cosmic-400/15">
                                      <Check className="h-3 w-3 text-cosmic-300" />
                                    </span>
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {/* Right: process */}
                          <div>
                            <h3 className="text-2xs font-semibold uppercase tracking-ultra text-slate-500">Process</h3>
                            <div className="mt-4 space-y-3">
                              {service.process.map((p, idx) => (
                                <div key={p.step} className="group/item flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-ink-950/40 p-4 transition-colors hover:border-white/10">
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cosmic-400/10 font-mono text-xs text-cosmic-300 ring-1 ring-cosmic-400/15">
                                    {String(idx + 1).padStart(2, '0')}
                                  </span>
                                  <div>
                                    <div className="text-sm font-semibold text-white">{p.step}</div>
                                    <div className="mt-0.5 text-xs leading-relaxed text-slate-500">{p.detail}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* CTA */}
                        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
                          <button onClick={() => navigate('/contact')} className="btn-primary group">
                            Start A Project
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </button>
                          <button onClick={() => navigate('/portfolio')} className="btn-ghost">
                            See Examples
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process overview */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <CosmicOrb className="left-1/4 top-0 h-[300px] w-[450px] opacity-20" />
        <div className="container-max container-px relative">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Engagement model"
              title="How we work with you"
              description="A transparent, collaborative process that keeps you informed and in control from kickoff to launch."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Discovery call', desc: 'A free consultation to understand your goals, scope, and timeline.' },
              { step: '02', title: 'Proposal', desc: 'A clear scope, timeline, and fixed quote — no surprises, no hidden fees.' },
              { step: '03', title: 'Build', desc: 'Regular updates and review points as we design and develop your project.' },
              { step: '04', title: 'Launch & support', desc: 'We deploy, monitor, and stay available for ongoing improvements.' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <div className="group relative h-full rounded-3xl border border-white/[0.06] bg-ink-900/40 p-7 transition-all duration-500 hover:border-white/12 hover:bg-ink-850/50">
                  <div className="font-mono text-sm text-cosmic-400/60 transition-colors group-hover:text-cosmic-400/90">{s.step}</div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                  <div className="absolute inset-x-7 bottom-0 h-px scale-x-0 bg-gradient-to-r from-cosmic-400/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8">
        <FooterCTA />
      </div>
    </>
  );
}
