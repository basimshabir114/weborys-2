import { useSeo } from '../lib/seo';
import { Reveal } from '../components/ui';

export function PrivacyPage() {
  useSeo({
    title: 'Privacy Policy',
    description: 'How Weborys collects, uses, and protects your personal information.',
    canonicalPath: '/privacy',
    noIndex: false,
  });

  return (
    <main className="pt-28">
      <section className="container-max container-px py-12">
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-6 bg-cosmic-400/60" />
            Legal
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="prose-weborys mt-12 max-w-3xl">
            <p>Weborys ("we", "us", or "our") respects your privacy. This policy explains what information we collect, how we use it, and the choices you have.</p>

            <h2>Information We Collect</h2>
            <p>We collect information you provide directly when you fill out our contact, quote, or project inquiry forms. This may include your name, email address, phone number, company name, project type, budget, and project details.</p>
            <p>We also collect limited technical data automatically, such as your browser type and pages visited, to improve our website performance.</p>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To respond to your inquiries and provide the services you request.</li>
              <li>To send you relevant communications about your project.</li>
              <li>To improve our website, services, and user experience.</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We do not sell, rent, or trade your personal information. We may share data with trusted third-party service providers (such as email delivery and analytics tools) who help us operate our business, under strict confidentiality obligations.</p>

            <h2>Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2>Data Retention</h2>
            <p>We retain your information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>

            <h2>Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at b53595205@gmail.com.</p>

            <h2>Cookies</h2>
            <p>Our website may use essential cookies to function properly. We do not use cookies for intrusive tracking or advertising.</p>

            <h2>Changes to This Policy</h2>
            <p>We may update this policy from time to time. Changes will be posted on this page with an updated revision date.</p>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at b53595205@gmail.com or +91 9149960912.</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export function TermsPage() {
  useSeo({
    title: 'Terms of Service',
    description: 'The terms and conditions governing the use of the Weborys website and services.',
    canonicalPath: '/terms',
  });

  return (
    <main className="pt-28">
      <section className="container-max container-px py-12">
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-6 bg-cosmic-400/60" />
            Legal
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="prose-weborys mt-12 max-w-3xl">
            <p>These Terms of Service ("Terms") govern your use of the Weborys website and services. By accessing or using our website, you agree to these Terms.</p>

            <h2>Use of Our Website</h2>
            <p>You may use our website for lawful purposes only. You agree not to use the site in any way that could damage, disable, or impair the service, or interfere with another user's use.</p>

            <h2>Intellectual Property</h2>
            <p>All content on this website — including text, graphics, logos, and design — is the property of Weborys or its licensors and is protected by intellectual property laws. You may not reproduce or distribute our content without written permission.</p>

            <h2>Services</h2>
            <p>Specific services are governed by separate agreements tailored to each engagement. These Terms cover general website use only and do not constitute a service contract.</p>

            <h2>Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the content or practices of those sites.</p>

            <h2>Disclaimer of Warranties</h2>
            <p>Our website is provided "as is" without warranties of any kind, express or implied. We do not guarantee the site will be uninterrupted or error-free.</p>

            <h2>Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Weborys shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website.</p>

            <h2>Indemnification</h2>
            <p>You agree to indemnify and hold Weborys harmless from any claims arising out of your use of the website or violation of these Terms.</p>

            <h2>Changes to These Terms</h2>
            <p>We may revise these Terms at any time. Continued use of the website after changes constitutes acceptance of the updated Terms.</p>

            <h2>Contact</h2>
            <p>For questions about these Terms, contact us at b53595205@gmail.com or +91 9149960912.</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export function NotFoundPage() {
  useSeo({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    noIndex: true,
  });

  const goHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <main className="pt-28">
      <section className="container-max container-px py-24 text-center">
        <div className="mx-auto max-w-lg">
          <p className="font-display text-[8rem] font-bold leading-none text-gradient-cosmic sm:text-[12rem]">
            404
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Page not found</h1>
          <p className="mt-4 text-slate-400">
            The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.
          </p>
          <button onClick={goHome} className="btn-primary mt-8">
            Back to Home
          </button>
        </div>
      </section>
    </main>
  );
}
