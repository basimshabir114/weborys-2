import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from '../lib/router';
import { cx } from '../lib/utils';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

function Logo() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cosmic-400/20 via-cosmic-500/10 to-transparent ring-1 ring-cosmic-400/25 transition-all duration-500 group-hover:ring-cosmic-400/40 group-hover:from-cosmic-400/30">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true" style={{ width: '18px', height: '18px' }}>
        <path d="M6 7 L12 17 L18 7" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="17" r="1.5" fill="#fbbf24" />
      </svg>
      <span className="absolute inset-0 rounded-xl bg-cosmic-400/0 blur-md transition-all duration-500 group-hover:bg-cosmic-400/10" />
    </span>
  );
}

export function Navbar() {
  const { path, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  const isActive = (p: string) =>
    p === '/' ? path === '/' : path === p || path.startsWith(p + '/');

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth',
        scrolled ? 'py-2.5' : 'py-4'
      )}
    >
      <div className="container-max container-px">
        <nav
          className={cx(
            'flex items-center justify-between rounded-full transition-all duration-500 ease-smooth',
            scrolled
              ? 'glass-strong px-4 py-2.5 shadow-card'
              : 'border border-transparent bg-transparent px-5 py-3'
          )}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="group flex items-center gap-2.5"
            aria-label="Weborys home"
          >
            <Logo />
            <span className="font-display text-lg font-semibold tracking-tightest text-white">
              Weborys
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => { e.preventDefault(); navigate(link.path); }}
                className={cx(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                  isActive(link.path) ? 'text-white' : 'text-slate-400 hover:text-white'
                )}
              >
                {isActive(link.path) && (
                  <span className="absolute inset-0 rounded-full bg-white/[0.06] ring-1 ring-white/10" />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="group relative hidden overflow-hidden rounded-full bg-cosmic-400 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all duration-400 hover:shadow-glow-strong sm:inline-flex"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Start A Project
                <span className="h-1 w-1 rounded-full bg-ink-950/60 transition-all group-hover:scale-150" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.06] md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 overflow-hidden rounded-3xl glass-strong p-3 shadow-card md:hidden animate-scale-in">
            <div className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => { e.preventDefault(); navigate(link.path); }}
                  className={cx(
                    'rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive(link.path)
                      ? 'bg-white/[0.06] text-white'
                      : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  )}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => navigate('/contact')}
                className="mt-2 rounded-2xl bg-cosmic-400 px-4 py-3 text-sm font-semibold text-ink-950"
              >
                Start A Project
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
