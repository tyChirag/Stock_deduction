import { cn } from '../../lib/utils';

export default function StatusBadge({ status, label, className }) {
  const variants = {
    connected: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    disconnected: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  };
  
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[status] || variants.disconnected, className)}>
      {label}
    </span>
  );
}
