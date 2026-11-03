import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, LogIn, ShieldCheck, User } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { SITE } from '@/lib/site';
import { useSeo } from '@/lib/seo';
import { Logo } from '@/components/illustrations/Logo';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useSeo({ title: 'Admin Login', description: 'Authorized Chattogram Trust staff login.', path: '/admin/login' });

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Small delay for UX feedback
    window.setTimeout(() => {
      const res = login(username, password);
      setLoading(false);
      if (res.ok) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(res.error ?? 'Login failed.');
      }
    }, 450);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base px-4 py-12">
      <div className="hero-grid absolute inset-0" />
      <div className="orb -left-24 top-0 h-96 w-96 bg-electric/30" />
      <div className="orb -right-24 bottom-0 h-96 w-96 bg-glow/25" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-glow">
          <ArrowLeft size={14} /> Back to website
        </Link>

        <div className="glass-strong overflow-hidden rounded-2xl shadow-glow">
          <div className="border-b border-line bg-surface2 p-6 text-center">
            <Logo size={56} className="mx-auto mb-3" />
            <h1 className="text-xl font-extrabold text-ink">Admin Access Portal</h1>
            <p className="mt-1 text-xs text-muted">{SITE.shortName} — Authorized Staff Only</p>
          </div>

          <form onSubmit={submit} className="space-y-4 p-6 sm:p-8">
            <div>
              <label className="label" htmlFor="admin-user">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="admin-user"
                  className="input !pl-10"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="admin-pass">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="admin-pass"
                  type={show ? 'text' : 'password'}
                  className="input !pl-10 !pr-10"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-glow"
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5">
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <LogIn size={17} />
              )}
              {loading ? 'Signing in…' : 'Sign In to Dashboard'}
            </button>

            <div className="flex items-start gap-2 rounded-xl border border-line bg-surface2/50 p-3.5 text-xs leading-relaxed text-muted">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-glow" />
              <span>
                This area is restricted to authorized Chattogram Trust instructors and administrators. All sessions
                expire after 8 hours.
              </span>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted">
          {SITE.copyright}
        </p>
      </div>
    </div>
  );
}
