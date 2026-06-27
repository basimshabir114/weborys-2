import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { Reveal, CosmicOrb, GoldOrb, Badge } from '../components/ui';
import { submitLead } from '../lib/leads';
import type { LeadType } from '../lib/types';
import { cx } from '../lib/utils';

const PROJECT_TYPES = [
  'Web Design', 'Web Development', 'UI/UX Design', 'Landing Page',
  'Portfolio Website', 'Business Website', 'E-Commerce Website',
  'Custom Web Application', 'Website Optimization', 'Other',
];

const BUDGETS = [
  'Under $1,000', '$1,000 – $5,000', '$5,000 – $10,000',
  '$10,000 – $25,000', '$25,000+', 'Not sure yet',
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactPage() {
  useSeo({
    title: 'Contact',
    description:
      'Get in touch with Weborys to start your next web design, development, or digital experience project. Request a quote or send a message.',
    canonicalPath: '/contact',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Weborys',
      url: 'https://weborys.com/contact',
    },
  });

  const [activeForm, setActiveForm] = useState<LeadType>('inquiry');

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <CosmicOrb className="left-1/3 top-0 h-[350px] w-[550px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-faint mask-fade-b opacity-30" />
        <div className="container-max container-px relative">
          <Reveal>
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-cosmic-400 animate-pulse-soft" />
              Contact
            </Badge>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-white sm:text-5xl lg:text-6xl">
              Let's start something exceptional.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate-400 sm:text-xl">
              Tell us about your project and we will get back to you within one business day. Choose the form that fits, or just send us a message.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-max container-px py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Forms */}
          <div>
            {/* Form tabs */}
            <Reveal>
              <div className="flex flex-wrap gap-2 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-2 backdrop-blur-sm">
                {([
                  { key: 'inquiry', label: 'Project Inquiry' },
                  { key: 'quote', label: 'Quote Request' },
                  { key: 'contact', label: 'General Contact' },
                ] as { key: LeadType; label: string }[]).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveForm(tab.key)}
                    className={cx(
                      'flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300',
                      activeForm === tab.key
                        ? 'bg-cosmic-400 text-ink-950 shadow-glow'
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-6">
              {activeForm === 'inquiry' && <LeadForm type="inquiry" showAllFields />}
              {activeForm === 'quote' && <LeadForm type="quote" showAllFields />}
              {activeForm === 'contact' && <LeadForm type="contact" showAllFields={false} />}
            </div>
          </div>

          {/* Contact info sidebar */}
          <aside>
            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-ink-850/60 to-ink-900/40 p-7">
                <GoldOrb className="right-[-80px] top-[-40px] h-[200px] w-[250px] opacity-20" />
                <div className="relative">
                  <h2 className="text-2xs font-semibold uppercase tracking-ultra text-slate-500">
                    Contact Information
                  </h2>
                  <div className="mt-6 space-y-5">
                    <a href="mailto:b53595205@gmail.com" className="group flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20 transition-all group-hover:bg-cosmic-400/20 group-hover:shadow-glow">
                        <Mail className="h-4 w-4 text-cosmic-300" />
                      </span>
                      <span>
                        <span className="block text-xs text-slate-500">Email</span>
                        <span className="mt-0.5 block text-sm text-white transition-colors group-hover:text-cosmic-300">
                          b53595205@gmail.com
                        </span>
                      </span>
                    </a>
                    <a href="tel:+919149960912" className="group flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20 transition-all group-hover:bg-cosmic-400/20 group-hover:shadow-glow">
                        <Phone className="h-4 w-4 text-cosmic-300" />
                      </span>
                      <span>
                        <span className="block text-xs text-slate-500">Phone</span>
                        <span className="mt-0.5 block text-sm text-white transition-colors group-hover:text-cosmic-300">
                          +91 9149960912
                        </span>
                      </span>
                    </a>
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20">
                        <MapPin className="h-4 w-4 text-cosmic-300" />
                      </span>
                      <span>
                        <span className="block text-xs text-slate-500">Working hours</span>
                        <span className="mt-0.5 block text-sm text-white">Mon – Sat · 9am – 7pm IST</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-white/[0.06] pt-6">
                    <h3 className="text-2xs font-semibold uppercase tracking-ultra text-slate-500">
                      What happens next
                    </h3>
                    <ol className="mt-4 space-y-3">
                      {[
                        'We review your message within one business day.',
                        'A short discovery call to understand your goals.',
                        'A clear proposal with scope, timeline, and quote.',
                      ].map((step, i) => (
                        <li key={step} className="flex gap-3 text-sm text-slate-400">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-xs font-semibold text-cosmic-300 ring-1 ring-white/10">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

function LeadForm({ type, showAllFields }: { type: LeadType; showAllFields: boolean }) {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('submitting');
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await submitLead({
        type,
        full_name: String(fd.get('full_name') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || '') || null,
        company: String(fd.get('company') || '') || null,
        project_type: String(fd.get('project_type') || '') || null,
        budget: String(fd.get('budget') || '') || null,
        details: String(fd.get('details') || '') || null,
      });
      setState('success');
      form.reset();
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (state === 'success') {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-success-500/20 bg-gradient-to-br from-success-500/10 to-ink-900/40 p-10 text-center">
        <CosmicOrb className="left-1/2 top-[-50px] h-[200px] w-[300px] -translate-x-1/2 opacity-20" />
        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-500/15 ring-1 ring-success-500/30 animate-scale-in">
            <CheckCircle2 className="h-8 w-8 text-success-400" />
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-white">Message sent successfully</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
            Thank you for reaching out. We have received your message and will get back to you within one business day.
          </p>
          <button onClick={() => setState('idle')} className="btn-ghost mt-8 group">
            Send another message
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-white/[0.06] bg-ink-900/40 p-7 backdrop-blur-sm sm:p-8">
      {state === 'error' && errorMsg && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-error-500/20 bg-error-500/5 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" />
          <p className="text-sm text-error-400">{errorMsg}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="full_name">Full Name *</label>
          <input id="full_name" name="full_name" required className="input" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required className="input" placeholder="jane@company.com" />
        </div>
        <div>
          <label className="label" htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" className="input" placeholder="+91 90000 00000" />
        </div>
        {showAllFields && (
          <div>
            <label className="label" htmlFor="company">Company Name</label>
            <input id="company" name="company" className="input" placeholder="Acme Inc." />
          </div>
        )}
        {showAllFields && (
          <div>
            <label className="label" htmlFor="project_type">Project Type</label>
            <select id="project_type" name="project_type" className="input" defaultValue="">
              <option value="" disabled>Select a service</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
        {showAllFields && (
          <div>
            <label className="label" htmlFor="budget">Budget</label>
            <select id="budget" name="budget" className="input" defaultValue="">
              <option value="" disabled>Select a range</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-5">
        <label className="label" htmlFor="details">
          {type === 'contact' ? 'Message' : 'Project Details'}
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          className="input resize-none"
          placeholder={type === 'contact' ? 'How can we help?' : 'Tell us about your project, goals, and timeline...'}
        />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="btn-primary btn-lg mt-6 w-full sm:w-auto group"
      >
        {state === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {type === 'contact' ? 'Send Message' : 'Submit Request'}
          </>
        )}
      </button>
    </form>
  );
}
