import React, { useState } from 'react';
import { AlertTriangle, Trash2, Link2Off } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleDangerAction = (action) => {
    setConfirmAction(action);
    setShowConfirm(true);
  };

  const executeDangerAction = () => {
    console.log(`Executing ${confirmAction}...`);
    setShowConfirm(false);
    setConfirmAction(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-500">Danger Zone</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Irreversible, destructive actions. Proceed with extreme caution.</p>
      </div>

      <Card className="border-red-200 dark:border-red-900/50 overflow-hidden">
        <div className="divide-y divide-red-100 dark:divide-red-900/30">
          
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-red-50/30 dark:bg-red-900/5">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Disconnect All Platforms</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                Removes API access for all connected platforms. You will need to re-authenticate each platform manually to resume syncing.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="shrink-0 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20"
              onClick={() => handleDangerAction('disconnect_all')}
            >
              <Link2Off className="h-4 w-4 mr-2" /> Disconnect All
            </Button>
          </div>

          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-red-50/30 dark:bg-red-900/5">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Clear All Local Inventory</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                Wipes all offline store data, cached products, and history. This cannot be undone.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="shrink-0 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20"
              onClick={() => handleDangerAction('clear_inventory')}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Clear Inventory
            </Button>
          </div>

          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-red-50/50 dark:bg-red-900/10">
            <div>
              <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Delete Account</h4>
              <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1 max-w-lg">
                Permanently deletes your account, subscription, and all associated data from StockSync servers.
              </p>
            </div>
            <Button 
              className="shrink-0 bg-red-600 text-white hover:bg-red-700 border-0"
              onClick={() => handleDangerAction('delete_account')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" /> Delete Account
            </Button>
          </div>

        </div>
      </Card>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1A1D24] p-6 rounded-xl shadow-xl max-w-md w-full border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Are you absolutely sure?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              This action is destructive and cannot be reversed. Please confirm you want to proceed.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white border-0" onClick={executeDangerAction}>Yes, I'm sure</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
