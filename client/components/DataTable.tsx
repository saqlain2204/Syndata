'use client';

import { SyntheticDataItem } from '@/types/api';
import { Download } from 'lucide-react';

interface DataTableProps {
  data: SyntheticDataItem[];
  onDownload?: () => void;
}

export default function DataTable({ data, onDownload }: DataTableProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Generated Data ({data.length} items)
        </h3>
        {onDownload && (
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <Download size={18} />
            <span>Download CSV</span>
          </button>
        )}
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Query</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Expected Output</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-md">
                    <div className="line-clamp-3">{item.query}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-md">
                    <div className="line-clamp-3">{item.expected_output}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(item.context) ? (
                        <>
                          {item.context.slice(0, 2).map((ctx, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                              Context {i + 1}
                            </span>
                          ))}
                          {item.context.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                              +{item.context.length - 2} more
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                          No context
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
