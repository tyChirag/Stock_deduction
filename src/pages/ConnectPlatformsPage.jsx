import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, ShieldCheck, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import PlatformConnectCard from '../components/auth/PlatformConnectCard';
import Button from '../components/ui/Button';
import { useState } from 'react';

export default function ConnectPlatformsPage() {
  const { data, logout } = useStore();
  const navigate = useNavigate();
  
  const connectedCount = Object.values(data.platforms).filter(p => p.connected).length;
  const canAccessDashboard = connectedCount > 0;

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAccessDashboard = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 400); // Small delay for smooth UX transition
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] font-sans antialiased">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm">
              <span className="text-xl font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">StockSync Setup</h1>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </header>

        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Connect Your Channels</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Link your e-commerce platforms to sync inventory, manage orders, and view unified analytics across all your sales channels.
          </p>
        </div>

        {!canAccessDashboard && (
          <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-950/20">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Action Required</h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-500">
                  <p>You must connect at least one platform to access your SellerSync Dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {Object.entries(data.platforms).map(([key, platform]) => (
            <PlatformConnectCard key={key} platformKey={key} platform={platform} />
          ))}
        </div>

        <div className="flex justify-end border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {connectedCount} platform{connectedCount !== 1 ? 's' : ''} connected
            </span>
            <Button
              onClick={handleAccessDashboard}
              disabled={!canAccessDashboard || isTransitioning}
              isLoading={isTransitioning}
              className="group"
            >
              <ShieldCheck className="mr-2 h-5 w-5 opacity-70" />
              Access Dashboard
              {!isTransitioning && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
