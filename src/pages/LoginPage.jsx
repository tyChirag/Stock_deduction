import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogIn, KeyRound } from 'lucide-react';
import useStore from '../store/useStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    login();
    toast.success('Successfully logged in');
    navigate('/connect-platforms');
  };

  return (
    <div 
      className="relative flex items-center justify-center h-screen w-full bg-cover bg-center px-4"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
    >
      {/* Stronger overlay to make the form pop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* More prominent, clear form card */}
      <div 
        className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-gray-900/95 p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-gray-800 transition-all duration-700 ease-out translate-y-0 opacity-100 backdrop-blur-md"
        style={{ animation: 'fadeIn 0.6s ease-out forwards' }}
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
            <span className="text-3xl font-bold">S</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-foreground">
            StockSync
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-muted-foreground">
            Sign in to manage your e-commerce channels
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="text-sm font-medium text-gray-700 dark:text-foreground">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 relative block w-full rounded-md border border-gray-300 dark:border-input bg-transparent px-3 py-2.5 text-gray-900 dark:text-foreground placeholder-gray-400 dark:placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                placeholder="admin@sellersync.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-foreground">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 relative block w-full rounded-md border border-gray-300 dark:border-input bg-transparent px-3 py-2.5 text-gray-900 dark:text-foreground placeholder-gray-400 dark:placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 dark:border-input text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-muted-foreground">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:shadow-lg transition-all duration-200 disabled:opacity-70"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                ) : (
                  <LogIn className="h-5 w-5 text-primary-foreground/80 group-hover:text-primary-foreground transition-colors" aria-hidden="true" />
                )}
              </span>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="mt-4 rounded-md bg-blue-50/80 dark:bg-blue-900/30 p-4 text-xs text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-center">
              <KeyRound className="h-4 w-4 mr-2 flex-shrink-0" />
              <p>Demo: Any credentials will work.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
