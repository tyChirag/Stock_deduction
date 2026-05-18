import React, { useState } from 'react';
import { Check, Trash2, Plus, Edit2, Save, X, AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '../../ui/Button';
import ScanSummary from '../ScanSummary';

export default function ReviewInventoryModal({ initialData, rawText, onConfirm, onCancel, onRescan }) {
  const [items, setItems] = useState(initialData || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ product: '', quantity: 0, price: 0, category: '' });
  const [showDebug, setShowDebug] = useState(false);

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditForm({ ...items[index] });
  };

  const saveEdit = () => {
    const newItems = [...items];
    newItems[editingIndex] = { ...editForm, quantity: Number(editForm.quantity), price: Number(editForm.price) };
    setItems(newItems);
    setEditingIndex(null);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const addNewRow = () => {
    setItems([{ product: 'New Item', quantity: 1, price: 0, category: 'Uncategorized', confidence: 'High' }, ...items]);
    startEditing(0);
  };

  return (
    <div className="space-y-6">
      <ScanSummary scannedProducts={items} />

      <div className="bg-white dark:bg-[#1A1D24] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1D24] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Extracted Inventory Data</h3>
            <Button size="sm" variant="outline" onClick={() => setShowDebug(!showDebug)} className="text-xs border-dashed text-gray-500">
              {showDebug ? 'Hide Debug' : 'Show OCR Debug'}
            </Button>
          </div>
          <Button size="sm" variant="outline" onClick={addNewRow} className="flex items-center gap-1 border-gray-300 dark:border-gray-700">
            <Plus className="h-4 w-4" /> Add Row
          </Button>
        </div>
        
        {showDebug && (
          <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm max-h-60 overflow-y-auto border-b border-gray-800">
            <div className="mb-2 text-gray-400 border-b border-gray-800 pb-2">## RAW OCR OUTPUT:</div>
            <pre className="whitespace-pre-wrap">{rawText || 'No text extracted.'}</pre>
          </div>
        )}
        
        <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1A1D24] dark:text-gray-300 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const isEditing = editingIndex === index;
                const isLowConfidence = item.confidence === 'Low';
                const isMerged = item.isMerged;
                
                return (
                  <tr key={index} className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${isLowConfidence ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editForm.product} 
                          onChange={(e) => setEditForm({...editForm, product: e.target.value})}
                          className="w-full rounded border border-gray-300 dark:border-gray-600 px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">{item.product}</span>
                          {isMerged && (
                            <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                              Merged
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {!isEditing && item.confidence ? (
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                          item.confidence === 'High' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          item.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {item.confidence === 'Low' && <AlertTriangle className="h-3 w-3" />}
                          {item.confidence}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editForm.category || ''} 
                          onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                          className="w-full rounded border border-gray-300 dark:border-gray-600 px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                          placeholder="Category"
                        />
                      ) : (
                        <span className="text-gray-500">{item.category || '-'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={editForm.quantity} 
                          onChange={(e) => setEditForm({...editForm, quantity: e.target.value})}
                          className="w-20 rounded border border-gray-300 dark:border-gray-600 px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={editForm.price} 
                          onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                          className="w-24 rounded border border-gray-300 dark:border-gray-600 px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                        />
                      ) : (
                        `₹${(item.price || 0).toLocaleString()}`
                      )}
                    </td>
                    <td className="px-4 py-3 text-right flex justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded">
                            <Save className="h-4 w-4" />
                          </button>
                          <button onClick={() => setEditingIndex(null)} className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditing(index)} className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => removeItem(index)} className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No items found. Click 'Add Row' to manually add products.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-[#1A1D24] border-t border-gray-200 dark:border-gray-800 flex justify-between items-center gap-3">
          <Button variant="outline" onClick={onRescan} className="border-gray-300 dark:border-gray-700 flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Rescan Image
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onCancel} className="border-gray-300 dark:border-gray-700">Cancel</Button>
            <Button onClick={() => onConfirm(items)} className="flex items-center gap-2" disabled={items.length === 0}>
              <Check className="h-4 w-4" />
              Import {items.length} Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
