import { Target, Eye, Heart, Layers, Cpu, ArrowRight, Compass, Zap, User, MapPin, Code, Palette, LineChart, Users } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { useRouter } from '../lib/router';
import { Reveal, RevealStagger, SectionHeading, CosmicOrb, GoldOrb, Badge } from '../components/ui';
import { FooterCTA } from '../components/Footer';
import { SectionDivider } from '../components/Marquee';

const VALUES = [
  { icon: Heart, title: 'Craftsmanship', desc: 'We treat every project as if our reputation depends on it — because it does. Details matter, and we sweat them.' },
  { icon: Target, title: 'Outcome-focused', desc: 'Beautiful work that does not move the needle is not enough. We design and build for measurable business results.' },
  { icon: Layers, title: 'Transparency', desc: 'Clear communication, honest timelines, and no surprises. You always know where your project stands.' },
  { icon: Cpu, title: 'Engineering rigor', desc: 'We build with maintainability and performance in mind, so your investment compounds rather than decays.' },
];

const PHILOSOPHY = [
  {
    icon: Compass,
    title: 'Design Philosophy',
    heading: 'Design with intent, not decoration.',
    body: [
      'We believe great design is invisible. It removes friction, guides attention, and makes the right action the obvious one. Every visual choice — from type scale to spacing to color — serves a purpose. We do not add elements; we earn them.',
      'Accessibility is not an afterthought; it is a baseline. If a design is not usable by everyone, it is not finished. We design systems, not just screens, so the work scales gracefully as your product grows.',
    ],
  },
  {
    icon: Zap,
    title: 'Development Philosophy',
    heading: 'Performance is a feature, not a nice-to-have.',
    body: [
      'We write code like it will be read a thousand times — because it will. Clean, typed, well-structured, and documented. We favor proven tools over trendy ones, and we ship less code, not more, whenever we can.',
      'Speed matters. A fast site ranks better, converts better, and respects your users time and data. We optimize for Core Web Vitals from the first commit, not as a launch-day patch. And we build for maintainability, so your investment ages well.',
    ],
  },
];

const TEAM = [
  {
    name: 'Basim',
    role: 'Founder & Lead Developer',
    location: 'India',
    skills: ['Full-Stack Development', 'System Architecture', 'UI/UX'],
    icon: Code,
  },
  {
    name: 'Arjun K.',
    role: 'Senior Designer',
    location: 'Bangalore',
    skills: ['UI/UX Design', 'Brand Identity', 'Motion'],
    icon: Palette,
  },
  {
    name: 'Neha S.',
    role: 'Frontend Specialist',
    location: 'Mumbai',
    skills: ['React', 'TypeScript', 'Animation'],
    icon: Code,
  },
  {
    name: 'Rahul M.',
    role: 'Backend Engineer',
    location: 'Delhi',
    skills: ['Node.js', 'Database', 'APIs'],
    icon: Cpu,
  },
  {
    name: 'Priya T.',
    role: 'Project Manager',
    location: 'Chennai',
    skills: ['Client Relations', 'Agile', 'QA'],
    icon: Users,
  },
  {
    name: 'Vikram R.',
    role: 'Growth Engineer',
    location: 'Hyderabad',
    skills: ['SEO', 'Analytics', 'Performance'],
    icon: LineChart,
  },
];

export function AboutPage() {
  useSeo({
    title: 'About',
    description:
      'Weborys is a modern digital studio founded by Basim in India, crafting premium web experiences that help ambitious brands stand out and grow online.',
    canonicalPath: '/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Weborys',
      url: 'https://weborys.com/about',
    },
  });

  const { navigate } = useRouter();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <CosmicOrb className="left-1/4 top-0 h-[350px] w-[550px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-faint mask-fade-b opacity-30" />
        <div className="container-max container-px relative">
          <Reveal>
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-cosmic-400 animate-pulse-soft" />
              About Weborys
            </Badge>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-white sm:text-5xl lg:text-6xl">
              A digital studio obsessed with the craft of building online.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate-400 sm:text-xl">
              Weborys is a modern digital studio that designs and develops high-quality websites, web applications, and digital experiences. We work with businesses, creators, startups, and brands who refuse to settle for ordinary — and we deliver work that is as strategic as it is beautiful.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision — editorial split */}
      <section className="container-max container-px py-12">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-ink-850/60 to-ink-900/40 p-8 transition-all duration-500 hover:border-white/12 sm:p-10">
              <CosmicOrb className="right-[-100px] top-[-50px] h-[200px] w-[300px] opacity-20 transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20 transition-all duration-500 group-hover:bg-cosmic-400/15 group-hover:shadow-glow">
                  <Target className="h-6 w-6 text-cosmic-300" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-white">Our Mission</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-400">
                  To help ambitious brands grow online by crafting digital experiences that are genuinely premium — fast, accessible, beautiful, and built to convert. We exist to close the gap between how good a business is and how good its digital presence looks.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-ink-850/60 to-ink-900/40 p-8 transition-all duration-500 hover:border-white/12 sm:p-10">
              <GoldOrb className="right-[-100px] top-[-50px] h-[200px] w-[300px] opacity-20 transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/10 ring-1 ring-gold-400/20 transition-all duration-500 group-hover:bg-gold-400/15 group-hover:shadow-glow-gold">
                  <Eye className="h-6 w-6 text-gold-400" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-white">Our Vision</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-400">
                  A web where every business — regardless of size — can present itself with the polish and performance of the world's best brands. We are building the studio that makes that accessible, one project at a time.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-max container-px py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="What we value"
            title="The principles behind every project"
            description="These values shape how we work, what we ship, and how we treat the people who trust us with their brand."
          />
        </Reveal>
        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="card card-hover group h-full p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/10 transition-all duration-500 group-hover:bg-cosmic-400/10 group-hover:ring-cosmic-400/20">
                  <Icon className="h-5 w-5 text-cosmic-300" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{v.desc}</p>
              </div>
            );
          })}
        </RevealStagger>
      </section>

      <SectionDivider className="py-8" />

      {/* Philosophy — editorial two-column */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <CosmicOrb className="right-1/4 top-0 h-[300px] w-[450px] opacity-20" />
        <div className="container-max container-px relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {PHILOSOPHY.map((p, idx) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={idx * 120}>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20">
                        <Icon className="h-5 w-5 text-cosmic-300" />
                      </div>
                      <p className="eyebrow">{p.title}</p>
                    </div>
                    <h2 className="mt-6 text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                      {p.heading}
                    </h2>
                    <div className="mt-5 space-y-4">
                      {p.body.map((para, i) => (
                        <p key={i} className="text-base leading-relaxed text-slate-400">{para}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="container-max container-px py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Meet the Founder"
            title="Driven by craft, powered by passion"
            description="Every great studio starts with a vision. Here is the person behind Weborys."
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-ink-850/60 to-ink-900/40 p-8 sm:p-12">
              <CosmicOrb className="right-[-150px] top-[-100px] h-[300px] w-[400px] opacity-20 transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
                <div className="relative shrink-0">
                  <div className="h-40 w-40 overflow-hidden rounded-full bg-gradient-to-br from-cosmic-400/20 to-gold-400/20 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-ink-900">
                      <User className="h-16 w-16 text-cosmic-300" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/90 px-3 py-1 text-2xs font-semibold text-ink-950">
                      <MapPin className="h-3 w-3" />
                      India
                    </span>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Basim
                  </h3>
                  <p className="mt-1 text-sm font-medium text-cosmic-300">Founder & Developer</p>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
                    Basim founded Weborys with a simple belief: every business deserves a digital presence that reflects the quality of their work. Based in India, he combines technical expertise with an eye for design to create websites that are not just visually stunning but also performant and accessible. His approach is hands-on, treating each project as a collaboration rather than a transaction.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                    <span className="rounded-full border border-cosmic-400/30 bg-cosmic-400/10 px-3 py-1.5 text-xs font-medium text-cosmic-300">
                      Full-Stack Development
                    </span>
                    <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 text-xs font-medium text-gold-400">
                      UI/UX Design
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300">
                      Performance Optimization
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Team */}
      <section className="container-max container-px py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="The Team"
            title="Crafted by talented people"
            description="Our distributed team brings together expertise from across India to deliver exceptional results."
          />
        </Reveal>
        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member) => {
            const Icon = member.icon;
            return (
              <div key={member.name} className="card card-hover group h-full p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cosmic-400/15 to-gold-400/10 ring-1 ring-cosmic-400/20 transition-all duration-500 group-hover:ring-cosmic-400/30">
                    <Icon className="h-6 w-6 text-cosmic-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="mt-0.5 text-sm text-cosmic-300">{member.role}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {member.location}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-2xs text-slate-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </section>

      {/* CTA */}
      <section className="container-max container-px py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-ink-800 to-ink-900 p-10 text-center sm:p-16">
            <CosmicOrb className="left-1/2 top-[-50px] h-[250px] w-[400px] -translate-x-1/2 opacity-30" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                Let's build something worth visiting.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                If you are ready for a digital presence that matches the quality of your work, we would love to talk.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => navigate('/contact')} className="btn-primary btn-lg group">
                  Start A Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => navigate('/services')} className="btn-ghost btn-lg">
                  Explore Services
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mt-8">
        <FooterCTA />
      </div>
    </>
  );
}
