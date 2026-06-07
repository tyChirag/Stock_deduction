import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  User, 
  Briefcase, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Check, 
  ArrowLeft,
  Sparkles,
  Zap,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAuth } from '../hooks/useAuth';
import useStore from '../store/useStore';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { login: storeLogin, updateUser } = useStore();

  // Simple Password Strength Calculator
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-transparent', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/3' };
    
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    if (hasNumbers && hasSpecial && password.length >= 8) {
      return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
    }
    return { label: 'Medium', color: 'bg-amber-500', width: 'w-2/3' };
  };

  const strength = getPasswordStrength();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !businessName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all details');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!agreeTerms) {
      toast.error('You must agree to the Terms of Service & Privacy Policy');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Creating your StockSync account...');

    const res = await signUp(email, password);

    if (res.success) {
      // Update local store profile values
      updateUser({
        name: fullName,
        email: email,
        businessName: businessName,
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669', '#3b82f6', '#f59e0b']
      });

      // Check if user is logged in automatically (no email confirmation needed)
      if (res.data.session) {
        storeLogin(); // Sync Zustand state
        toast.success('Registration successful! Welcome to StockSync.', { id: toastId });
        navigate('/dashboard');
      } else {
        toast.success('Registration successful! Please check your email to verify.', { id: toastId });
        navigate('/login');
      }
    } else {
      setErrorMessage(res.error.message || 'Registration failed.');
      toast.error(res.error.message || 'Registration failed', { id: toastId });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-white p-4 sm:p-6 md:p-12 relative overflow-hidden font-sans">
      
      {/* Dynamic Emerald Glowing Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse duration-[7000ms]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse duration-[9000ms] delay-500" />
      
      {/* Back button */}
      <Link 
        to="/login"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Link>

      {/* Main Wide Signup Container */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl"
      >
        
        {/* LEFT COLUMN: Features Checklist & Stepper */}
        <div className="md:col-span-5 p-8 sm:p-10 bg-gradient-to-b from-emerald-950/40 via-zinc-900/60 to-zinc-950 border-b md:border-b-0 md:border-r border-zinc-800/80 flex flex-col justify-between">
          
          <div className="space-y-8">
            {/* Header branding */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-bold shadow-lg shadow-emerald-500/20">
                <span className="text-xl font-black">S</span>
              </div>
              <div>
                <h3 className="font-bold tracking-tight text-white">StockSync</h3>
                <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Enterprise Mode</p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
                Your seller privileges:
              </h4>

              <ul className="space-y-4">
                {[
                  { title: "Real-time stock deduction", desc: "Instantly adjust units when platforms sell." },
                  { title: "Multi-channel sync integrations", desc: "Support for Amazon, Flipkart, Meesho, & Retail." },
                  { title: "Smart low-stock notification alerts", desc: "Never experience stockouts or duplicate listings." },
                  { title: "High speed OCR scan import", desc: "Extract item quantities from receipts/manifests." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Check className="h-3 w-3" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-slate-200">{item.title}</h5>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stepper Status Indicators */}
          <div className="pt-8 border-t border-zinc-800/40 space-y-3 hidden md:block">
            <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
              <span>Setup Timeline</span>
              <span className="text-emerald-400">Step 1 of 3</span>
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 flex-1 rounded bg-emerald-500" />
              <div className="h-1.5 flex-1 rounded bg-zinc-800" />
              <div className="h-1.5 flex-1 rounded bg-zinc-800" />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Full Registration Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Create your seller profile
              </h2>
              <p className="text-xs text-zinc-400">
                Setup your dashboard parameters to start managing channels
              </p>
            </div>

            {/* Error Alert Banner */}
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

            <form onSubmit={handleSignup} className="space-y-4">
              
              {/* Grid for Name & Business */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullname" className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <User className="h-4.5 w-4.5" />
                    </div>
                    <input
                      id="fullname"
                      type="text"
                      required
                      placeholder="Chirag Tyagi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label htmlFor="businessname" className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Business Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Briefcase className="h-4.5 w-4.5" />
                    </div>
                    <input
                      id="businessname"
                      type="text"
                      required
                      placeholder="Tyagi Enterprises"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="chirag@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-1.5">
                  <label htmlFor="password" className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label htmlFor="confirm-password" className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <ShieldCheck className="h-4.5 w-4.5" />
                    </div>
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-zinc-500 font-semibold">Password Strength:</span>
                    <span className={`font-bold ${
                      strength.label === 'Strong' ? 'text-emerald-400' :
                      strength.label === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                    }`}>{strength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                  </div>
                </div>
              )}

              {/* Agreement Checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 mt-0.5 rounded border-zinc-800 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/30 focus:ring-offset-0 transition-colors"
                />
                <label htmlFor="agree" className="text-[10px] text-zinc-400 leading-normal">
                  I agree to the <span className="text-emerald-400 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-emerald-400 hover:underline cursor-pointer">Privacy Policy</span>, and allow automated inventory sync configuration.
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 mt-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                    Registering Account...
                  </>
                ) : (
                  <>
                    <Zap className="h-4.5 w-4.5" />
                    Create Free Account
                  </>
                )}
              </button>
            </form>

            {/* Link to Login */}
            <div className="text-center pt-2 border-t border-zinc-900">
              <p className="text-xs text-zinc-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
