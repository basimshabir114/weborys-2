import {
  Palette,
  Code2,
  PenTool,
  Rocket,
  Briefcase,
  Building2,
  ShoppingBag,
  Boxes,
  Smartphone,
  Gauge,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  benefits: string[];
  process: { step: string; detail: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: 'web-design',
    icon: Palette,
    title: 'Web Design',
    short: 'Visually striking, brand-aligned designs that captivate from the first scroll.',
    description:
      "We craft bespoke website designs that blend aesthetic sophistication with strategic intent. Every layout is built around your brand identity and your users' goals — resulting in interfaces that feel inevitable and look unmistakably premium.",
    benefits: [
      'Custom design systems tailored to your brand',
      'Conversion-focused layouts and visual hierarchy',
      'Accessible, readable typography and color systems',
      'Design handoff with developer-ready specifications',
    ],
    process: [
      { step: 'Discover', detail: 'We learn your brand, audience, and business objectives.' },
      { step: 'Concept', detail: 'Moodboards and direction explorations define the visual language.' },
      { step: 'Design', detail: 'High-fidelity mockups for every key page and state.' },
      { step: 'Refine', detail: 'Iterative feedback rounds polish every detail.' },
    ],
  },
  {
    slug: 'web-development',
    icon: Code2,
    title: 'Web Development',
    short: 'Fast, scalable, maintainable code built with modern engineering standards.',
    description:
      'Our development team turns designs into performant, accessible, and robust web experiences. We use modern frameworks and proven architectures so your site loads fast, ranks well, and stays easy to maintain as you grow.',
    benefits: [
      'Sub-second load times and excellent Core Web Vitals',
      'SEO-optimized, semantic, accessible markup',
      'Type-safe, well-structured, documented codebase',
      'Scalable architecture ready for future features',
    ],
    process: [
      { step: 'Architect', detail: 'We define the tech stack, data model, and project structure.' },
      { step: 'Build', detail: 'Component-driven development with continuous integration.' },
      { step: 'Optimize', detail: 'Performance, accessibility, and SEO pass before launch.' },
      { step: 'Launch', detail: 'Deployment, monitoring, and post-launch support.' },
    ],
  },
  {
    slug: 'ui-ux-design',
    icon: PenTool,
    title: 'UI/UX Design',
    short: 'Intuitive, research-backed interfaces that feel effortless to use.',
    description:
      'Great UX is invisible. We design user experiences grounded in research, validated through testing, and refined until every interaction feels natural. From information architecture to micro-interactions, we obsess over the details that make products feel premium.',
    benefits: [
      'User research and journey mapping',
      'Wireframes and interactive prototypes',
      'Usability testing and iteration',
      'Design systems and component libraries',
    ],
    process: [
      { step: 'Research', detail: 'Interviews, analytics, and competitive analysis.' },
      { step: 'Structure', detail: 'Information architecture and user flows.' },
      { step: 'Prototype', detail: 'Clickable prototypes for key journeys.' },
      { step: 'Validate', detail: 'Testing and refinement before build.' },
    ],
  },
  {
    slug: 'landing-pages',
    icon: Rocket,
    title: 'Landing Pages',
    short: 'High-converting landing pages engineered to turn visitors into customers.',
    description:
      'A landing page has one job: convert. We design and build focused, persuasive landing pages that load instantly, communicate clearly, and drive measurable results for campaigns, product launches, and lead generation.',
    benefits: [
      'Conversion-optimized copy and layout',
      'A/B-test ready variations',
      'Lightning-fast load for ad campaigns',
      'Analytics and conversion tracking setup',
    ],
    process: [
      { step: 'Define', detail: 'Goal, audience, and offer alignment.' },
      { step: 'Write', detail: 'Persuasive copy and clear calls to action.' },
      { step: 'Design', detail: 'Focused, distraction-free layout.' },
      { step: 'Launch', detail: 'Deploy with tracking and iterate on results.' },
    ],
  },
  {
    slug: 'portfolio-websites',
    icon: Briefcase,
    title: 'Portfolio Websites',
    short: "Showcase your work with a portfolio that's as impressive as what you create.",
    description:
      'For creatives, freelancers, and studios, a portfolio is your first impression. We build elegant, fast portfolio sites that put your work front and center, with smooth interactions and a structure that scales as your body of work grows.',
    benefits: [
      'Beautiful case study layouts',
      'Fast, image-optimized galleries',
      'Easy content management',
      'Contact and inquiry integration',
    ],
    process: [
      { step: 'Curate', detail: 'Select and structure your strongest work.' },
      { step: 'Design', detail: 'A layout that elevates your projects.' },
      { step: 'Build', detail: 'Optimized, responsive, and smooth.' },
      { step: 'Manage', detail: 'A simple workflow to add new work.' },
    ],
  },
  {
    slug: 'business-websites',
    icon: Building2,
    title: 'Business Websites',
    short: 'Professional websites that build trust and grow your business online.',
    description:
      "Your website is your digital storefront. We build professional, credible business websites that communicate your value, capture leads, and give customers confidence — backed by a structure that's easy to update as your business evolves.",
    benefits: [
      'Clear service and value presentation',
      'Lead capture and contact integration',
      'Professional, trustworthy aesthetic',
      'Easy content updates',
    ],
    process: [
      { step: 'Align', detail: 'Understand your business and positioning.' },
      { step: 'Structure', detail: 'Sitemap and content strategy.' },
      { step: 'Build', detail: 'Professional, fast, and reliable.' },
      { step: 'Support', detail: 'Ongoing updates and improvements.' },
    ],
  },
  {
    slug: 'ecommerce-websites',
    icon: ShoppingBag,
    title: 'E-Commerce Websites',
    short: 'Online stores designed to sell, with smooth checkout and secure payments.',
    description:
      'We build e-commerce experiences that make buying effortless. From product discovery to secure checkout, every step is optimized for conversion and trust — with the performance and reliability your revenue depends on.',
    benefits: [
      'Optimized product and category pages',
      'Frictionless, secure checkout',
      'Inventory and order management',
      'Payment and shipping integration',
    ],
    process: [
      { step: 'Strategy', detail: 'Catalog, pricing, and conversion strategy.' },
      { step: 'Design', detail: 'Shopping experience and checkout flow.' },
      { step: 'Build', detail: 'Secure, scalable store implementation.' },
      { step: 'Launch', detail: 'Payments, shipping, and go-live.' },
    ],
  },
  {
    slug: 'custom-web-applications',
    icon: Boxes,
    title: 'Custom Web Applications',
    short: 'Tailored web apps that solve complex business problems elegantly.',
    description:
      "When off-the-shelf software won't cut it, we build custom. From dashboards to internal tools to customer platforms, we engineer web applications that fit your exact workflow — secure, scalable, and built to last.",
    benefits: [
      'Bespoke architecture for your use case',
      'Secure authentication and role management',
      'Scalable, maintainable codebase',
      'Integration with your existing tools',
    ],
    process: [
      { step: 'Scope', detail: 'Requirements, user roles, and data modeling.' },
      { step: 'Architect', detail: 'System design and technology selection.' },
      { step: 'Build', detail: 'Iterative development with regular reviews.' },
      { step: 'Scale', detail: 'Deployment, monitoring, and evolution.' },
    ],
  },
  {
    slug: 'responsive-website-design',
    icon: Smartphone,
    title: 'Responsive Website Design',
    short: 'Flawless experiences across every device, from mobile to desktop.',
    description:
      'Your audience visits from anywhere. We design and build responsive websites that look and work beautifully on every screen size — with thoughtful touch targets, readable type, and layouts that adapt with grace.',
    benefits: [
      'Mobile-first, adaptive layouts',
      'Optimized touch and gesture interactions',
      'Consistent experience across breakpoints',
      'Excellent mobile performance',
    ],
    process: [
      { step: 'Audit', detail: 'Review current experience across devices.' },
      { step: 'Adapt', detail: 'Responsive design system and breakpoints.' },
      { step: 'Test', detail: 'Real-device testing across the spectrum.' },
      { step: 'Refine', detail: 'Polish interactions and performance.' },
    ],
  },
  {
    slug: 'website-optimization',
    icon: Gauge,
    title: 'Website Optimization',
    short: 'Make your existing site faster, more findable, and higher-converting.',
    description:
      "Already have a website that's underperforming? We audit, optimize, and elevate it — improving speed, search visibility, accessibility, and conversion rates so your existing investment works harder for you.",
    benefits: [
      'Performance and Core Web Vitals audit',
      'SEO and accessibility improvements',
      'Conversion rate optimization',
      'Ongoing monitoring and reporting',
    ],
    process: [
      { step: 'Audit', detail: 'Comprehensive performance, SEO, and UX review.' },
      { step: 'Prioritize', detail: 'High-impact improvements first.' },
      { step: 'Optimize', detail: 'Targeted fixes and enhancements.' },
      { step: 'Measure', detail: 'Before/after metrics and ongoing tuning.' },
    ],
  },
];
