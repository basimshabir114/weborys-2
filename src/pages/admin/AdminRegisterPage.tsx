import { useState, type FormEvent } from 'react';
import { Lock, Mail, Loader2, ArrowLeft, AlertCircle, User, Shield, CheckCircle } from 'lucide-react';
import { useSeo } from '../../lib/seo';
import { useRouter } from '../../lib/router';
import { supabase } from '../../lib/supabase';
import { CosmicOrb } from '../../components/ui';

const INVITE_CODES = ['WEBORYS2024', 'BASIM-ADMIN', 'STUDIO-INVITE'];

export function AdminRegisterPage() {
  useSeo({ title: 'Admin Registration', noIndex: true });
  const { navigate } = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!INVITE_CODES.includes(inviteCode.toUpperCase())) {
      setError('Invalid invite code. Contact the studio for access.');
      return;
    }

    setLoading(true);
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-28">
      <CosmicOrb className="left-1/2 top-1/3 h-[400px] w-[500px] -translate-x-1/2 opacity-30" />
      <div className="relative w-full max-w-md">
        <button
          onClick={() => navigate('/admin/login')}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </button>

        <div className="rounded-3xl border border-white/[0.08] bg-ink-900/60 p-8 backdrop-blur-xl">
          {success ? (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-500/10">
                <CheckCircle className="h-7 w-7 text-success-400" />
              </div>
              <h1 className="mt-4 text-xl font-semibold text-white">Account Created!</h1>
              <p className="mt-2 text-sm text-slate-400">
                Check your email to confirm your account, then you can log in.
              </p>
              <button
                onClick={() => navigate('/admin/login')}
                className="btn-primary mt-6 w-full"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cosmic-400/10 ring-1 ring-cosmic-400/20">
                  <Shield className="h-5 w-5 text-cosmic-300" />
                </span>
                <div>
                  <h1 className="text-xl font-semibold text-white">Admin Registration</h1>
                  <p className="text-xs text-slate-500">Weborys Studio Dashboard</p>
                </div>
              </div>

              <p className="mt-4 rounded-xl border border-gold-400/20 bg-gold-400/5 p-3 text-xs text-gold-300">
                This page is restricted. You need an invite code to register as an admin.
              </p>

              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-error-500/20 bg-error-500/5 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" />
                  <p className="text-sm text-error-400">{error}</p>
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="label" htmlFor="invite">Invite Code</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="invite"
                      type="text"
                      required
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="input pl-10 uppercase"
                      placeholder="Enter invite code"
                    />
                  </div>
                </div>

                <div>
                  <label className="label" htmlFor="name">Full Name</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input pl-10"
                      placeholder="Your name"
                    />
                  </div>
                </div>

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
                      placeholder="Min. 8 characters"
                    />
                  </div>
                </div>

                <div>
                  <label className="label" htmlFor="confirm">Confirm Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="confirm"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input pl-10"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Admin Account'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
