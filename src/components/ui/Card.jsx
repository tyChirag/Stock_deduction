import { cn } from '../../lib/utils';

export default function Card({ children, className, onClick, ...props }) {
  return (
    <div 
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm transition-all dark:border-gray-800 dark:bg-[#111217]", 
        onClick ? "cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900/50" : "",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
