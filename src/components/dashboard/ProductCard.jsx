import { Package, TrendingUp, AlertCircle, ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import Card from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';

export default function ProductCard({ product, isLowStock }) {
  const isTopSeller = product.sold > 1000;

  return (
    <Card className={cn(
      "group relative overflow-hidden p-3 transition-transform duration-300 hover:scale-105 hover:shadow-md flex flex-col h-full",
      isLowStock 
        ? "border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20" 
        : ""
    )}>
      {/* Badges Overlay */}
      <div className="absolute top-5 left-5 z-10 flex flex-col space-y-2">
        {isLowStock && (
          <StatusBadge status="danger" label="Low Stock" />
        )}
        {isTopSeller && (
          <StatusBadge status="connected" label="Top Seller" />
        )}
      </div>

      {/* Image Container with Zoom effect */}
      <div className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 flex-shrink-0">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            className="w-full h-40 object-cover rounded-lg hover:scale-105 transition"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300";
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
            <ImageIcon className="h-8 w-8 mb-2" />
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h4 
          className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-500 transition-colors mb-2" 
          title={product.name}
        >
          {product.name}
        </h4>
        
        <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-800 flex items-end justify-between">
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">ID: #{product.id}</span>
            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <TrendingUp className="mr-1 h-3.5 w-3.5 text-blue-500" />
              {product.sold.toLocaleString()} sold
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Stock</span>
            <div className="flex items-center space-x-1 font-semibold text-gray-900 dark:text-white">
              {isLowStock && <AlertCircle className="h-3 w-3 text-red-500" />}
              <span>{product.stock}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
