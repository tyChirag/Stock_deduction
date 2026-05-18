import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, Link as LinkIcon, Bell, ShieldCheck, 
  Paintbrush, CreditCard, Sliders, AlertTriangle 
} from 'lucide-react';

import ProfileSettings from '../components/settings/ProfileSettings';
import BusinessInfo from '../components/settings/BusinessInfo';
import PlatformIntegrations from '../components/settings/PlatformIntegrations';
import NotificationPreferences from '../components/settings/NotificationPreferences';
import SecurityPrivacy from '../components/settings/SecurityPrivacy';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import SubscriptionBilling from '../components/settings/SubscriptionBilling';
import InventoryPreferences from '../components/settings/InventoryPreferences';
import DangerZone from '../components/settings/DangerZone';

const TABS = [
  { id: 'profile', label: 'Profile Settings', icon: User, component: ProfileSettings },
  { id: 'business', label: 'Business Info', icon: Briefcase, component: BusinessInfo },
  { id: 'platforms', label: 'Integrations', icon: LinkIcon, component: PlatformIntegrations },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationPreferences },
  { id: 'security', label: 'Security & Privacy', icon: ShieldCheck, component: SecurityPrivacy },
  { id: 'appearance', label: 'Appearance', icon: Paintbrush, component: AppearanceSettings },
  { id: 'billing', label: 'Subscription & Billing', icon: CreditCard, component: SubscriptionBilling },
  { id: 'inventory', label: 'Inventory Preferences', icon: Sliders, component: InventoryPreferences },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, component: DangerZone, isDanger: true },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || ProfileSettings;

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account and preferences.</p>
        </div>
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden sticky top-24">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${isActive 
                    ? (tab.isDanger ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400')
                    : (tab.isDanger ? 'text-gray-600 hover:bg-red-50/50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/10 dark:hover:text-red-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#1A1D24] hover:text-gray-900 dark:hover:text-white')
                  }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? (tab.isDanger ? 'text-red-600' : 'text-blue-600 dark:text-blue-500') : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content Area with Framer Motion Transitions */}
      <div className="flex-1 min-w-0 -mx-3 sm:mx-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
