import { User, Moon, Sun, Link as LinkIcon, ShieldCheck } from 'lucide-react';
import useStore from '../store/useStore';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { data, theme, toggleTheme, connectPlatform, disconnectPlatform } = useStore();
  
  const handleConnect = async (key) => {
    try {
      await connectPlatform(key);
      toast.success(`Successfully connected ${data.platforms[key].name}`);
    } catch (error) {
      toast.error('Failed to connect platform');
    }
  };

  const handleDisconnect = async (key) => {
    try {
      await disconnectPlatform(key);
      toast.success(`Disconnected ${data.platforms[key].name}`);
    } catch (error) {
      toast.error('Failed to disconnect platform');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account, preferences, and integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Settings */}
        <Card className="p-6 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <User className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input type="text" defaultValue="Admin" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input type="text" defaultValue="User" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input type="email" defaultValue="admin@sellersync.com" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors" onClick={() => toast.success('Profile updated')}>
              Save Changes
            </button>
          </div>
        </Card>

        {/* Appearance & Security */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              {theme === 'dark' ? <Moon className="h-5 w-5 text-gray-500" /> : <Sun className="h-5 w-5 text-gray-500" />}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
              <button 
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <ShieldCheck className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h2>
            </div>
            <button className="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors py-2" onClick={() => toast.info('Password reset email sent')}>
              Change Password
            </button>
            <button className="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors py-2" onClick={() => toast.info('2FA settings opened')}>
              Two-Factor Authentication
            </button>
          </Card>
        </div>

        {/* Integrations */}
        <Card className="p-6 md:col-span-3">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <LinkIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Platform Integrations</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data.platforms).map(([key, platform]) => (
              <div key={key} className={`border rounded-lg p-4 flex flex-col justify-between h-32 transition-colors ${platform.connected ? 'border-primary/50 bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-800'}`}>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 dark:text-white">{platform.name}</h3>
                  <StatusBadge status={platform.connected ? 'connected' : 'disconnected'} label={platform.connected ? 'Connected' : 'Disconnected'} />
                </div>
                
                {platform.connected ? (
                  <button 
                    onClick={() => handleDisconnect(key)}
                    className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-left mt-auto transition-colors w-max"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button 
                    onClick={() => handleConnect(key)}
                    className="text-sm font-medium text-primary hover:text-primary/80 text-left mt-auto transition-colors w-max"
                  >
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
