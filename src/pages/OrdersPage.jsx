import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';
import useStore from '../store/useStore';
import StatusBadge from '../components/ui/StatusBadge';
import Card from '../components/ui/Card';

export default function OrdersPage() {
  const getAllOrders = useStore((state) => state.getAllOrders);
  const orders = getAllOrders();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const highlightOrderId = searchParams.get('order');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, completed, pending
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedOrders = useMemo(() => {
    let result = orders;

    // Search by product name or order ID
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(o => 
        o.productName.toLowerCase().includes(term) || 
        o.id.toLowerCase().includes(term)
      );
    }

    // Filter
    if (statusFilter === 'completed') {
      result = result.filter(o => o.status === 'Completed');
    } else if (statusFilter === 'pending') {
      result = result.filter(o => o.status === 'Pending');
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (sortBy === 'date-desc') return dateB - dateA;
      if (sortBy === 'date-asc') return dateA - dateB;
      return 0;
    });

    return result;
  }, [orders, searchTerm, statusFilter, sortBy]);

  // Navigate to correct page if highlighting a specific order
  useEffect(() => {
    if (highlightOrderId) {
      const index = filteredAndSortedOrders.findIndex(o => o.id === highlightOrderId);
      if (index !== -1) {
        const page = Math.floor(index / itemsPerPage) + 1;
        const timer = setTimeout(() => setCurrentPage(page), 0);
        return () => clearTimeout(timer);
      }
    }
  }, [highlightOrderId, filteredAndSortedOrders]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const currentOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage fulfillment and track orders across platforms.</p>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID or product..."
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
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="relative flex items-center border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 bg-transparent text-sm">
              <ArrowUpDown className="h-4 w-4 mr-2 text-gray-400" />
              <select 
                className="bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 appearance-none pr-4 cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800/50 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-4 py-3 rounded-tl-lg">Order ID</th>
                <th scope="col" className="px-4 py-3">Product</th>
                <th scope="col" className="px-4 py-3">Platform</th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className={`border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all duration-500 ${order.id === highlightOrderId ? 'bg-primary/10 dark:bg-primary/20 border-l-4 border-l-primary' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <PackageOpen className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate max-w-[200px] sm:max-w-xs" title={order.productName}>{order.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-xs font-medium text-gray-600 dark:text-gray-300">
                        {order.platform}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge 
                        status={order.status === 'Completed' ? 'connected' : 'warning'} 
                        label={order.status} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="sm:hidden flex flex-col gap-3">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <div 
                key={`mobile-${order.id}`}
                className={`p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1A1D24] ${order.id === highlightOrderId ? 'ring-2 ring-primary bg-primary/5' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{order.id}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 bg-white dark:bg-[#111217] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 capitalize">
                      {order.platform}
                    </span>
                  </div>
                  <StatusBadge 
                    status={order.status === 'Completed' ? 'connected' : 'warning'} 
                    label={order.status} 
                  />
                </div>
                <div className="flex items-center mb-2">
                  <PackageOpen className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{order.productName}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(order.date).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No orders found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredAndSortedOrders.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedOrders.length}</span> Entries
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
