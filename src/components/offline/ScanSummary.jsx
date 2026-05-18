import React from 'react';
import { CheckCircle, Layers, FileText, BarChart2 } from 'lucide-react';

export default function ScanSummary({ scannedProducts }) {
  if (!scannedProducts || scannedProducts.length === 0) return null;

  const totalProducts = scannedProducts.length;
  const totalStock = scannedProducts.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  
  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Scan Summary</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1A1D24] p-3 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-lg">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Items</p>
            <p className="font-semibold text-gray-900 dark:text-white">{totalProducts}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1D24] p-3 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
            <BarChart2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Stock</p>
            <p className="font-semibold text-gray-900 dark:text-white">{totalStock}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1D24] p-3 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-lg">
            <CheckCircle className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Confidence</p>
            <p className="font-semibold text-gray-900 dark:text-white">High</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#1A1D24] p-3 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-500 rounded-lg">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Duplicates</p>
            <p className="font-semibold text-gray-900 dark:text-white">Auto-merged</p>
          </div>
        </div>
      </div>
    </div>
  );
}
