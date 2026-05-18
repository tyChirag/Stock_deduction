import React from 'react';
import useStore from '../../store/useStore';
import Button from '../ui/Button';

export default function ConnectedPlatformsList() {
  const { data } = useStore();
  const platforms = Object.values(data.platforms);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Connected Platforms</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your active marketplace integrations.</p>
      </div>

      <div className="space-y-4">
        {platforms.map(platform => (
          <div key={platform.name} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#1A1D24]">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${platform.color || 'bg-gray-500'}`}>
                {platform.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{platform.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="relative flex h-2.5 w-2.5">
                    {platform.connected && <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${platform.connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {platform.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              variant={platform.connected ? "outline" : "default"}
              className={platform.connected ? "text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-900/20" : ""}
            >
              {platform.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
