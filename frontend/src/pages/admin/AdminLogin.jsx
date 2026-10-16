import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Loader2, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { adminLogin } from '../../services/api';
import { Logo } from '../../components/Logo';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('INOVIQ_admin_token');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your administrator email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await adminLogin({ email, password });
      if (res.success) {
        const from = location.state?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(res.message || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Authentication failed. Please verify your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@INOVIQglobal.com');
    setPassword('INOVIQAdmin@2026');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Logo variant="dark" className="justify-center mb-6" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
          Administrator Portal
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#B3B3B3]">
          Sign in to access inquiry management, analytics, and content controls.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-[#171717] border border-[#3A3018] rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#B3B3B3] uppercase tracking-wider mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@INOVIQglobal.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border border-[#3A3018] text-white placeholder-[#888888] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#B3B3B3] uppercase tracking-wider mb-2">
                Master Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border border-[#3A3018] text-white placeholder-[#888888] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In To Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-8 pt-6 border-t border-[#3A3018] text-center">
            <div className="p-4 rounded-2xl bg-[#111111] border border-[#3A3018] text-left mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Initial Admin Credentials</span>
                </span>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-[11px] font-bold text-[#D4AF37] hover:text-[#F5E6B3] underline"
                >
                  Auto-fill
                </button>
              </div>
              <div className="text-[11px] font-mono text-[#B3B3B3] space-y-0.5">
                <div>Email: <span className="text-white">admin@INOVIQglobal.com</span></div>
                <div>Pass: <span className="text-white">INOVIQAdmin@2026</span></div>
              </div>
            </div>

            <Link to="/" className="text-xs text-[#888888] hover:text-[#D4AF37] transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
