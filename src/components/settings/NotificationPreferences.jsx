import React from 'react';
import useStore from '../../store/useStore';
import Card from '../ui/Card';

export default function NotificationPreferences() {
  const { settings, updateSettings } = useStore();
  const notifSettings = settings.notifications;

  const handleToggle = (key) => {
    updateSettings('notifications', { [key]: !notifSettings[key] });
  };

  const ToggleItem = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <button 
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Control when and how you want to be notified.</p>
      </div>

      <Card className="p-6">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">In-App Alerts</h4>
        <div className="space-y-3 mb-8">
          <ToggleItem 
            title="Low Stock Alerts" 
            description="Get notified when inventory falls below your set threshold." 
            checked={notifSettings.lowStock} 
            onChange={() => handleToggle('lowStock')} 
          />
          <ToggleItem 
            title="New Order Notifications" 
            description="Receive real-time alerts for incoming orders." 
            checked={notifSettings.newOrder} 
            onChange={() => handleToggle('newOrder')} 
          />
          <ToggleItem 
            title="Inventory Sync Alerts" 
            description="Get notified if a platform sync fails or completes with errors." 
            checked={notifSettings.syncAlerts} 
            onChange={() => handleToggle('syncAlerts')} 
          />
        </div>

        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">External Notifications</h4>
        <div className="space-y-3">
          <ToggleItem 
            title="Weekly Digest" 
            description="Receive a weekly email summary of your store's performance." 
            checked={notifSettings.weeklyReports} 
            onChange={() => handleToggle('weeklyReports')} 
          />
          <ToggleItem 
            title="Email Notifications" 
            description="Receive critical alerts directly in your inbox." 
            checked={notifSettings.email} 
            onChange={() => handleToggle('email')} 
          />
          <ToggleItem 
            title="SMS Alerts" 
            description="Get text messages for urgent issues (Pro Plan only)." 
            checked={notifSettings.sms} 
            onChange={() => handleToggle('sms')} 
          />
        </div>
      </Card>
    </div>
  );
}
