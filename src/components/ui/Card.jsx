import { cn } from '../../lib/utils';

export default function Card({ children, className, onClick, ...props }) {
  return (
    <div 
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-800 dark:bg-[#111217] min-w-0", 
        onClick ? "cursor-pointer hover:border-blue-300 dark:hover:border-blue-900/50" : "",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
