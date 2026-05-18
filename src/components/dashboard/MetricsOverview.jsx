import { Package, ShoppingBag, IndianRupee, Layers } from 'lucide-react';
import useStore from '../../store/useStore';
import { cn } from '../../lib/utils';
import Card from '../ui/Card';

export default function MetricsOverview() {
  const { data, isLoading } = useStore();
  const { overview } = data;

  const metrics = [
    {
      label: 'Total Products',
      value: overview.totalProducts.toLocaleString(),
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      trend: '+12%',
      trendUp: true,
      tooltip: 'Your total catalog size across all connected active platforms.'
    },
    {
      label: 'Inventory Remaining',
      value: overview.inventoryRemaining.toLocaleString(),
      icon: Layers,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      trend: '-2.4%',
      trendUp: false,
      tooltip: 'The sum of all physical stock available for sale.'
    },
    {
      label: 'Total Orders',
      value: overview.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      trend: '+18%',
      trendUp: true,
      tooltip: 'Total lifetime orders placed across Amazon, Flipkart, etc.'
    },
    {
      label: 'Total Revenue',
      value: `₹${overview.revenue.toLocaleString()}`,
      icon: IndianRupee,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      trend: '+24%',
      trendUp: true,
      tooltip: 'Your combined revenue generated (excluding refunds).'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" data-tour="dashboard-metrics">
      {metrics.map((metric, idx) => (
        <Card
          key={idx}
          className="relative overflow-hidden p-4 sm:p-6 group"
        >
          {isLoading && (
            <div className="absolute inset-0 z-10 animate-pulse bg-gray-100/50 backdrop-blur-[2px] dark:bg-gray-800/50" />
          )}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span 
                className="text-sm font-medium text-gray-500 dark:text-gray-400 cursor-help border-b border-dashed border-gray-300 dark:border-gray-700 w-fit pb-0.5"
                title={metric.tooltip}
              >
                {metric.label}
              </span>
              <span className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:scale-105 transition-transform origin-left">
                {metric.value}
              </span>
            </div>
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", metric.bgColor)}>
              <metric.icon className={cn("h-6 w-6", metric.color)} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span
              className={cn(
                "font-medium",
                metric.trendUp ? "text-green-500" : "text-red-500"
              )}
            >
              {metric.trend}
            </span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
