import React from 'react';
import { Sun, Moon, Monitor, LayoutGrid, Rows3, AlignJustify } from 'lucide-react';
import useStore from '../../store/useStore';
import Card from '../ui/Card';

export default function AppearanceSettings() {
  const { theme, toggleTheme, settings, updateSettings } = useStore();

  const handleDensityChange = (density) => {
    updateSettings('appearance', { density });
  };

  const handleAccentChange = (accentColor) => {
    updateSettings('appearance', { accentColor });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Customize the look and feel of your dashboard.</p>
      </div>

      <Card className="p-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Theme Preference</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => theme !== 'light' && toggleTheme()}
            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}
          >
            <Sun className={`h-8 w-8 ${theme === 'light' ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>Light Mode</span>
          </button>
          
          <button 
            onClick={() => theme !== 'dark' && toggleTheme()}
            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}
          >
            <Moon className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-700 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>Dark Mode</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all opacity-50 cursor-not-allowed"
          >
            <Monitor className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">System (Auto)</span>
          </button>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mb-8">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Dashboard Density</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'compact', label: 'Compact', icon: AlignJustify },
              { id: 'comfortable', label: 'Comfortable', icon: Rows3 },
              { id: 'spacious', label: 'Spacious', icon: LayoutGrid }
            ].map(density => {
              const Icon = density.icon;
              const isActive = settings.appearance.density === density.id;
              return (
                <button 
                  key={density.id}
                  onClick={() => handleDensityChange(density.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${isActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{density.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Accent Color</h4>
          <div className="flex gap-4">
            {['blue', 'purple', 'emerald', 'rose', 'amber'].map(color => {
              const colorClasses = {
                blue: 'bg-blue-500',
                purple: 'bg-purple-500',
                emerald: 'bg-emerald-500',
                rose: 'bg-rose-500',
                amber: 'bg-amber-500',
              };
              const isActive = settings.appearance.accentColor === color;
              return (
                <button
                  key={color}
                  onClick={() => handleAccentChange(color)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${colorClasses[color]} ${isActive ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#111217] ring-gray-400' : 'opacity-80 hover:opacity-100'}`}
                >
                  {isActive && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
