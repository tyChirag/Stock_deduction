import { NavLink } from 'react-router-dom';
import { Home, Package, ShoppingCart, BarChart2, Settings, Store, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import useStore from '../../store/useStore';

const navItems = [
  { icon: Home, label: 'Dashboard', to: '/dashboard' },
  { icon: Package, label: 'Inventory', to: '/inventory' },
  { icon: ShoppingCart, label: 'Orders', to: '/orders' },
  { icon: BarChart2, label: 'Analytics', to: '/analytics' },
  { icon: Store, label: 'Offline Store', to: '/offline-store' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export default function Sidebar() {
  const { isMobileMenuOpen, setMobileMenu } = useStore();

  const handleNavClick = () => {
    if (window.innerWidth < 640) {
      setMobileMenu(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-card transition-transform duration-300 ease-in-out sm:translate-x-0",
        isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
          <div className="mb-6 flex items-center justify-between pl-2">
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-xl font-bold">S</span>
              </div>
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                StockSync
              </span>
            </div>
            {/* Mobile Close Button */}
            <button 
              onClick={() => setMobileMenu(false)}
              className="sm:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <ul className="space-y-2 font-medium flex-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  onClick={handleNavClick}
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
    </>
  );
}
