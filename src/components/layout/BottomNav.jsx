import { NavLink } from 'react-router-dom';
import { Home, Package, ShoppingCart, BarChart2, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: Home, label: 'Home', to: '/dashboard' },
  { icon: Package, label: 'Stock', to: '/inventory' },
  { icon: ShoppingCart, label: 'Orders', to: '/orders' },
  { icon: BarChart2, label: 'Stats', to: '/analytics' },
  { icon: Settings, label: 'Config', to: '/settings' },
];

export default function BottomNav() {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-gray-200 bg-white/95 backdrop-blur-md pb-safe pt-2 px-2 dark:border-gray-800 dark:bg-[#09090b]/95 h-[68px]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full text-[10px] font-medium transition-colors",
            isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon className={cn("h-5 w-5 mb-1 transition-transform", isActive && "scale-110")} />
              <span className="truncate">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
