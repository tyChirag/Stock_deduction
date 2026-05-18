import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight, Package, Link2, BarChart2 } from 'lucide-react';

export default function AssistantGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);

  const topics = [
    { id: 'connect', title: 'Connect Platforms', icon: Link2, desc: 'How to link Amazon & Flipkart' },
    { id: 'inventory', title: 'Inventory Setup', icon: Package, desc: 'Adding your first products' },
    { id: 'analytics', title: 'Understanding Analytics', icon: BarChart2, desc: 'Make sense of your data' }
  ];

  const content = {
    connect: "To connect a platform, go to Settings -> Integrations. Click 'Connect Account' and follow the secure OAuth flow. Your inventory will begin syncing immediately.",
    inventory: "Your inventory syncs automatically from connected platforms. To add offline products, use the 'Offline Store' page and click 'Add Product' or use the OCR Scanner.",
    analytics: "The analytics dashboard aggregates your total revenue, orders, and profit margins. Use the platform toggles to filter data for specific sales channels."
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl group flex items-center gap-2"
      >
        <Sparkles className="h-5 w-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-medium text-sm">
          Ask Assistant
        </span>
      </motion.button>

      {/* Assistant Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end sm:p-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full sm:w-[400px] h-full sm:h-[600px] sm:max-h-[85vh] bg-white dark:bg-[#111217] sm:rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">StockSync Assistant</h3>
                    <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl rounded-tl-sm p-4 w-[85%]">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Hi! 👋 I'm your StockSync Assistant. What can I help you set up today?
                  </p>
                </div>

                {activeTopic && (
                  <>
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 w-[85%] ml-auto">
                      <p className="text-sm">{topics.find(t => t.id === activeTopic)?.title}</p>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl rounded-tl-sm p-4 w-[90%]"
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                        {content[activeTopic]}
                      </p>
                      <button 
                        onClick={() => setActiveTopic(null)}
                        className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        Show other topics
                      </button>
                    </motion.div>
                  </>
                )}

                <AnimatePresence>
                  {!activeTopic && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 mt-4"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2 px-1">SUGGESTED TOPICS</p>
                      {topics.map((topic, idx) => (
                        <motion.button
                          key={topic.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={() => setActiveTopic(topic.id)}
                          className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
                        >
                          <div className="flex items-center gap-3 text-left">
                            <topic.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{topic.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{topic.desc}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Area (Mock) */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <div className="bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-3 flex items-center text-sm text-gray-400 cursor-not-allowed">
                  Ask me anything...
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
