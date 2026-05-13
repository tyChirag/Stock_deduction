import { Bell, Search, Sun, Moon, RefreshCw, Menu, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import Button from '../ui/Button';
import NotificationDropdown from './NotificationDropdown';
import GlobalSearch from './GlobalSearch';

export default function TopBar() {
  const { theme, toggleTheme, refreshData, isLoading, notifications, initializeNotifications } = useStore();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    initializeNotifications();
  }, [initializeNotifications]);

  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-[#111217]/80 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <button className="mr-4 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 sm:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <GlobalSearch />
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/connect-platforms')}
          className="hidden sm:flex"
        >
          <Link className="mr-2 h-4 w-4" />
          Manage Connections
        </Button>

        <button
          onClick={refreshData}
          disabled={isLoading}
          className="flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors disabled:opacity-50"
          title="Refresh Data"
        >
          <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative flex items-center justify-center rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-[#111217]"></span>
              </span>
            )}
          </button>
          <NotificationDropdown isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
        </div>
        
        <div className="h-8 w-8 overflow-hidden rounded-full border border-border">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User avatar"
            className="h-full w-full object-cover bg-secondary"
          />
        </div>
      </div>
    </header>
  );
}
