import { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import { Filter, AlertCircle, IndianRupee, ShoppingBag, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import useStore from '../store/useStore';
import Card from '../components/ui/Card';

export default function AnalyticsPage() {
  const { data, isLoading } = useStore();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [timeRange, setTimeRange] = useState('12M'); // '6M', '12M', 'YTD'

  const connectedPlatforms = Object.entries(data.platforms)
    .filter(([_, p]) => p.connected)
    .map(([key, p]) => ({ key, name: p.name, color: p.color }));

  const isConnected = connectedPlatforms.length > 0;

  const rawMonthlyData = data.monthlyAnalytics || [];

  // Filter data based on time range
  const filteredData = useMemo(() => {
    let sliced = [...rawMonthlyData];
    if (timeRange === '6M') sliced = sliced.slice(-6);
    else if (timeRange === 'YTD') sliced = sliced.slice(0, new Date().getMonth() + 1 || 12);
    // 12M uses all 12 by default
    return sliced;
  }, [rawMonthlyData, timeRange]);

  // Calculate Summary Metrics (Current Month vs Previous Month)
  const currentMonth = rawMonthlyData[rawMonthlyData.length - 1] || {};
  const previousMonth = rawMonthlyData[rawMonthlyData.length - 2] || {};

  const calculateGrowth = (current, previous) => {
    if (!previous) return 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const revenueGrowth = calculateGrowth(currentMonth.revenue, previousMonth.revenue);
  const ordersGrowth = calculateGrowth(currentMonth.orders, previousMonth.orders);
  const profitGrowth = calculateGrowth(currentMonth.profit, previousMonth.profit);

  // Find best selling platform for current month
  const bestPlatform = useMemo(() => {
    if (!currentMonth) return { name: 'N/A', revenue: 0 };
    const platforms = connectedPlatforms.map(p => ({
      name: p.name,
      revenue: currentMonth[p.key] || 0
    })).sort((a, b) => b.revenue - a.revenue);
    return platforms[0] || { name: 'N/A', revenue: 0 };
  }, [currentMonth, connectedPlatforms]);

  if (!isConnected) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics</h1>
        <Card className="flex flex-col items-center justify-center p-16 text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No platforms connected</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Connect your e-commerce platforms in Settings to view your detailed monthly analytics.</p>
        </Card>
      </div>
    );
  }

  const StatCard = ({ title, value, growth, icon: Icon, prefix = "" }) => (
    <Card className="p-6 relative overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/80 backdrop-blur-[2px] dark:bg-[#09090b]/80" />
      )}
      <div className="flex items-center justify-between mb-4 relative z-0">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="relative z-0">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </p>
        {growth !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            <span className={`flex items-center text-xs font-medium ${Number(growth) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {Number(growth) >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(Number(growth))}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        )}
      </div>
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
        <Icon className="h-32 w-32" />
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Monthly Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Deep dive into your monthly business performance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex items-center border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 bg-white dark:bg-[#1A1D24] shadow-sm text-sm">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <select 
              className="bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 appearance-none pr-4 cursor-pointer"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="6M">Last 6 Months</option>
              <option value="12M">Last 12 Months</option>
              <option value="YTD">This Year</option>
            </select>
          </div>

          <div className="relative flex items-center border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 bg-white dark:bg-[#1A1D24] shadow-sm text-sm">
            <Activity className="h-4 w-4 mr-2 text-gray-400" />
            <select 
              className="bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 appearance-none pr-4 cursor-pointer"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              {connectedPlatforms.map(p => (
                <option key={p.key} value={p.key}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Monthly Revenue" value={currentMonth.revenue} growth={revenueGrowth} icon={IndianRupee} prefix="₹" />
        <StatCard title="Monthly Orders" value={currentMonth.orders} growth={ordersGrowth} icon={ShoppingBag} />
        <StatCard title="Monthly Profit" value={currentMonth.profit} growth={profitGrowth} icon={TrendingUp} prefix="₹" />
        <StatCard title="Best Platform" value={bestPlatform.name} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Growth Area Chart */}
        <Card className="p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/80 backdrop-blur-[2px] dark:bg-[#09090b]/80 rounded-xl" />
          )}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue & Profit Trend</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly financial performance</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.1} />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Platform Comparison Line Chart */}
        <Card className="p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/80 backdrop-blur-[2px] dark:bg-[#09090b]/80 rounded-xl" />
          )}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Platform Performance</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly revenue breakdown by platform</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.1} />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                {connectedPlatforms.map((platform, index) => {
                  const colors = ['#f59e0b', '#3b82f6', '#ec4899', '#10b981'];
                  return (
                    <Line 
                      key={platform.key}
                      type="monotone" 
                      dataKey={platform.key} 
                      name={platform.name} 
                      stroke={colors[index % colors.length]} 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Order Volume Bar Chart */}
        <Card className="p-6 lg:col-span-2 relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/80 backdrop-blur-[2px] dark:bg-[#09090b]/80 rounded-xl" />
          )}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Volume & Inventory</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly orders vs items sold</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.1} />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(107, 114, 128, 0.05)' }}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                  formatter={(value) => [value.toLocaleString('en-IN'), undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar yAxisId="left" dataKey="orders" name="Total Orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="inventorySold" name="Items Sold" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
