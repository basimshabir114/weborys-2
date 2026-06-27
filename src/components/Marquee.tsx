import { useEffect, useState } from 'react';
import { useReveal } from '../lib/useReveal';
import { cx } from '../lib/utils';

// Infinite marquee — duplicates content for seamless loop.
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={cx('relative overflow-hidden mask-fade-x py-6', className)}>
      <div className="flex w-max animate-marquee gap-12">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 text-2xl font-display font-medium text-white/30 sm:text-3xl"
          >
            {item}
            <span className="text-cosmic-400/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Animated number counter — counts up when scrolled into view.
export function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

// A premium section divider — animated gradient line.
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cx('flex items-center justify-center gap-4', className)}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-cosmic-400/40" />
      <div className="h-1.5 w-1.5 rotate-45 bg-cosmic-400/50" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-cosmic-400/40" />
    </div>
  );
}
