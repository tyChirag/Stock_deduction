import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import Card from '../ui/Card';

export default function SetupProgress() {
  const { onboardingTasks } = useStore();
  
  const tasks = [
    { id: 'connectedPlatform', label: 'Connect your first platform', path: '/connect-platforms' },
    { id: 'customizedTheme', label: 'Customize your dashboard theme', path: '/settings' },
    { id: 'addedInventory', label: 'Add or sync your first product', path: '/inventory' },
    { id: 'enabledAlerts', label: 'Review notification settings', path: '/settings' }
  ];

  const completedCount = Object.values(onboardingTasks).filter(Boolean).length;
  const totalCount = tasks.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  if (completedCount === totalCount) return null;

  return (
    <Card className="mb-8 overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-100 dark:border-blue-900/30">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              👋 Welcome, Let's get you set up
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Complete these quick steps to get the most out of StockSync.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {progressPercentage}% Complete
            </span>
            <div className="w-32 h-2.5 bg-blue-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tasks.map((task, idx) => {
            const isCompleted = onboardingTasks[task.id];
            return (
              <Link key={task.id} to={task.path} className="block">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border transition-all ${
                    isCompleted 
                      ? 'bg-white/50 dark:bg-gray-900/50 border-green-200 dark:border-green-900/30 opacity-70' 
                      : 'bg-white dark:bg-[#111217] border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600 shrink-0" />
                      )}
                      <span className={`text-sm font-medium ${isCompleted ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                        {task.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
