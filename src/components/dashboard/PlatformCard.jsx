import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Package, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';

export default function PlatformCard({ platform, platformKey }) {
  const navigate = useNavigate();

  return (
    <Card 
      className="p-6 transition-colors"
      onClick={() => navigate(`/platform/${platformKey}`)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={cn("h-3 w-3 rounded-full", platform.color)} />
          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{platform.name}</h4>
        </div>
        <StatusBadge status="connected" label="Active" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Package className="mr-2 h-4 w-4" />
            Products
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{platform.products.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Orders Today
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{platform.orders.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <AlertTriangle className={cn("mr-2 h-4 w-4", platform.lowStock > 100 ? "text-yellow-500" : "")} />
            Low Stock
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn(
              "font-medium", 
              platform.lowStock > 100 ? "text-yellow-600 dark:text-yellow-500" : "text-gray-900 dark:text-white"
            )}>
              {platform.lowStock}
            </span>
            {platform.lowStock > 100 && (
              <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button variant="outline" className="w-full pointer-events-none">
          View Details
        </Button>
      </div>
    </Card>
  );
}
