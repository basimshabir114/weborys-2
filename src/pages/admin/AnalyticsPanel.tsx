import { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Eye, Clock, MousePointer, Globe, Smartphone, Monitor, Tablet } from 'lucide-react';
import { useSeo } from '../../lib/seo';
import { cx } from '../../lib/utils';

const STATS = [
  { label: 'Page Views', value: '24,589', change: '+12.5%', trend: 'up', icon: Eye },
  { label: 'Unique Visitors', value: '8,432', change: '+8.2%', trend: 'up', icon: Users },
  { label: 'Avg. Session', value: '3m 42s', change: '+2.1%', trend: 'up', icon: Clock },
  { label: 'Bounce Rate', value: '32.4%', change: '-5.3%', trend: 'down', icon: MousePointer },
];

const TRAFFIC_SOURCES = [
  { source: 'Direct', visits: 4231, percentage: 45 },
  { source: 'Google', visits: 2891, percentage: 30 },
  { source: 'Social Media', visits: 1245, percentage: 13 },
  { source: 'Referral', visits: 756, percentage: 8 },
  { source: 'Email', visits: 466, percentage: 4 },
];

const TOP_PAGES = [
  { path: '/', views: 8542, title: 'Home' },
  { path: '/portfolio', views: 4231, title: 'Portfolio' },
  { path: '/services', views: 3156, title: 'Services' },
  { path: '/about', views: 2105, title: 'About' },
  { path: '/contact', views: 1892, title: 'Contact' },
  { path: '/blog', views: 1563, title: 'Blog' },
];

const DEVICES = [
  { device: 'Desktop', icon: Monitor, percentage: 52, color: 'bg-cosmic-400' },
  { device: 'Mobile', icon: Smartphone, percentage: 38, color: 'bg-gold-400' },
  { device: 'Tablet', icon: Tablet, percentage: 10, color: 'bg-slate-400' },
];

const COUNTRIES = [
  { country: 'India', visits: 5234, percentage: 42 },
  { country: 'United States', visits: 2156, percentage: 18 },
  { country: 'United Kingdom', visits: 1245, percentage: 10 },
  { country: 'UAE', visits: 892, percentage: 7 },
  { country: 'Canada', visits: 654, percentage: 5 },
];

const ACTIVITY = [
  { action: 'New lead from contact form', user: 'someone@email.com', time: '2 min ago', type: 'lead' },
  { action: 'Blog post published', user: 'admin', time: '1 hour ago', type: 'blog' },
  { action: 'Project updated: Eclipse SMP', user: 'admin', time: '3 hours ago', type: 'project' },
  { action: 'New lead from contact form', user: 'client@company.com', time: '5 hours ago', type: 'lead' },
  { action: 'Settings updated', user: 'admin', time: '1 day ago', type: 'settings' },
  { action: 'Project added: Glacier Host', user: 'admin', time: '2 days ago', type: 'project' },
];

export function AnalyticsPanel() {
  useSeo({ title: 'Analytics', noIndex: true });
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Analytics</h1>
          <p className="mt-2 text-sm text-slate-400">Track your site's performance and visitor behavior.</p>
        </div>
        <div className="flex gap-1 rounded-xl border border-white/[0.06] bg-ink-900/40 p-1">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cx(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                period === p
                  ? 'bg-cosmic-400/20 text-cosmic-300'
                  : 'text-slate-500 hover:text-white'
              )}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={stat.label} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cosmic-400/10">
                  <Icon className="h-5 w-5 text-cosmic-300" />
                </div>
                <span className={cx(
                  'flex items-center gap-1 text-xs font-medium',
                  stat.trend === 'up' ? 'text-success-400' : 'text-error-400'
                )}>
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4 font-display text-2xl font-semibold text-white">{stat.value}</div>
              <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {/* Traffic Sources */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
          <div className="mt-6 space-y-4">
            {TRAFFIC_SOURCES.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{source.source}</span>
                  <span className="text-slate-500">{source.visits.toLocaleString()}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cosmic-400 to-cosmic-600"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white">Top Pages</h3>
          <div className="mt-6 space-y-3">
            {TOP_PAGES.map((page, i) => (
              <div key={page.path} className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-ink-900/40 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-600">#{i + 1}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{page.title}</div>
                    <div className="text-2xs text-slate-500">{page.path}</div>
                  </div>
                </div>
                <span className="text-sm text-cosmic-300">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Devices & Countries */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {/* Devices */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white">Devices</h3>
          <div className="mt-6 flex items-center justify-center gap-8">
            {DEVICES.map((device) => {
              const Icon = device.icon;
              return (
                <div key={device.device} className="text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-800">
                    <Icon className="h-7 w-7 text-slate-400" />
                    <svg className="absolute inset-0 h-16 w-16 -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-ink-700"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${device.percentage * 1.76} 176`}
                        className={device.color.replace('bg-', 'text-')}
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-white">{device.percentage}%</div>
                  <div className="text-xs text-slate-500">{device.device}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Countries */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white">Top Countries</h3>
          <div className="mt-6 space-y-3">
            {COUNTRIES.map((country) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-300">{country.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">{country.visits.toLocaleString()}</span>
                  <span className="w-12 text-right text-xs text-cosmic-300">{country.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <div className="mt-4 card divide-y divide-white/[0.04] overflow-hidden">
          {ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div className={cx(
                  'h-2 w-2 rounded-full',
                  item.type === 'lead' && 'bg-gold-400',
                  item.type === 'blog' && 'bg-success-400',
                  item.type === 'project' && 'bg-cosmic-400',
                  item.type === 'settings' && 'bg-slate-400'
                )} />
                <div>
                  <div className="text-sm text-white">{item.action}</div>
                  <div className="text-2xs text-slate-500">by {item.user}</div>
                </div>
              </div>
              <span className="text-xs text-slate-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
