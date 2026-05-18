import React from 'react';
import useStore from '../../store/useStore';
import Card from '../ui/Card';

export default function InventoryPreferences() {
  const { settings, updateSettings } = useStore();
  const invSettings = settings.inventory;

  const handleToggle = (key) => {
    updateSettings('inventory', { [key]: !invSettings[key] });
  };

  const handleSelect = (key, value) => {
    updateSettings('inventory', { [key]: value });
  };

  const ToggleItem = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md">{description}</p>
      </div>
      <button 
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shrink-0 ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Preferences</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configure how the system handles stock logic.</p>
      </div>

      <Card className="p-6 space-y-6">
        
        <div className="space-y-3">
          <ToggleItem 
            title="Auto Sync Inventory" 
            description="Automatically push local stock deductions to connected platforms." 
            checked={invSettings.autoSync} 
            onChange={() => handleToggle('autoSync')} 
          />
          <ToggleItem 
            title="Auto Detect Duplicate Products" 
            description="Fuzzy matching will merge identical items (e.g. 'AirPods' and 'Air Pods')." 
            checked={invSettings.autoDetectDuplicates} 
            onChange={() => handleToggle('autoDetectDuplicates')} 
          />
          <ToggleItem 
            title="Enable Smart Alerts" 
            description="AI-driven suggestions for restocking based on sales velocity." 
            checked={invSettings.smartAlerts} 
            onChange={() => handleToggle('smartAlerts')} 
          />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Default Low Stock Threshold</label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Triggers a warning when stock drops below this number.</p>
            <input 
              type="number" 
              value={invSettings.lowStockThreshold}
              onChange={(e) => handleSelect('lowStockThreshold', parseInt(e.target.value) || 0)}
              className="w-full max-w-[150px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1A1D24] dark:text-white transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">OCR Scanner Mode</label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Determines the parsing strictness for images.</p>
            <select 
              value={invSettings.ocrMode}
              onChange={(e) => handleSelect('ocrMode', e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#1A1D24] dark:text-white transition-shadow"
            >
              <option value="fast">Fast (Lower Accuracy)</option>
              <option value="standard">Standard (Balanced)</option>
              <option value="accurate">Highly Accurate (Slower)</option>
            </select>
          </div>
        </div>

      </Card>
    </div>
  );
}
