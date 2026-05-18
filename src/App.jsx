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
import WelcomeScreen from './components/onboarding/WelcomeScreen';
import AssistantGuide from './components/help/AssistantGuide';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function MainLayout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20 flex">
      <WelcomeScreen />
      <AssistantGuide />
      <Sidebar />
      <div className="sm:pl-64 flex flex-col flex-1 min-h-screen w-full">
        <TopBar />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 pb-24 sm:pb-6 overflow-y-auto w-full relative bg-gray-50/30 dark:bg-transparent overflow-x-hidden">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

function App() {
  const { theme, skin } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', skin || 'default');
  }, [theme, skin]);

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
