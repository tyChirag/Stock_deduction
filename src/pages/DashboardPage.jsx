import { Link } from 'react-router-dom';
import MetricsOverview from '../components/dashboard/MetricsOverview';
import Charts from '../components/dashboard/Charts';
import PlatformBreakdown from '../components/dashboard/PlatformBreakdown';
import useStore from '../store/useStore';
import Button from '../components/ui/Button';

export default function DashboardPage() {
  const { hasConnectedPlatform, isLoading } = useStore();
  const isConnected = hasConnectedPlatform();

  if (isLoading) {
    return <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">Loading Dashboard...</div>;
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">No platforms connected</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          Connect your e-commerce channels to start syncing inventory, managing orders, and viewing analytics.
        </p>
        <Link to="/connect-platforms">
          <Button variant="primary" className="text-base px-8 py-3">
            Connect Platforms
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <h1>Dashboard Loaded</h1>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>
      
      <MetricsOverview />
      <Charts />
      <PlatformBreakdown />
    </div>
  );
}

