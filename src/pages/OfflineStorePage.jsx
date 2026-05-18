import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Package, Plus, Trash2, Edit2, ShoppingBag, AlertCircle, X, Tag } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import AddProductModal from '../components/offline/AddProductModal';
import ProductEditor from '../components/offline/ProductEditor';

export default function OfflineStorePage() {
  const { data, addOfflineProduct, sellOfflineProduct, updateOfflineProduct, deleteOfflineProduct } = useStore();
  const offlinePlatform = data.platforms.offline;
  const products = offlinePlatform?.productList || [];

  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSmartScanAdd = (scannedProducts) => {
    let addedCount = 0;

    scannedProducts.forEach(scannedItem => {
      // Logic for fuzzy merge is inside addOfflineProduct now
      addOfflineProduct({
        name: scannedItem.product,
        stock: Number(scannedItem.quantity),
        price: scannedItem.price,
        category: scannedItem.category,
        sku: scannedItem.sku,
        image: scannedItem.image
      });
      addedCount++;
    });

    setFeedbackMessage(`Processed ${addedCount} product(s) successfully!`);
    setTimeout(() => setFeedbackMessage(''), 5000);
  };

  const handleSaveEdit = (id, updatedData) => {
    updateOfflineProduct(id, updatedData);
    setEditingProduct(null);
    setFeedbackMessage(`Updated ${updatedData.name} successfully!`);
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Offline Store Inventory
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your physical store inventory with smart tools.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setIsAddingModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3 rounded-lg border text-sm flex items-center justify-between bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-900/50 dark:text-green-400">
          <span>{feedbackMessage}</span>
          <button onClick={() => setFeedbackMessage('')} className="hover:opacity-70"><X className="h-4 w-4" /></button>
        </div>
      )}

      {isAddingModalOpen && (
        <AddProductModal 
          onClose={() => setIsAddingModalOpen(false)} 
          onAddProducts={handleSmartScanAdd} 
        />
      )}

      {editingProduct && (
        <ProductEditor 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          onSave={handleSaveEdit} 
        />
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#1A1D24] rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <Package className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No offline products</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't added any physical store inventory yet.</p>
          <Button onClick={() => setIsAddingModalOpen(true)}>Add your first product</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => {
            const isLowStock = product.stock < 10;

            return (
              <Card key={product.id} className={`group relative overflow-hidden flex flex-col h-full ${isLowStock ? "border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20" : ""}`}>
                <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
                  {isLowStock && <StatusBadge status="danger" label="Low Stock" />}
                </div>
                
                <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
                  />
                  {product.category && product.category !== 'Uncategorized' && (
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {product.category}
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 pr-2" title={product.name}>
                      {product.name}
                    </h4>
                    <span className="font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      ₹{(product.price || 0).toLocaleString()}
                    </span>
                  </div>
                  
                  {product.sku && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
                      SKU: {product.sku}
                    </p>
                  )}

                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4 mt-auto pt-2">
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-3.5 w-3.5" /> {product.sold} sold
                    </div>
                    <div className={`flex items-center gap-1 font-semibold ${isLowStock ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                      {isLowStock && <AlertCircle className="h-3.5 w-3.5" />}
                      Stock: {product.stock}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                    <Button 
                      size="sm" 
                      onClick={() => sellOfflineProduct(product.id)} 
                      disabled={product.stock <= 0}
                      className="flex-1"
                    >
                      Sell (1)
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)} className="px-2 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteOfflineProduct(product.id)} className="px-2 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/30">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
