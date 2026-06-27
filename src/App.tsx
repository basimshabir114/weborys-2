import { RouterProvider, useRouter, matchRoute } from './lib/router';
import { AuthProvider, useAuth } from './lib/auth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor, ScrollProgress } from './components/Cursor';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { PricingPage } from './pages/PricingPage';
import { PrivacyPage, TermsPage, NotFoundPage } from './pages/LegalPages';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminRegisterPage } from './pages/admin/AdminRegisterPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { LiveChat } from './components/LiveChat';
import { CookieConsent } from './components/CookieConsent';
import { Loader2 } from 'lucide-react';

function Routes() {
  const { path } = useRouter();
  const { session, loading } = useAuth();

  // Admin routes — gated by auth.
  if (path === '/admin/register') return <AdminRegisterPage />;
  if (path === '/admin') {
    if (loading) return <FullScreenLoader />;
    if (!session) return <AdminLoginPage />;
    return <AdminDashboard />;
  }

  // Public routes
  let page: React.ReactNode;
  let params: Record<string, string> | null = null;

  if (path === '/') page = <HomePage />;
  else if (path === '/about') page = <AboutPage />;
  else if (path === '/services') page = <ServicesPage />;
  else if (path === '/portfolio') page = <PortfolioPage />;
  else if ((params = matchRoute('/portfolio/:slug', path))) page = <ProjectDetailPage slug={params.slug} />;
  else if (path === '/blog') page = <BlogPage />;
  else if ((params = matchRoute('/blog/:slug', path))) page = <BlogPostPage slug={params.slug} />;
  else if (path === '/contact') page = <ContactPage />;
  else if (path === '/pricing') page = <PricingPage />;
  else if (path === '/privacy') page = <PrivacyPage />;
  else if (path === '/terms') page = <TermsPage />;
  else page = <NotFoundPage />;

  return (
    <>
      <Navbar />
      {page}
      <Footer />
    </>
  );
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-cosmic-400" />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <ScrollProgress />
        <CustomCursor />
        <Routes />
        <LiveChat />
        <CookieConsent />
      </AuthProvider>
    </RouterProvider>
  );
}
