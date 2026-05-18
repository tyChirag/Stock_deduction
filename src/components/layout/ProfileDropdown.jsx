import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { 
  User, Link as LinkIcon, Bell, CreditCard, 
  Moon, Sun, HelpCircle, LogOut, Package
} from 'lucide-react';

export default function ProfileDropdown({ isOpen, onClose, onOpenProfile }) {
  const { user, data, theme, toggleTheme, logout } = useStore();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is inside the dropdown, do nothing. 
      // Note: The avatar button click is handled in TopBar and might trigger this if we don't stop propagation, but we handle it via isOpen state.
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    // Add small delay to avoid immediate closure if triggered by the button click
    let timeoutId;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 10);
    }
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const connectedCount = Object.values(data.platforms).filter(p => p.connected).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAction = (action) => {
    onClose();
    action();
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-12 mt-2 w-72 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-md shadow-xl dark:border-gray-800 dark:bg-[#1A1D24]/95 overflow-hidden transition-all origin-top-right animate-in fade-in zoom-in-95 duration-200 z-50"
    >
      {/* Header User Info */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 bg-white">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User avatar" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-gray-900 dark:text-white leading-none truncate">{user.name}</span>
            <span className="text-xs text-gray-500 mt-1 truncate">{user.email}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full border border-yellow-100 dark:border-yellow-900/50">
            ⭐ {user.accountType}
          </span>
          <span className="text-gray-500 flex items-center gap-1 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
            <LinkIcon className="h-3 w-3" /> {connectedCount}
          </span>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="py-2">
        <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</div>
        <button onClick={() => handleAction(() => onOpenProfile('account'))} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80 transition-colors">
          <User className="h-4 w-4 text-gray-400" /> My Profile
        </button>
        <button onClick={() => handleAction(() => onOpenProfile('billing'))} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80 transition-colors">
          <CreditCard className="h-4 w-4 text-gray-400" /> Billing & Subscription
        </button>
        
        <div className="my-1 border-t border-gray-100 dark:border-gray-800"></div>
        
        <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Dashboard</div>
        <button onClick={() => handleAction(() => navigate('/inventory'))} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80 transition-colors">
          <Package className="h-4 w-4 text-gray-400" /> Inventory Settings
        </button>
        <button onClick={() => handleAction(() => onOpenProfile('platforms'))} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80 transition-colors">
          <LinkIcon className="h-4 w-4 text-gray-400" /> Connected Platforms
        </button>
        <button onClick={() => handleAction(() => onOpenProfile('notifications'))} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80 transition-colors">
          <Bell className="h-4 w-4 text-gray-400" /> Notifications
        </button>

        <div className="my-1 border-t border-gray-100 dark:border-gray-800"></div>

        <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Preferences</div>
        <button onClick={() => handleAction(toggleTheme)} className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80 transition-colors">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon className="h-4 w-4 text-gray-400" /> : <Sun className="h-4 w-4 text-gray-400" />}
            Dark Mode
          </div>
          <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </button>
        <button onClick={() => handleAction(() => console.log('Help clicked'))} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80 transition-colors">
          <HelpCircle className="h-4 w-4 text-gray-400" /> Help & Support
        </button>

        <div className="my-1 border-t border-gray-100 dark:border-gray-800"></div>

        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors font-medium">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );
}
