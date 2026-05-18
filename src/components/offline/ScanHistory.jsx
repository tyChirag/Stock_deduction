import React from 'react';
import { Clock, FileText } from 'lucide-react';
import Card from '../ui/Card';

export default function ScanHistory() {
  const history = [
    { id: 1, name: "inventory_sheet_01.jpg", items: 12, date: "2 hours ago" },
    { id: 2, name: "handwritten_notes.png", items: 5, date: "Yesterday" },
    { id: 3, name: "supplier_invoice_v2.pdf", items: 28, date: "3 days ago" },
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Recent Scans</h3>
      </div>
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
            <div className="mt-1 p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded text-sm">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]" title={item.name}>{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.items} products • {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
