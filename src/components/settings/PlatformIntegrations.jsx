import React from 'react';
import useStore from '../../store/useStore';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function PlatformIntegrations() {
  const { data, connectPlatform, disconnectPlatform } = useStore();
  const platforms = Object.entries(data.platforms);

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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Platform Integrations</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Connect your sales channels to sync inventory and orders automatically.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map(([key, platform]) => (
          <Card key={key} className={`p-5 transition-all duration-200 hover:shadow-md ${platform.connected ? 'border-blue-200 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-900/10' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg ${platform.color || 'bg-gray-500'}`}>
                  {platform.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{platform.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    {platform.connected ? 'Synced 5m ago' : 'Not Connected'}
                  </p>
                </div>
              </div>
              <StatusBadge 
                status={platform.connected ? 'connected' : 'disconnected'} 
                label={platform.connected ? 'Connected' : 'Disconnected'} 
              />
            </div>

            {platform.connected && (
              <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-lg bg-white dark:bg-[#111217] border border-gray-100 dark:border-gray-800">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Orders Synced</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{platform.orders.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Inventory</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{platform.products.toLocaleString()}</div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-auto pt-2">
              {platform.connected ? (
                <>
                  <Button variant="outline" className="text-xs h-8 px-3 gap-1" onClick={() => toast.success(`Synced ${platform.name} successfully!`)}>
                    <RefreshCw className="h-3 w-3" /> Sync Now
                  </Button>
                  <Button variant="ghost" className="text-xs h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDisconnect(key)}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button className="w-full text-sm h-9 gap-2" onClick={() => handleConnect(key)}>
                  <ExternalLink className="h-4 w-4" /> Connect Platform
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
