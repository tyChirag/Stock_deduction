import { useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import useStore from './store/useStore';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import BottomNav from './components/layout/BottomNav';
import DashboardPage from './pages/DashboardPage';
import PlatformPage from './pages/PlatformPage';
import LoginPage from './pages/LoginPage';
import ConnectPlatformsPage from './pages/ConnectPlatformsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/ui/ErrorBoundary';

// New Pages
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import OfflineStorePage from './pages/OfflineStorePage';


function MainLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20 flex">
      <Sidebar />
      <div className="sm:pl-64 flex flex-col flex-1 min-h-screen w-full">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 sm:pb-6 overflow-y-auto w-full relative">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

function App() {
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Toaster position="top-right" theme={theme} richColors closeButton />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/connect-platforms" element={<ConnectPlatformsPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/platform/:name" element={<PlatformPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/offline-store" element={<OfflineStorePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
