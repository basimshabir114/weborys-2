import type { ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';
import { cx } from '../lib/utils';

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Stagger container — reveals children in sequence when scrolled into view.
export function RevealStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cx('reveal-stagger', visible && 'is-visible', className)}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cx(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className={cx('eyebrow', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-gradient-to-r from-cosmic-400/60 to-transparent" />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tighter text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function CosmicOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        'pointer-events-none absolute rounded-full bg-cosmic-500/15 blur-[120px]',
        className
      )}
    />
  );
}

export function GoldOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        'pointer-events-none absolute rounded-full bg-gold-400/10 blur-[100px]',
        className
      )}
    />
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="pt-28">{children}</main>;
}

// Premium badge with animated border glow.
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-2xs font-medium uppercase tracking-ultra text-cosmic-300 backdrop-blur',
        className
      )}
    >
      {children}
    </span>
  );
}
