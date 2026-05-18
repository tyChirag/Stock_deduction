import React, { useState } from 'react';
import { X, Type, Mic, ScanLine, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';
import VoiceInput from './VoiceInput';
import ProductImageUploader from './ProductImageUploader';
import SmartScanner from './scanner/SmartScanner';

export default function AddProductModal({ onClose, onAddProducts }) {
  const [activeTab, setActiveTab] = useState('manual');

  const [manualForm, setManualForm] = useState({
    name: '', stock: '', price: '', category: '', sku: '', image: ''
  });

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.stock) return;
    onAddProducts([{
      product: manualForm.name,
      quantity: Number(manualForm.stock),
      price: Number(manualForm.price || 0),
      category: manualForm.category,
      sku: manualForm.sku,
      image: manualForm.image
    }]);
    onClose();
  };

  const handleParsedProducts = (products) => {
    onAddProducts(products);
    onClose();
  };

  const tabs = [
    { id: 'manual', label: 'Manual Entry', icon: Type },
    { id: 'voice', label: 'Voice Command', icon: Mic },
    { id: 'ocr', label: 'Smart Scan', icon: ScanLine },
    { id: 'image', label: 'Image Link', icon: ImageIcon },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1D24] rounded-xl shadow-xl w-full max-w-4xl my-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Offline Products</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'manual' && (
              <form onSubmit={handleManualSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
                    <input required type="text" value={manualForm.name} onChange={e => setManualForm({...manualForm, name: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity *</label>
                    <input required type="number" min="0" value={manualForm.stock} onChange={e => setManualForm({...manualForm, stock: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <input type="text" value={manualForm.category} onChange={e => setManualForm({...manualForm, category: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                    <input type="number" min="0" value={manualForm.price} onChange={e => setManualForm({...manualForm, price: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                    <input type="text" value={manualForm.sku} onChange={e => setManualForm({...manualForm, sku: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                    <input type="url" value={manualForm.image} onChange={e => setManualForm({...manualForm, image: e.target.value})} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" placeholder="https://..." />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            )}

            {activeTab === 'voice' && (
              <VoiceInput onParsedProducts={handleParsedProducts} />
            )}

            {activeTab === 'ocr' && (
              <SmartScanner 
                onComplete={handleParsedProducts}
                onCancel={onClose}
              />
            )}

            {activeTab === 'image' && (
              <div className="max-w-xl mx-auto">
                <ProductImageUploader onImageSelect={({url}) => {
                  setManualForm({...manualForm, image: url});
                  setActiveTab('manual');
                }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
