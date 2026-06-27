import { useEffect, useState } from 'react';
import { LayoutDashboard, FolderKanban, FileText, Inbox, LogOut, ExternalLink, Settings, BarChart3, MessageSquare, Users, Palette } from 'lucide-react';
import { useSeo } from '../../lib/seo';
import { useAuth } from '../../lib/auth';
import { useRouter } from '../../lib/router';
import { cx } from '../../lib/utils';
import { adminFetchProjects, adminFetchPosts } from '../../lib/data';
import { adminFetchLeads } from '../../lib/leads';
import { ProjectsPanel } from './ProjectsPanel';
import { BlogPanel } from './BlogPanel';
import { LeadsPanel } from './LeadsPanel';
import { SettingsPanel } from './SettingsPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import { TestimonialsPanel } from './TestimonialsPanel';

type Tab = 'overview' | 'analytics' | 'projects' | 'blog' | 'leads' | 'testimonials' | 'settings';

export function AdminDashboard() {
  useSeo({ title: 'Dashboard', noIndex: true });
  const { user, signOut } = useAuth();
  const { navigate } = useRouter();
  const [tab, setTab] = useState<Tab>('overview');

  const NAV: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'projects', label: 'Projects', icon: FolderKanban },
    { key: 'blog', label: 'Blog Posts', icon: FileText },
    { key: 'leads', label: 'Leads', icon: Inbox },
    { key: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <main className="min-h-screen pt-24">
      <div className="container-max container-px">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-white/[0.06] bg-ink-900/40 p-5">
              <div className="px-2 pb-4">
                <p className="text-xs text-slate-500">Signed in as</p>
                <p className="mt-1 truncate text-sm font-medium text-white">
                  {user?.email ?? 'admin'}
                </p>
              </div>
              <nav className="space-y-1">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setTab(item.key)}
                      className={cx(
                        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                        tab === item.key
                          ? 'bg-cosmic-400/10 text-cosmic-300 ring-1 ring-cosmic-400/20'
                          : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
              <div className="mt-4 space-y-1 border-t border-white/[0.06] pt-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Site
                </button>
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-error-500/10 hover:text-error-400"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {tab === 'overview' && <OverviewPanel onNavigate={setTab} />}
            {tab === 'analytics' && <AnalyticsPanel />}
            {tab === 'projects' && <ProjectsPanel />}
            {tab === 'blog' && <BlogPanel />}
            {tab === 'leads' && <LeadsPanel />}
            {tab === 'testimonials' && <TestimonialsPanel />}
            {tab === 'settings' && <SettingsPanel />}
          </div>
        </div>
      </div>
    </main>
  );
}

function OverviewPanel({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const [stats, setStats] = useState({ projects: 0, posts: 0, leads: 0, newLeads: 0, testimonials: 0 });

  useEffect(() => {
    (async () => {
      const [projects, posts, leads] = await Promise.all([
        adminFetchProjects().catch(() => []),
        adminFetchPosts().catch(() => []),
        adminFetchLeads().catch(() => []),
      ]);
      const testimonials = localStorage.getItem('weborys_testimonials');
      setStats({
        projects: projects.length,
        posts: posts.length,
        leads: leads.length,
        newLeads: leads.filter((l) => l.status === 'new').length,
        testimonials: testimonials ? JSON.parse(testimonials).length : 3,
      });
    })();
  }, []);

  const cards = [
    { label: 'Total Projects', value: stats.projects, tab: 'projects' as Tab, color: 'text-cosmic-300', icon: FolderKanban },
    { label: 'Blog Posts', value: stats.posts, tab: 'blog' as Tab, color: 'text-cosmic-300', icon: FileText },
    { label: 'Total Leads', value: stats.leads, tab: 'leads' as Tab, color: 'text-cosmic-300', icon: Inbox },
    { label: 'New Leads', value: stats.newLeads, tab: 'leads' as Tab, color: 'text-gold-400', icon: Inbox },
    { label: 'Testimonials', value: stats.testimonials, tab: 'testimonials' as Tab, color: 'text-success-400', icon: MessageSquare },
    { label: 'Page Views', value: '24K', tab: 'analytics' as Tab, color: 'text-cosmic-300', icon: BarChart3 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Overview</h1>
      <p className="mt-2 text-sm text-slate-400">A snapshot of your studio's activity.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.label}
              onClick={() => onNavigate(c.tab)}
              className="card card-hover group p-6 text-left"
            >
              <div className="flex items-center justify-between">
                <div className={cx('font-display text-3xl font-semibold', c.color)}>{c.value}</div>
                <Icon className="h-5 w-5 text-slate-600 transition-colors group-hover:text-cosmic-400" />
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-wider text-slate-500">{c.label}</div>
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={() => onNavigate('projects')} className="btn-ghost">
            <FolderKanban className="h-4 w-4" />
            New Project
          </button>
          <button onClick={() => onNavigate('blog')} className="btn-ghost">
            <FileText className="h-4 w-4" />
            New Blog Post
          </button>
          <button onClick={() => onNavigate('testimonials')} className="btn-ghost">
            <MessageSquare className="h-4 w-4" />
            Add Testimonial
          </button>
          <button onClick={() => onNavigate('settings')} className="btn-ghost">
            <Settings className="h-4 w-4" />
            Site Settings
          </button>
        </div>
      </div>
    </div>
  );
}
