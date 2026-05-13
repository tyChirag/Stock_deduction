import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, AlertTriangle } from 'lucide-react';
import useStore from '../store/useStore';
import ProductCard from '../components/dashboard/ProductCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function PlatformPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useStore();
  
  const platform = data.platforms[name];
  
  if (!platform) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Not Found</h2>
        <Button 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const { productList } = platform;
  
  // Logic for top selling items
  const topSelling = [...productList]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 3);
    
  // Logic for low stock items
  const lowStockItems = productList.filter((p) => p.stock < 10);

  return (
    <div className="mx-auto max-w-7xl relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-gray-50/50 backdrop-blur-[1px] dark:bg-[#09090b]/50 min-h-screen" />
      )}
      
      <div className="mb-8 flex items-center space-x-4">
        <button 
          onClick={() => navigate('/')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-100 dark:border-gray-800 dark:bg-[#111217] dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-900 dark:text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center text-gray-900 dark:text-white">
            <div className={`mr-3 h-4 w-4 rounded-full ${platform.color}`} />
            {platform.name} Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Detailed view of your top performing products and critical alerts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Section */}
        <section>
          <div className="mb-4 flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Selling Products</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Based on total units sold</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {topSelling.map((product) => (
              <ProductCard key={product.id} product={product} isLowStock={false} />
            ))}
          </div>
        </section>

        {/* Low Stock Alerts Section */}
        <section>
          <div className="mb-4 flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Low Stock Alerts</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Products with less than 10 units remaining</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {lowStockItems.length > 0 ? (
              lowStockItems.map((product) => (
                <ProductCard key={product.id} product={product} isLowStock={true} />
              ))
            ) : (
              <Card className="border-dashed flex items-center justify-center p-8 bg-gray-50 dark:bg-[#111217]/50">
                <p className="text-gray-500 dark:text-gray-400">All products are well stocked!</p>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
