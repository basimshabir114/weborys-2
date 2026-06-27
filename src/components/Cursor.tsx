import { useEffect, useRef, useState } from 'react';

// Premium custom cursor — a soft glow that follows the mouse with a trailing ring.
// Disabled on touch devices and when prefers-reduced-motion is set.
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse/trackpad).
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="hover"], input, textarea, select, label')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const animate = () => {
      // Smooth trailing for the ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-cosmic-400 transition-transform duration-200"
        style={{ marginLeft: '-4px', marginTop: '-4px' }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-cosmic-400/40 transition-[width,height,opacity,border-color] duration-300 ease-smooth"
        style={{
          width: hovering ? '56px' : '32px',
          height: hovering ? '56px' : '32px',
          marginLeft: hovering ? '-28px' : '-16px',
          marginTop: hovering ? '-28px' : '-16px',
          opacity: hovering ? 0.8 : 0.4,
          borderColor: hovering ? 'rgba(34,211,238,0.6)' : 'rgba(34,211,238,0.3)',
        }}
      />
    </div>
  );
}

// Scroll progress bar — a thin gradient line at the very top of the viewport.
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cosmic-400 via-cosmic-300 to-gold-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
