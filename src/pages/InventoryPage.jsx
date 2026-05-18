import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, ImageIcon, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import StatusBadge from '../components/ui/StatusBadge';
import Card from '../components/ui/Card';

export default function InventoryPage() {
  const getAllProducts = useStore((state) => state.getAllProducts);
  const products = getAllProducts();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const highlightProductId = searchParams.get('product');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // all, low, healthy
  const [sortBy, setSortBy] = useState('name'); // name, stock
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // Search
    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter
    if (stockFilter === 'low') {
      result = result.filter(p => p.stock < 20);
    } else if (stockFilter === 'healthy') {
      result = result.filter(p => p.stock >= 20);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'stock') return b.stock - a.stock;
      return 0;
    });

    return result;
  }, [products, searchTerm, stockFilter, sortBy]);

  const highlightRef = useRef(null);

  // Navigate to correct page if highlighting a specific product
  useEffect(() => {
    if (highlightProductId) {
      const index = filteredAndSortedProducts.findIndex(p => p.id.toString() === highlightProductId);
      if (index !== -1) {
        const page = Math.floor(index / itemsPerPage) + 1;
        const timer = setTimeout(() => {
          setCurrentPage(page);
          // Wait for render, then scroll
          setTimeout(() => {
            if (highlightRef.current) {
              highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [highlightProductId, filteredAndSortedProducts]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Inventory Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage products across all connected platforms.</p>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex items-center border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 bg-transparent text-sm">
              <Filter className="h-4 w-4 mr-2 text-gray-400" />
              <select 
                className="bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 appearance-none pr-4 cursor-pointer"
                value={stockFilter}
                onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">All Stock</option>
                <option value="low">Low Stock (&lt; 20)</option>
                <option value="healthy">Healthy Stock</option>
              </select>
            </div>
            <div className="relative flex items-center border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 bg-transparent text-sm">
              <ArrowUpDown className="h-4 w-4 mr-2 text-gray-400" />
              <select 
                className="bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 appearance-none pr-4 cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="stock">Sort by Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800/50 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-4 py-3 rounded-tl-lg">Product</th>
                <th scope="col" className="px-4 py-3">Platform</th>
                <th scope="col" className="px-4 py-3">Sold</th>
                <th scope="col" className="px-4 py-3 rounded-tr-lg text-right">Stock</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr 
                    key={`${product.platformKey}-${product.id}`} 
                    ref={product.id.toString() === highlightProductId ? highlightRef : null}
                    className={`border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all duration-500 ${product.id.toString() === highlightProductId ? 'bg-primary/10 dark:bg-primary/20 border-l-4 border-l-primary' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden mr-3">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="h-5 w-5 m-auto mt-2.5 text-gray-400" />
                          )}
                        </div>
                        <div className="truncate max-w-[200px] sm:max-w-xs">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium">
                        {product.platform}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.sold.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end font-semibold">
                        {product.stock < 20 && <AlertCircle className="h-3.5 w-3.5 text-red-500 mr-1.5" />}
                        <span className={product.stock < 20 ? 'text-red-600 dark:text-red-400' : ''}>
                          {product.stock}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="sm:hidden flex flex-col gap-3">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div 
                key={`mobile-${product.platformKey}-${product.id}`}
                ref={product.id.toString() === highlightProductId ? highlightRef : null}
                className={`p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1A1D24] flex gap-3 ${product.id.toString() === highlightProductId ? 'ring-2 ring-primary bg-primary/5' : ''}`}
              >
                <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <ImageIcon className="h-6 w-6 m-auto mt-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm mb-1">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-[#111217] px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-700 capitalize shadow-sm">
                      {product.platform}
                    </span>
                    <span className="text-xs text-gray-500">Sold: {product.sold}</span>
                  </div>
                  <div className="flex items-center">
                    {product.stock < 20 ? (
                      <span className="text-xs font-semibold flex items-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-md">
                        <AlertCircle className="h-3 w-3 mr-1" /> Low Stock: {product.stock}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Stock: {product.stock}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No products found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedProducts.length}</span> Entries
            </span>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-l-0 border-gray-200 rounded-r-lg hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
