import React from 'react';
import { ShieldCheck, Key, Smartphone, Clock, LogOut } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function SecurityPrivacy() {
  const SecurityItem = ({ icon: Icon, title, description, actionText, isDanger }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors gap-4">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md">{description}</p>
        </div>
      </div>
      <Button variant={isDanger ? "ghost" : "outline"} className={`shrink-0 ${isDanger ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : ''}`}>
        {actionText}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security & Privacy</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Keep your account secure and manage active sessions.</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg">
          <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-500" />
          <div>
            <h4 className="text-sm font-semibold text-green-900 dark:text-green-400">Your account is well protected</h4>
            <p className="text-xs text-green-700 dark:text-green-500 mt-0.5">You have completed 3 of 4 recommended security steps.</p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <SecurityItem 
            icon={Key} 
            title="Change Password" 
            description="Update your password regularly to keep your account secure." 
            actionText="Update" 
          />
          <SecurityItem 
            icon={Smartphone} 
            title="Two-Factor Authentication (2FA)" 
            description="Add an extra layer of security requiring a code from your mobile device." 
            actionText="Enable 2FA" 
          />
        </div>

        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 border-t border-gray-100 dark:border-gray-800 pt-6">Active Sessions</h4>
        <div className="space-y-3">
          <SecurityItem 
            icon={Clock} 
            title="Login Activity" 
            description="Review your recent login history across all devices." 
            actionText="View History" 
          />
          <SecurityItem 
            icon={LogOut} 
            title="Logout From All Devices" 
            description="Sign out from all active sessions immediately if you suspect suspicious activity." 
            actionText="Log Out All"
            isDanger={true}
          />
        </div>
      </Card>
    </div>
  );
}
