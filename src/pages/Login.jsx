import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import useStore from '../store/useStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { login: storeLogin, updateUser } = useStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Logging you in...');

    const res = await signIn(email, password);

    if (res.success) {
      toast.success('Successfully logged in!', { id: toastId });

      // Update local store profile values
      updateUser({
        name: res.data.user.email.split('@')[0].replace(/^\w/, c => c.toUpperCase()) || 'Authenticated User',
        email: res.data.user.email,
      });
      storeLogin(); // Sync Zustand state

      navigate('/dashboard');
    } else {
      setErrorMessage(res.error.message || 'Login failed. Please check your credentials.');
      toast.error(res.error.message || 'Authentication failed', { id: toastId });
    }
    setIsSubmitting(false);
  };

  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@sellersync.com');
      setPassword('admin123');
    } else {
      setEmail('test@sellersync.com');
      setPassword('test1234');
    }
    toast.info('Demo credentials loaded');
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-950 text-white overflow-hidden relative font-sans">

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse duration-[8000ms] delay-1000" />

      {/* LEFT COLUMN: Premium visual showcase */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-r border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]" />

        {/* Brand Logo header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <span className="text-2xl font-black tracking-tight">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              StockSync
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold">Inventory Hub</span>
          </div>
        </div>

        {/* Middle Visual Section */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              Real-time multi-channel sync
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight leading-[1.1] text-white">
              Consolidate your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">e-commerce channels</span> in one place.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Automate stock deduction, update cross-platform listings instantly, and manage offline orders with state-of-the-art accuracy.
            </p>
          </motion.div>

          {/* Floating Mock Metrics Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sync Status</span>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                Live Syncing
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-slate-400 text-xs font-medium">Total Sync Operations</div>
                <div className="text-2xl font-bold mt-1 text-white">86,420</div>
                <div className="text-emerald-400 text-[10px] font-semibold mt-1">99.9% Success rate</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-slate-400 text-xs font-medium">Integrated Channels</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">AMZ</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">FK</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">MSH</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
          <p>© 2026 StockSync Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Login Form Panel */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 py-12 relative z-10">

        {/* Mobile Header Logo */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
            S
          </div>
          <span className="font-bold text-lg tracking-tight text-white">StockSync</span>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="text-slate-400 text-sm">
              Please enter your credentials to access your dashboard
            </p>
          </div>

          {/* Supabase Error Alert Banner */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300"
            >
              <AlertTriangle className="h-4.5 w-4.5 mt-0.5 text-rose-400 flex-shrink-0" />
              <p className="leading-normal">{errorMessage}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@sellersync.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                  Password
                </label>
                <span
                  onClick={() => toast.info('Password reset coming soon!')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors font-medium"
                >
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4.5 w-4.5 rounded-md border-slate-800 bg-slate-900 text-indigo-600 focus:ring-indigo-600/30 focus:ring-offset-0 transition-colors"
              />
              <label htmlFor="remember-me" className="ml-2.5 text-xs text-slate-400 font-medium">
                Keep me signed in on this device
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="h-4.5 w-4.5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Quick-Fill Demo Badges */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-900 text-slate-400 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
              <ShieldCheck className="h-4 w-4" />
              Demo Fast-Access Credentials
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer"
              >
                🔑 Admin Dashboard
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('test')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer"
              >
                🔑 Test Operator
              </button>
            </div>
          </div>

          {/* Switch to Signup link */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <Link
                to="/signup"
                className="inline-flex items-center gap-0.5 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Create an account
                <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
