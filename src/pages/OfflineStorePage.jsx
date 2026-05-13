import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Package, Plus, Trash2, Edit2, ShoppingBag, AlertCircle, Save, X, Mic, MicOff } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';

export default function OfflineStorePage() {
  const { data, addOfflineProduct, sellOfflineProduct, updateOfflineProduct, deleteOfflineProduct } = useStore();
  const offlinePlatform = data.platforms.offline;
  const products = offlinePlatform?.productList || [];

  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', stock: 0, image: '' });
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', stock: 0 });

  const [isListening, setIsListening] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setFeedbackMessage('Voice input not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setFeedbackMessage('Listening... Speak a command like "Add 10 headphones"');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      
      const match = transcript.match(/(add|sell|update)\s+(\d+)\s+(.+)/i);
      
      if (!match) {
        setFeedbackMessage(`Could not understand command: "${transcript}"`);
        return;
      }

      const action = match[1];
      const quantity = parseInt(match[2], 10);
      const productName = match[3].trim();
      
      // Need fresh state for accurate finding, although 'products' from closure works mostly.
      const currentProducts = useStore.getState().data.platforms.offline.productList;
      const existingProduct = currentProducts.find(p => p.name.toLowerCase().includes(productName));

      if (action === 'add') {
        addOfflineProduct({
          name: productName,
          stock: quantity,
          image: 'https://images.unsplash.com/photo-1553456558-aff63285faa1?w=500'
        });
        setFeedbackMessage(`Added ${quantity} ${productName}`);
      } else if (action === 'sell') {
        if (existingProduct) {
          sellOfflineProduct(existingProduct.id, quantity);
          setFeedbackMessage(`Sold ${quantity} ${existingProduct.name}`);
        } else {
          setFeedbackMessage(`Could not find product to sell: ${productName}`);
        }
      } else if (action === 'update') {
        if (existingProduct) {
          updateOfflineProduct(existingProduct.id, { stock: quantity });
          setFeedbackMessage(`Updated ${existingProduct.name} stock to ${quantity}`);
        } else {
          setFeedbackMessage(`Could not find product to update: ${productName}`);
        }
      }
    };

    recognition.onerror = (event) => {
      // Ignore no-speech errors gracefully
      if (event.error !== 'no-speech') {
        setFeedbackMessage(`Error: ${event.error}`);
      } else {
        setFeedbackMessage('');
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.stock < 0) return;
    
    addOfflineProduct({
      name: newProduct.name,
      stock: parseInt(newProduct.stock, 10),
      image: newProduct.image || 'https://images.unsplash.com/photo-1553456558-aff63285faa1?w=500' // default box image
    });
    
    setNewProduct({ name: '', stock: 0, image: '' });
    setIsAdding(false);
  };

  const startEditing = (p) => {
    setEditingId(p.id);
    setEditForm({ name: p.name, stock: p.stock });
  };

  const saveEdit = (id) => {
    updateOfflineProduct(id, { name: editForm.name, stock: parseInt(editForm.stock, 10) });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Offline Store Inventory
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your physical store inventory and track offline sales.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant={isListening ? "danger" : "outline"}
            onClick={handleVoiceCommand} 
            disabled={isListening || !isSupported}
            className={`flex items-center gap-2 ${isListening ? 'animate-pulse' : ''}`}
            title="Try saying: Add 5 headphones"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? 'Listening...' : 'Voice Command'}
          </Button>
          <Button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2">
            {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isAdding ? 'Cancel' : 'Add Product'}
          </Button>
        </div>
      </div>

      {feedbackMessage && (
        <div className={`p-3 rounded-lg border text-sm flex items-center justify-between ${
          feedbackMessage.includes('Error') || feedbackMessage.includes('Could not') 
            ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400'
            : 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-900/50 dark:text-blue-400'
        }`}>
          <span>{feedbackMessage}</span>
          <button onClick={() => setFeedbackMessage('')} className="hover:opacity-70"><X className="h-4 w-4" /></button>
        </div>
      )}


      {isAdding && (
        <Card className="p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Add New Offline Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
              <input 
                required
                type="text" 
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                placeholder="e.g. Graphic T-Shirt"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Stock *</label>
              <input 
                required
                type="number" 
                min="0"
                value={newProduct.stock}
                onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL (Optional)</label>
              <input 
                type="text" 
                value={newProduct.image}
                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D24] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <Button type="submit">Save Product</Button>
            </div>
          </form>
        </Card>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#1A1D24] rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <Package className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No offline products</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't added any physical store inventory yet.</p>
          <Button onClick={() => setIsAdding(true)}>Add your first product</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => {
            const isLowStock = product.stock < 10;
            const isEditing = editingId === product.id;

            return (
              <Card key={product.id} className={`group relative overflow-hidden flex flex-col h-full ${isLowStock ? "border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20" : ""}`}>
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
                  {isLowStock && <StatusBadge status="danger" label="Low Stock" />}
                </div>
                
                {/* Image */}
                <div className="relative w-full h-40 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-4">
                  {isEditing ? (
                    <div className="space-y-3 mb-4">
                      <input 
                        type="text" 
                        value={editForm.name}
                        onChange={e => setEditForm({...editForm, name: e.target.value})}
                        className="w-full text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1 dark:text-white"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Stock:</span>
                        <input 
                          type="number" 
                          min="0"
                          value={editForm.stock}
                          onChange={e => setEditForm({...editForm, stock: e.target.value})}
                          className="w-20 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1 dark:text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2" title={product.name}>
                        {product.name}
                      </h4>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4 mt-auto">
                        <div className="flex items-center gap-1">
                          <ShoppingBag className="h-3.5 w-3.5" /> {product.sold} sold
                        </div>
                        <div className={`flex items-center gap-1 font-semibold ${isLowStock ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                          {isLowStock && <AlertCircle className="h-3.5 w-3.5" />}
                          Stock: {product.stock}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={() => saveEdit(product.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                          <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="px-2">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => sellOfflineProduct(product.id)} 
                          disabled={product.stock <= 0}
                          className="flex-1"
                        >
                          Sell (1)
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => startEditing(product)} className="px-2 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteOfflineProduct(product.id)} className="px-2 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/30">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
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
