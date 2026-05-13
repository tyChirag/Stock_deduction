import { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { Filter, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import Card from '../components/ui/Card';

export default function AnalyticsPage() {
  const { data, isLoading } = useStore();
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const connectedPlatforms = Object.entries(data.platforms)
    .filter(([_, p]) => p.connected)
    .map(([key, p]) => ({ key, name: p.name }));

  const isConnected = connectedPlatforms.length > 0;

  const chartData = useMemo(() => {
    if (!isConnected) return { sales: [], inventory: [] };

    // Get active platforms based on filter
    const activePlatforms = selectedPlatform === 'all' 
      ? connectedPlatforms.map(p => p.name.toLowerCase())
      : [selectedPlatform];

    // Filter inventory
    const filteredInventory = data.inventoryData.filter(item => 
      activePlatforms.includes(item.name.toLowerCase())
    );

    // Calculate sales ratio for mock data based on selected platforms
    const ratios = { amazon: 0.45, flipkart: 0.35, meesho: 0.20 };
    const activeRatio = activePlatforms.reduce((acc, p) => acc + (ratios[p] || 0), 0);

    const filteredSales = data.salesData.map(day => ({
      ...day,
      sales: Math.round(day.sales * activeRatio),
      orders: Math.round(day.orders * activeRatio)
    }));

    return { sales: filteredSales, inventory: filteredInventory };
  }, [data, selectedPlatform, isConnected, connectedPlatforms]);

  if (!isConnected) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics</h1>
        <Card className="flex flex-col items-center justify-center p-16 text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No platforms connected</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Connect your e-commerce platforms in Settings to view your unified analytics dashboard.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track your performance metrics and inventory distribution.</p>
        </div>
        
        <div className="relative flex items-center border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 bg-white dark:bg-card shadow-sm text-sm">
          <Filter className="h-4 w-4 mr-2 text-gray-400" />
          <select 
            className="bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 appearance-none pr-4 cursor-pointer"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="all">All Connected Platforms</option>
            {connectedPlatforms.map(p => (
              <option key={p.key} value={p.name.toLowerCase()}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Trend Chart */}
        <Card className="relative p-6">
          {isLoading && (
            <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/80 backdrop-blur-[2px] dark:bg-[#09090b]/80 rounded-xl" />
          )}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Trend</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue over the last 7 days</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.sales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px', color: 'var(--color-foreground)' }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
                <Area type="monotone" dataKey="sales" name="Revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Inventory Distribution Chart */}
        <Card className="relative p-6">
          {isLoading && (
            <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/80 backdrop-blur-[2px] dark:bg-[#09090b]/80 rounded-xl" />
          )}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Distribution</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Stock availability by platform</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.inventory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px', color: 'var(--color-foreground)' }}
                />
                <Bar dataKey="stock" name="Stock Count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
