import { useEffect } from 'react';

interface SeoOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  structuredData?: object | object[];
  noIndex?: boolean;
}

const SITE_URL = 'https://weborys.com';
const DEFAULT_TITLE = 'Weborys — Digital Studio Crafting Premium Web Experiences';
const DEFAULT_DESC =
  'Weborys is a modern digital studio designing and developing high-quality websites, web applications, and digital experiences for ambitious brands.';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSeo(opts: SeoOptions) {
  useEffect(() => {
    const title = opts.title ? `${opts.title} — Weborys` : DEFAULT_TITLE;
    const desc = opts.description || DEFAULT_DESC;
    const canonical = opts.canonicalPath ? `${SITE_URL}${opts.canonicalPath}` : SITE_URL;
    const ogImage = opts.ogImage || `${SITE_URL}/og-image.png`;

    document.title = title;
    setMeta('name', 'description', desc);
    setLink('canonical', canonical);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', opts.ogType || 'website');
    setMeta('property', 'og:image', ogImage);

    // Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', ogImage);

    // Robots
    setMeta('name', 'robots', opts.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // Structured data — replace any existing dynamic LD+JSON block.
    const existing = document.head.querySelector('script[data-ld-dynamic]');
    if (existing) existing.remove();
    if (opts.structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-ld-dynamic', 'true');
      script.textContent = JSON.stringify(opts.structuredData);
      document.head.appendChild(script);
    }
  }, [opts.title, opts.description, opts.canonicalPath, opts.ogType, opts.ogImage, opts.noIndex, opts.structuredData]);
}

export { SITE_URL };
