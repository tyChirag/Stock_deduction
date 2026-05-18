import React from 'react';
import useStore from '../../store/useStore';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export default function NotificationPanel() {
  const { notifications } = useStore();

  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTimeAgo = (timestamp) => {
    const diff = new Date() - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">View recent alerts and inventory updates.</p>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className={`flex gap-4 p-4 rounded-lg border ${notification.read ? 'bg-white dark:bg-[#1A1D24] border-gray-100 dark:border-gray-800' : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30'}`}>
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {notification.message}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {notification.platform}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {getTimeAgo(notification.timestamp)}
                  </span>
                </div>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
