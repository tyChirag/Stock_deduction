import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import useStore from '../../store/useStore';
import { AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import { useEffect, useState } from 'react';

// Helper function to extract and filter platform data
export function getConnectedPlatformData(data) {
  const connectedPlatforms = Object.values(data.platforms)
    .filter(p => p.connected)
    .map(p => p.name.toLowerCase());

  // Filter inventory based on connected platforms and add dynamic offline store calculation
  const filteredInventory = data.inventoryData.filter(item => 
    connectedPlatforms.includes(item.name.toLowerCase())
  );

  // Add dynamically calculated offline store stock if connected
  if (data.platforms.offline?.connected) {
    const offlineStock = data.platforms.offline.productList?.reduce((sum, p) => sum + (parseInt(p.stock, 10) || 0), 0) || 0;
    // Ensure we don't add duplicate if somehow it's in inventoryData already
    if (!filteredInventory.find(i => i.name.toLowerCase() === 'offline store')) {
      filteredInventory.push({ name: 'Offline Store', stock: offlineStock });
    }
  }

  // Since mock sales data is aggregated, we dynamically split it 
  // based on predefined rough ratios to simulate real filtering.
  const ratios = { amazon: 0.45, flipkart: 0.35, meesho: 0.20, 'offline store': 0.10 };
  const activeRatio = connectedPlatforms.reduce((acc, p) => acc + (ratios[p] || 0), 0);

  const filteredSales = data.salesData.map(day => ({
    ...day,
    sales: Math.round(day.sales * activeRatio),
    orders: Math.round(day.orders * activeRatio)
  }));

  return { 
    filteredInventory, 
    filteredSales, 
    isConnected: connectedPlatforms.length > 0 
  };
}

export default function Charts() {
  const { data, isLoading } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  
  const { filteredInventory, filteredSales, isConnected } = getConnectedPlatformData(data);

  // Smooth appearance transition
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!isConnected) {
    return (
      <Card className={`mt-6 flex flex-col items-center justify-center p-12 text-center transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <AlertCircle className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No data available</h3>
        <p className="text-gray-500 dark:text-gray-400">Please connect at least one platform to view analytics.</p>
      </Card>
    );
  }

  return (
    <div className={`mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Sales Trend Chart */}
      <Card className="relative p-4 sm:p-6">
        {isLoading && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/80 backdrop-blur-[2px] dark:bg-[#09090b]/80 rounded-xl" />
        )}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Trend</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue across connected platforms (7 days)</p>
        </div>
        <div className="h-56 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredSales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '8px', color: '#111827' }}
                itemStyle={{ color: '#111827' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Inventory Distribution Chart */}
      <Card className="relative p-4 sm:p-6">
        {isLoading && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/80 backdrop-blur-[2px] dark:bg-[#09090b]/80 rounded-xl" />
        )}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Distribution</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Stock per connected platform</p>
        </div>
        <div className="h-56 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredInventory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '8px', color: '#111827' }}
              />
              <Bar dataKey="stock" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
