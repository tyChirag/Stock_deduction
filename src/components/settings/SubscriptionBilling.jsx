import React from 'react';
import { CreditCard, CheckCircle2, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import useStore from '../../store/useStore';

export default function SubscriptionBilling() {
  const { user } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subscription & Billing</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your billing details and plan features.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Plan</h4>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                Active
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-end gap-2 mb-2">
              {user.accountType}
              <span className="text-sm font-medium text-gray-500 mb-1">/ $49/mo</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              You are currently on the Pro Seller plan. Your next billing date is <span className="font-semibold text-gray-900 dark:text-gray-300">November 15, 2023</span>.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">Order Volume Usage</span>
                <span className="text-gray-500">2,450 / 5,000</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '49%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">Connected Platforms</span>
                <span className="text-gray-500">3 / 5</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-indigo-900 to-blue-900 text-white border-0">
          <div className="flex items-center gap-2 mb-4 text-blue-300">
            <Zap className="h-5 w-5" />
            <h4 className="font-semibold">Upgrade to Premium</h4>
          </div>
          <p className="text-sm text-blue-100 mb-6">
            Get unlimited orders, priority support, and advanced ML inventory forecasting.
          </p>
          <ul className="space-y-3 mb-8 text-sm text-blue-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-400" /> Unlimited platforms
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-400" /> AI Sales Forecasting
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-400" /> Custom API Access
            </li>
          </ul>
          <Button className="w-full bg-white text-blue-900 hover:bg-gray-100 font-bold border-0 mt-auto">
            View Premium Plans
          </Button>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <h4 className="font-semibold text-gray-900 dark:text-white">Payment Methods</h4>
        </div>
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <CreditCard className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</h5>
              <p className="text-xs text-gray-500">Expires 12/2025</p>
            </div>
          </div>
          <span className="text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded">Default</span>
        </div>
      </Card>
    </div>
  );
}
