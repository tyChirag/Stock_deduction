import React from 'react';
import useStore from '../../store/useStore';
import Card from '../ui/Card';
import { Briefcase, Building2, Calendar, MapPin, Package, Store } from 'lucide-react';

export default function BusinessInfo() {
  const { user, data } = useStore();
  const connectedPlatformsCount = Object.values(data.platforms).filter(p => p.connected).length;
  
  const totalInventory = Object.values(data.platforms).reduce((acc, curr) => {
    return acc + (curr.productList ? curr.productList.reduce((sum, item) => sum + (item.stock || 0), 0) : 0);
  }, 0);

  const InfoCard = ({ icon: Icon, title, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h4>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Business Information</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your business and operational footprint.</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard icon={Building2} title="Business Name" value={user.businessName} />
          <InfoCard icon={Briefcase} title="Business Type" value="Retail Ecommerce" />
          <InfoCard icon={Calendar} title="Active Since" value="October 2023" />
          <InfoCard icon={MapPin} title="Registered Address" value={user.address} />
          <InfoCard icon={Store} title="Connected Platforms" value={`${connectedPlatformsCount} Marketplaces`} />
          <InfoCard icon={Package} title="Inventory Size" value={`${totalInventory.toLocaleString()} Items`} />
        </div>
      </Card>
    </div>
  );
}
