import { NavLink } from 'react-router-dom';
import { Home, Package, ShoppingCart, BarChart2, Settings, Store } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', to: '/dashboard' },
  { icon: Package, label: 'Inventory', to: '/inventory' },
  { icon: ShoppingCart, label: 'Orders', to: '/orders' },
  { icon: BarChart2, label: 'Analytics', to: '/analytics' },
  { icon: Store, label: 'Offline Store', to: '/offline-store' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform sm:translate-x-0 hidden sm:block">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
        <div className="mb-6 flex items-center pl-2">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xl font-bold">S</span>
          </div>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            StockSync
          </span>
        </div>
        
        <ul className="space-y-2 font-medium flex-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) => cn(
                  "group flex items-center rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
                  isActive && "bg-secondary text-foreground"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("h-5 w-5 transition-colors group-hover:text-foreground", isActive && "text-foreground")} />
                    <span className="ml-3">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto rounded-lg bg-primary/10 p-4 dark:bg-primary/5">
          <p className="mb-2 text-sm font-semibold text-primary">Pro Plan Active</p>
          <p className="text-xs text-muted-foreground">Your subscription ends in 14 days.</p>
        </div>
      </div>
    </aside>
  );
}
