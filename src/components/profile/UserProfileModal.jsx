import React, { useState, useEffect } from 'react';
import { X, User, Link as LinkIcon, Bell, CreditCard } from 'lucide-react';
import useStore from '../../store/useStore';
import AccountSettings from './AccountSettings';
import ConnectedPlatformsList from './ConnectedPlatformsList';
import NotificationPanel from './NotificationPanel';

export default function UserProfileModal({ isOpen, onClose, initialTab = 'account' }) {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'account', label: 'My Profile', icon: User },
    { id: 'platforms', label: 'Connected Platforms', icon: LinkIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 sm:p-6 md:p-12 overflow-hidden">
      <div className="bg-white dark:bg-[#111217] w-full max-w-5xl h-full max-h-[800px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 bg-white">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User avatar" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">{user.name}</h2>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                {user.accountType}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 bg-gray-50/30 dark:bg-gray-900/30 p-4 overflow-y-auto hidden md:block">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 p-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white dark:bg-[#111217]">
            <div className="max-w-3xl mx-auto">
              {activeTab === 'account' && <AccountSettings />}
              {activeTab === 'platforms' && <ConnectedPlatformsList />}
              {activeTab === 'notifications' && <NotificationPanel />}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Billing & Subscription</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your subscription plan and billing details.</p>
                  </div>
                  <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/30 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{user.accountType}</h4>
                      <p className="text-sm text-gray-500 mt-1">Active plan billed annually.</p>
                    </div>
                    <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">Active</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
