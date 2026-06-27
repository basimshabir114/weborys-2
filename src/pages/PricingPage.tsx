import { Check, X, ArrowRight, Sparkles, Zap, Crown, HelpCircle } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { useRouter } from '../lib/router';
import { Reveal, RevealStagger, SectionHeading, CosmicOrb, Badge } from '../components/ui';
import { FooterCTA } from '../components/Footer';

const TIERS = [
  {
    name: 'Starter',
    price: '₹9,999',
    period: 'one-time',
    description: 'Perfect for small businesses and personal brands getting started online.',
    icon: Sparkles,
    popular: false,
    features: [
      { text: 'Up to 5 pages', included: true },
      { text: 'Responsive design', included: true },
      { text: 'Contact form', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: 'Mobile optimized', included: true },
      { text: '1 revision round', included: true },
      { text: '7 day delivery', included: true },
      { text: 'Free hosting setup', included: true },
      { text: 'E-commerce', included: false },
      { text: 'Custom animations', included: false },
    ],
  },
  {
    name: 'Professional',
    price: '₹24,999',
    period: 'one-time',
    description: 'Ideal for growing businesses that need more features and flexibility.',
    icon: Zap,
    popular: true,
    features: [
      { text: 'Up to 12 pages', included: true },
      { text: 'Responsive design', included: true },
      { text: 'Advanced contact forms', included: true },
      { text: 'Full SEO optimization', included: true },
      { text: 'Mobile optimized', included: true },
      { text: '3 revision rounds', included: true },
      { text: '14 day delivery', included: true },
      { text: 'Custom animations', included: true },
      { text: 'Blog integration', included: true },
      { text: 'E-commerce (up to 20 products)', included: false },
    ],
  },
  {
    name: 'Enterprise',
    price: '₹49,999',
    period: 'one-time',
    description: 'For established brands that demand the highest quality and full customization.',
    icon: Crown,
    popular: false,
    features: [
      { text: 'Unlimited pages', included: true },
      { text: 'Premium design system', included: true },
      { text: 'Custom functionality', included: true },
      { text: 'Advanced SEO & Analytics', included: true },
      { text: 'Performance optimization', included: true },
      { text: 'Unlimited revisions', included: true },
      { text: 'Priority delivery', included: true },
      { text: 'Full e-commerce', included: true },
      { text: 'Custom animations & interactions', included: true },
      { text: 'Admin dashboard + CMS', included: true },
    ],
  },
];

const FAQS = [
  {
    q: 'What is included in the price?',
    a: 'All prices include design, development, basic SEO setup, and deployment. We also provide 30 days of free support after launch for any minor adjustments.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Starter projects are delivered in 7 days, Professional in 14 days, and Enterprise projects in 2-3 weeks. We provide detailed timelines during our initial consultation.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes! We work with a 50% deposit to begin, with the remaining 50% due upon project completion. We accept UPI, bank transfer, and all major payment methods.',
  },
  {
    q: 'What if I need changes after the project is complete?',
    a: 'We offer 30 days of complimentary minor adjustments after launch. For ongoing support, we offer monthly maintenance starting at just ₹1,499/month.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely! We regularly help businesses modernize their existing web presence. We will analyze your current site and recommend the best approach.',
  },
  {
    q: 'Do you provide hosting and domain services?',
    a: 'Yes! We provide free hosting setup guidance and can help you register your domain. Basic hosting costs start from ₹99/month.',
  },
];

const ADDONS = [
  { name: 'Logo Design', price: '₹2,499', desc: 'Professional logo with multiple revisions' },
  { name: 'Content Writing', price: '₹999/page', desc: 'Professional copywriting for your pages' },
  { name: 'Monthly Maintenance', price: '₹1,499/mo', desc: 'Updates, backups, security, and support' },
  { name: 'SEO Package', price: '₹2,999/mo', desc: 'Ongoing SEO optimization and reporting' },
  { name: 'Extra Page', price: '₹799', desc: 'Additional page beyond package limit' },
  { name: 'E-Commerce Setup', price: '₹4,999', desc: 'Add online store to any package' },
];

export function PricingPage() {
  useSeo({
    title: 'Pricing',
    description: 'Transparent pricing for premium web design and development services. Find the perfect package for your business needs.',
    canonicalPath: '/pricing',
  });

  const { navigate } = useRouter();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20">
        <CosmicOrb className="left-1/4 top-0 h-[400px] w-[600px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-faint mask-fade-b opacity-30" />
        <div className="container-max container-px relative">
          <Reveal>
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse-soft" />
              Transparent Pricing
            </Badge>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-white sm:text-5xl lg:text-6xl">
              Premium quality at{' '}
              <span className="text-gradient-cosmic">honest prices</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-400">
              No hidden fees. No surprises. Choose a package that fits your needs, or let us create a custom solution for your unique requirements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container-max container-px py-12">
        <RevealStagger className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`card relative overflow-hidden p-8 ${
                  tier.popular ? 'ring-2 ring-cosmic-400/50' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-cosmic-400 px-3 py-1 text-xs font-semibold text-ink-950">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20">
                  <Icon className="h-5 w-5 text-cosmic-300" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{tier.description}</p>
                <div className="mt-6">
                  <span className="font-display text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm text-slate-500"> {tier.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {f.included ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-400" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                      )}
                      <span className={f.included ? 'text-sm text-slate-300' : 'text-sm text-slate-600'}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/contact')}
                  className={`mt-8 w-full ${tier.popular ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </RevealStagger>
      </section>

      {/* Add-ons */}
      <section className="container-max container-px py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Optional add-ons"
            title="Enhance your package"
            description="Additional services to complement your website project."
          />
        </Reveal>
        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map((addon) => (
            <div key={addon.name} className="card card-hover group p-6">
              <h3 className="text-base font-semibold text-white">{addon.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{addon.desc}</p>
              <div className="mt-4 text-lg font-semibold text-cosmic-300">{addon.price}</div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* Why Choose Us */}
      <section className="container-max container-px py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why Weborys"
            title="Premium quality, affordable prices"
            description="We believe every business deserves a stunning online presence without breaking the bank."
          />
        </Reveal>
        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'No Hidden Fees', desc: 'Transparent pricing with no surprises. What you see is what you pay.' },
            { title: 'Fast Delivery', desc: 'Get your website live in days, not months. We respect your time.' },
            { title: '100% Custom', desc: 'Every site is built from scratch. No templates or shortcuts.' },
            { title: 'Free Support', desc: '30 days of free support after launch for peace of mind.' },
          ].map((item) => (
            <div key={item.title} className="card p-6 text-center">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* FAQ */}
      <section className="container-max container-px py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Common questions"
            description="Quick answers to help you make an informed decision."
          />
        </Reveal>
        <RevealStagger className="mt-12 mx-auto max-w-3xl space-y-4">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/[0.06] bg-ink-900/40 transition-all open:bg-ink-850/50"
            >
              <summary className="flex cursor-pointer items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <HelpCircle className="h-5 w-5 text-cosmic-400" />
                  <span className="text-base font-medium text-white">{faq.q}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-6 text-sm leading-relaxed text-slate-400">
                {faq.a}
              </div>
            </details>
          ))}
        </RevealStagger>
      </section>

      <FooterCTA />
    </>
  );
}
