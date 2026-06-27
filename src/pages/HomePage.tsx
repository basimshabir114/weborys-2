import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Sparkles, Check, Star, Quote, Trophy, Award, Globe, Users, Zap, Shield, Mail, Send } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { useRouter } from '../lib/router';
import { Reveal, RevealStagger, SectionHeading, CosmicOrb, GoldOrb, Badge } from '../components/ui';
import { Marquee, Counter } from '../components/Marquee';
import { FooterCTA } from '../components/Footer';
import { SERVICES } from '../lib/services-data';
import { fetchPublishedProjects } from '../lib/data';
import type { Project } from '../lib/types';

const MARQUEE_ITEMS = [
  'Web Design', 'Web Development', 'UI/UX', 'E-Commerce', 'Web Apps',
  'Landing Pages', 'Optimization', 'Responsive Design', 'Brand Experiences',
];

const STATS = [
  { value: 50, suffix: '+', label: 'Projects Delivered', icon: Trophy },
  { value: 100, suffix: '%', label: 'Client Satisfaction', icon: Star },
  { value: 5, suffix: '+', label: 'Years Experience', icon: Globe },
  { value: 25, suffix: '+', label: 'Happy Clients', icon: Users },
];

const BIG_STATS = [
  { value: 50, suffix: 'Lakh+', label: 'Project Value Delivered', sublabel: 'Total value of projects completed' },
  { value: 98, suffix: '%', label: 'Client Retention Rate', sublabel: 'Clients who return for more work' },
  { value: 1, suffix: 'st', label: 'In Response Time', sublabel: 'Fastest studio support response' },
  { value: 4.9, suffix: '/5', label: 'Average Rating', sublabel: 'Client satisfaction score' },
];

const PROCESS = [
  { num: '01', title: 'Discover', desc: 'We dive deep into your brand, audience, and goals to understand what success looks like.' },
  { num: '02', title: 'Design', desc: "We craft a visual language and experience that's distinctly yours and strategically sound." },
  { num: '03', title: 'Develop', desc: 'We build with modern, performant, and accessible engineering — pixel-perfect and fast.' },
  { num: '04', title: 'Deliver', desc: 'We launch, measure, and refine — ensuring your investment keeps compounding.' },
];

const VALUES = [
  { title: 'Craft over compromise', desc: 'Every pixel, every line of code — deliberate and refined.' },
  { title: 'Performance is a feature', desc: 'Speed is not an optimization; it is a design principle.' },
  { title: 'Accessibility by default', desc: 'If it is not usable by everyone, it is not finished.' },
  { title: 'Design with intent', desc: 'Every element earns its place. Nothing is decorative.' },
];

const TESTIMONIALS = [
  {
    quote: 'Weborys transformed our digital presence entirely. The attention to detail and craft is unlike anything we have worked with before.',
    author: 'Rahul Sharma',
    role: 'CEO, TechStart Solutions',
    rating: 5,
  },
  {
    quote: 'They did not just build us a website — they built us a competitive advantage. Our conversions doubled within the first quarter.',
    author: 'Priya Patel',
    role: 'Founder, StyleBazaar',
    rating: 5,
  },
  {
    quote: 'The level of polish in the final product exceeded every expectation. It feels like a million-dollar brand experience.',
    author: 'Amit Kumar',
    role: 'Director, CloudServe India',
    rating: 5,
  },
  {
    quote: 'Working with Weborys was seamless. They understood our vision perfectly and delivered beyond what we imagined possible.',
    author: 'Sneha Reddy',
    role: 'Marketing Head, FinEdge',
    rating: 5,
  },
  {
    quote: 'The performance of our site improved dramatically. Our bounce rate dropped by 40% and engagement skyrocketed.',
    author: 'Vikram Singh',
    role: 'CTO, EduTech Pro',
    rating: 5,
  },
  {
    quote: 'Professional, responsive, and incredibly talented. The best investment we made for our brand this year.',
    author: 'Neha Gupta',
    role: 'Owner, Luxe Interiors',
    rating: 5,
  },
];

const CLIENT_LOGOS = [
  'TechStart', 'StyleBazaar', 'CloudServe', 'FinEdge', 'EduTech', 'Luxe', 'NexusGaming', 'GlacierHost',
];

const AWARDS = [
  { title: 'Top Web Studio', org: 'Clutch.co 2024', icon: Trophy },
  { title: 'Excellence in Design', org: 'Awwwards', icon: Award },
  { title: 'Fastest Growing', org: 'Startup India', icon: Zap },
  { title: 'Quality Certified', org: 'ISO 9001', icon: Shield },
];

export function HomePage() {
  useSeo({
    canonicalPath: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Weborys',
      url: 'https://weborys.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://weborys.com/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  });

  const { navigate } = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetchPublishedProjects()
      .then((p) => setProjects(p.slice(0, 3)))
      .catch(() => setProjects([]));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28">
        <CosmicOrb className="left-1/2 top-[-100px] h-[500px] w-[700px] -translate-x-1/2 opacity-40" />
        <GoldOrb className="right-[-200px] top-[200px] h-[300px] w-[400px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-faint mask-fade-b opacity-40" />

        <div className="container-max container-px relative">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <Badge>
                <Sparkles className="h-3 w-3" />
                Premium Digital Studio
              </Badge>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-7xl">
                Building Digital Experiences
                <br />
                That{' '}
                <span className="relative inline-block">
                  <span className="text-gradient-cosmic">Stand Out</span>
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left animate-draw-line bg-gradient-to-r from-cosmic-400 via-cosmic-300 to-transparent" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-slate-400 sm:text-xl">
                We design and develop modern websites, web applications, and digital experiences that help businesses grow online — delivering 50+ lakh worth of value.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => navigate('/portfolio')} className="btn-primary btn-lg group">
                  <span className="relative z-10 flex items-center gap-2">
                    View Portfolio
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
                <button onClick={() => navigate('/contact')} className="btn-ghost btn-lg group">
                  Start A Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>

          {/* Stats strip */}
          <Reveal delay={400}>
            <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] sm:grid-cols-4">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="group relative bg-ink-900/50 px-6 py-8 text-center backdrop-blur-sm transition-colors hover:bg-ink-850/60">
                    <Icon className="mx-auto h-5 w-5 text-cosmic-400/60" />
                    <div className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
                      <Counter value={s.value} suffix={s.suffix} prefix={s.prefix ?? ''} />
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">{s.label}</div>
                    <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-cosmic-400/50 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CLIENT LOGOS MARQUEE ============ */}
      <section className="relative border-y border-white/[0.04] bg-ink-900/30">
        <div className="container-max container-px py-8">
          <p className="text-center text-xs uppercase tracking-wider text-slate-500">Trusted by leading brands</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-40">
            {CLIENT_LOGOS.map((logo) => (
              <span key={logo} className="font-display text-lg font-semibold text-white">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section className="relative border-y border-white/[0.04] bg-ink-900/30">
        <Marquee items={MARQUEE_ITEMS} />
      </section>

      {/* ============ SERVICES BENTO ============ */}
      <section className="container-max container-px py-24 sm:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Services crafted for ambitious brands"
            description="From first concept to final pixel, we cover the full spectrum of digital craft — design, development, and optimization under one roof."
          />
        </Reveal>

        {/* Bento grid — first card spans 2 columns for visual hierarchy */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((service, i) => {
            const Icon = service.icon;
            const isLarge = i === 0;
            return (
              <Reveal key={service.slug} delay={i * 60}>
                <button
                  onClick={() => navigate('/services')}
                  className={cx(
                    'card card-hover group relative h-full w-full overflow-hidden p-7 text-left',
                    isLarge && 'lg:col-span-2 lg:row-span-1'
                  )}
                >
                  {/* Hover gradient sheen */}
                  <div className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-cosmic-400/[0.04] to-transparent transition-transform duration-700 group-hover:translate-y-0" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20 transition-all duration-500 group-hover:bg-cosmic-400/20 group-hover:ring-cosmic-400/30 group-hover:shadow-glow">
                      <Icon className="h-5 w-5 text-cosmic-300" />
                    </div>
                    <span className="font-mono text-xs text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-semibold text-white">{service.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{service.short}</p>
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cosmic-300 transition-all group-hover:gap-2.5">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <button onClick={() => navigate('/services')} className="btn-ghost group">
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <CosmicOrb className="right-[-100px] top-1/3 h-[400px] w-[500px] -translate-y-1/2 opacity-20" />
        <div className="container-max container-px relative">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="How we work"
              title="A process built for outcomes"
              description="Every project follows a proven path from idea to impact — transparent, collaborative, and focused on results."
            />
          </Reveal>

          <RevealStagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <div key={step.num} className="group relative h-full rounded-3xl border border-white/[0.06] bg-ink-900/40 p-7 transition-all duration-500 hover:border-white/12 hover:bg-ink-850/50">
                <div className="font-mono text-sm text-cosmic-400/60 transition-colors group-hover:text-cosmic-400/90">{step.num}</div>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                <div className="absolute inset-x-7 bottom-0 h-px scale-x-0 bg-gradient-to-r from-cosmic-400/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ============ FEATURED WORK ============ */}
      {projects.length > 0 && (
        <section className="container-max container-px py-24 sm:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Selected work"
                title="Featured projects"
                description="A glimpse of the digital experiences we have crafted for our clients."
              />
              <button onClick={() => navigate('/portfolio')} className="btn-ghost shrink-0 group">
                All projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 100}>
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
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {project.featured && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold-400/90 px-3 py-1 text-2xs font-semibold uppercase tracking-wider text-ink-950 backdrop-blur">
                        <Star className="h-2.5 w-2.5 fill-ink-950" />
                        Featured
                      </span>
                    )}
                    {/* Arrow indicator */}
                    <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-cosmic-400 text-ink-950 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-2xs font-medium uppercase tracking-wider text-cosmic-300">
                      {project.category}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{project.description}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-50" />
        <div className="container-max container-px relative">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Client voices"
              title="Trusted by brands who refuse ordinary"
              description="We measure our success by the outcomes our clients achieve."
            />
          </Reveal>

          <RevealStagger className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.slice(0, 6).map((t) => (
              <div key={t.author} className="card relative h-full p-8">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <Quote className="mt-4 h-6 w-6 text-cosmic-400/30" />
                <p className="mt-3 text-pretty text-base leading-relaxed text-slate-200">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ============ BIG STATS SECTION ============ */}
      <section className="container-max container-px py-24 sm:py-32">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="By the numbers"
            title="Results that speak for themselves"
            description="We let our work do the talking. Here is what we have achieved for our clients."
          />
        </Reveal>
        <RevealStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BIG_STATS.map((s) => (
            <div key={s.label} className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-ink-850/60 to-ink-900/40 p-8 text-center transition-all duration-500 hover:border-cosmic-400/30">
              <CosmicOrb className="left-1/2 top-[-50px] h-[150px] w-[200px] -translate-x-1/2 opacity-20 transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative">
                <div className="font-display text-4xl font-bold text-white sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-lg font-semibold text-cosmic-300">{s.label}</div>
                <div className="mt-1 text-xs text-slate-500">{s.sublabel}</div>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ============ AWARDS SECTION ============ */}
      <section className="relative overflow-hidden border-y border-white/[0.04] bg-ink-900/30 py-12">
        <div className="container-max container-px">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {AWARDS.map((award) => {
                const Icon = award.icon;
                return (
                  <div key={award.title} className="group flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 ring-1 ring-gold-400/20 transition-all group-hover:bg-gold-400/20">
                      <Icon className="h-5 w-5 text-gold-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{award.title}</div>
                      <div className="text-xs text-slate-500">{award.org}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="container-max container-px py-24 sm:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-ink-800 to-ink-900 p-10 text-center sm:p-16">
            <CosmicOrb className="left-1/4 top-[-50px] h-[250px] w-[400px] opacity-30" />
            <GoldOrb className="right-1/4 bottom-[-50px] h-[200px] w-[300px] opacity-20" />
            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20">
                <Mail className="h-6 w-6 text-cosmic-300" />
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                Stay in the loop
              </h2>
              <p className="mx-auto mt-4 max-w-md text-slate-400">
                Get exclusive insights, design tips, and early access to new features. No spam, ever.
              </p>
              {subscribed ? (
                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-success-500/10 px-6 py-3 text-success-300">
                  <Check className="h-5 w-5" />
                  Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-md gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input flex-1"
                  />
                  <button type="submit" className="btn-primary">
                    <Send className="h-4 w-4" />
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ VALUES ============ */}
      <section className="container-max container-px py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Our principles"
              title="The standards we hold ourselves to"
              description="These are not slogans — they are the filters we run every decision through, from the first sketch to the final deploy."
            />
          </Reveal>
          <RevealStagger className="space-y-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-ink-900/40 px-6 py-5 transition-all duration-500 hover:border-white/12 hover:bg-ink-850/50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cosmic-400/15 ring-1 ring-cosmic-400/30 transition-all group-hover:bg-cosmic-400/25 group-hover:shadow-glow">
                  <Check className="h-4 w-4 text-cosmic-300" />
                </span>
                <div>
                  <span className="block text-base font-semibold text-white">{v.title}</span>
                  <span className="mt-0.5 block text-sm text-slate-400">{v.desc}</span>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <div className="mt-8">
        <FooterCTA />
      </div>
    </>
  );
}

function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
