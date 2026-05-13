import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Trash2, AlertTriangle, Info, BellRing, Package, CheckCircle2 } from 'lucide-react';
import useStore from '../../store/useStore';

// Simple time ago formatter
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  
  if (seconds < 60) return 'Just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export default function NotificationDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useStore();
  const dropdownRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    if (!notification.read) markAsRead(notification.id);
    onClose();
    if (notification.link) navigate(notification.link);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'info': return <Package className="h-4 w-4 text-blue-500" />;
      default: return <BellRing className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-12 mt-2 w-80 sm:w-96 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111217] shadow-xl overflow-hidden z-50 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2"
    >
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-4 py-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
        {unreadCount > 0 && (
          <button 
            onClick={() => markAllAsRead()}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            <Check className="h-3.5 w-3.5 mr-1" /> Mark all read
          </button>
        )}
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center px-4">
            <BellRing className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800/50">
            {notifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`group relative flex items-start px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${!notification.read ? 'bg-white dark:bg-gray-800 shadow-sm' : 'bg-gray-100 dark:bg-gray-900'}`}>
                    {getIcon(notification.type)}
                  </div>
                </div>
                
                <div className="ml-3 flex-1 overflow-hidden pr-6">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="capitalize text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {notification.platform}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {timeAgo(notification.timestamp)}
                    </span>
                  </div>
                  <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-300'}`}>
                    {notification.message}
                  </p>
                </div>

                {!notification.read && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center h-2 w-2 rounded-full bg-primary" />
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
