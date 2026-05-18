import { cn } from '../../lib/utils';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className, 
  disabled, 
  ...props 
}) {
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    danger: "bg-transparent text-red-600 hover:bg-red-50 border border-red-200 dark:text-red-500 dark:border-red-900 dark:hover:bg-red-950/50",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
  };

  return (
    <motion.button 
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
