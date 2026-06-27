import { useState, type FormEvent } from 'react';
import { Lock, Mail, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useSeo } from '../../lib/seo';
import { useAuth } from '../../lib/auth';
import { useRouter } from '../../lib/router';
import { CosmicOrb } from '../../components/ui';

export function AdminLoginPage() {
  useSeo({ title: 'Admin Login', noIndex: true });
  const { signIn } = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    }
    // On success, the AuthProvider updates session and the dashboard renders.
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-28">
      <CosmicOrb className="left-1/2 top-1/3 h-[400px] w-[500px] -translate-x-1/2 opacity-30" />
      <div className="relative w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </button>

        <div className="rounded-3xl border border-white/[0.08] bg-ink-900/60 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20">
              <Lock className="h-5 w-5 text-cosmic-300" />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-white">Admin Login</h1>
              <p className="text-xs text-slate-500">Weborys Studio Dashboard</p>
            </div>
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-error-500/20 bg-error-500/5 p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" />
              <p className="text-sm text-error-400">{error}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="admin@weborys.com"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Need admin access?{' '}
              <button
                onClick={() => navigate('/admin/register')}
                className="text-cosmic-400 transition-colors hover:text-cosmic-300"
              >
                Register with invite code
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
