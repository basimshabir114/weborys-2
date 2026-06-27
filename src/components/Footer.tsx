import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { useRouter } from '../lib/router';
import { Reveal, CosmicOrb, GoldOrb } from './ui';

const FOOTER_NAV = [
  {
    title: 'Studio',
    links: [
      { label: 'About', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Blog', path: '/blog' },
      { label: 'Pricing', path: '/pricing' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Design', path: '/services' },
      { label: 'Web Development', path: '/services' },
      { label: 'UI/UX Design', path: '/services' },
      { label: 'E-Commerce', path: '/services' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Admin', path: '/admin' },
    ],
  },
];

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative mt-32 border-t border-white/[0.06] bg-ink-950">
      <div className="container-max container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              className="group flex items-center gap-2.5"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cosmic-400/20 to-cosmic-600/10 ring-1 ring-cosmic-400/25 transition-all group-hover:ring-cosmic-400/40">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true" style={{ width: '18px', height: '18px' }}>
                  <path d="M6 7 L12 17 L18 7" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="17" r="1.5" fill="#fbbf24" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold tracking-tightest text-white">Weborys</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              A modern digital studio crafting premium websites, web applications, and digital experiences for ambitious brands.
            </p>
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:b53595205@gmail.com"
                className="group flex items-center gap-2.5 text-sm text-slate-300 transition-colors hover:text-cosmic-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cosmic-400/10 ring-1 ring-cosmic-400/15 transition-all group-hover:bg-cosmic-400/20">
                  <Mail className="h-3.5 w-3.5 text-cosmic-300" />
                </span>
                b53595205@gmail.com
              </a>
              <a
                href="tel:+919149960912"
                className="group flex items-center gap-2.5 text-sm text-slate-300 transition-colors hover:text-cosmic-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cosmic-400/10 ring-1 ring-cosmic-400/15 transition-all group-hover:bg-cosmic-400/20">
                  <Phone className="h-3.5 w-3.5 text-cosmic-300" />
                </span>
                +91 9149960912
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h4 className="text-2xs font-semibold uppercase tracking-ultra text-slate-500">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      onClick={(e) => { e.preventDefault(); navigate(link.path); }}
                      className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-cosmic-400/50 transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Weborys. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Crafted with precision by the Weborys studio.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FooterCTA() {
  const { navigate } = useRouter();
  return (
    <section className="container-max container-px">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 px-8 py-16 text-center sm:px-16 sm:py-24">
          <CosmicOrb className="left-1/2 top-[-50px] h-[300px] w-[500px] -translate-x-1/2 opacity-40" />
          <GoldOrb className="right-[-100px] bottom-[-50px] h-[250px] w-[350px] opacity-20" />
          <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-lg mask-fade-b opacity-20" />

          <div className="relative">
            <p className="eyebrow justify-center">
              <span className="h-px w-8 bg-gradient-to-r from-cosmic-400/60 to-transparent" />
              Let's build together
              <span className="h-px w-8 bg-gradient-to-l from-cosmic-400/60 to-transparent" />
            </p>
            <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-semibold tracking-tighter text-white sm:text-4xl lg:text-5xl">
              Have a project in mind?
              <br />
              <span className="text-gradient-cosmic">Let's make it exceptional.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-slate-400">
              Tell us about your vision and we will craft a digital experience that sets your brand apart.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => navigate('/contact')} className="btn-primary btn-lg group">
                <span className="flex items-center gap-2">
                  Start A Project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
              <button onClick={() => navigate('/portfolio')} className="btn-ghost btn-lg group">
                View Portfolio
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
