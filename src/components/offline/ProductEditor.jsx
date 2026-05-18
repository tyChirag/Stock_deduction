import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';
import ProductImageUploader from './ProductImageUploader';

export default function ProductEditor({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product.name || '',
    stock: product.stock || 0,
    price: product.price || 0,
    category: product.category || '',
    sku: product.sku || '',
    image: product.image || ''
  });
  
  const [showImageUploader, setShowImageUploader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product.id, {
      name: form.name,
      stock: Number(form.stock),
      price: Number(form.price),
      category: form.category,
      sku: form.sku,
      image: form.image
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1D24] rounded-xl shadow-xl w-full max-w-2xl my-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Product</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {showImageUploader ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Update Image</h3>
                <button onClick={() => setShowImageUploader(false)} className="text-sm text-blue-500 hover:underline">Back to form</button>
              </div>
              <ProductImageUploader onImageSelect={({url}) => {
                setForm({...form, image: url});
                setShowImageUploader(false);
              }} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <div className="w-32 h-32 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 relative group">
                  {form.image && form.image !== "https://via.placeholder.com/300" ? (
                    <img src={form.image} alt={form.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="h-8 w-8 mb-1" />
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => setShowImageUploader(true)} className="text-white text-xs font-medium px-2 py-1 bg-blue-600 rounded">
                      Change
                    </button>
                  </div>
                </div>
                
                <div className="flex-grow space-y-4 w-full">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
                    <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity *</label>
                      <input required type="number" min="0" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                      <input type="number" min="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                  <input type="text" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800 mt-6">
                <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 dark:border-gray-700">Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
