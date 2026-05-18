import React from 'react';
import { X, Book, MessageCircle, FileText, Link, Store, BarChart2 } from 'lucide-react';

export default function HelpCenterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const tutorials = [
    { title: 'How to connect platforms', icon: Link, desc: 'Step-by-step guide to linking Amazon, Flipkart, and Meesho.', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Understanding Inventory Sync', icon: FileText, desc: 'Learn how we calculate your stock levels across platforms.', color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Offline Store Guide', icon: Store, desc: 'Using the OCR scanner to add physical inventory.', color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Analytics Deep Dive', icon: BarChart2, desc: 'Make sense of your revenue and profit margins.', color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white dark:bg-[#111217] w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg">
              <Book className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Guide</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Everything you need to master StockSync.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white/50 dark:hover:text-white dark:hover:bg-gray-800/50 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tutorials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="group p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:shadow-md transition-all cursor-pointer hover:border-gray-200 dark:hover:border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${item.bg} dark:bg-opacity-10 shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-5 flex items-center justify-between border border-gray-100 dark:border-gray-800">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Still need help?</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Our support team is available 24/7.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <MessageCircle className="h-4 w-4 text-blue-500" />
              Chat Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
