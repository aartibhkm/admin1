import React, { useState } from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  actions?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  className?: string;
}

function DataTable<T>({ 
  data, 
  columns, 
  keyExtractor, 
  actions, 
  onRowClick,
  className = '' 
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    if (!sortColumn) return data;

    return [...data].sort((a: any, b: any) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 cursor-pointer"
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {sortColumn === column.key && (
                    <span className="text-xs">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              </th>
            ))}
            {actions && <th className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 text-right text-sm font-medium text-slate-700">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {getSortedData().map((item) => (
            <tr 
              key={keyExtractor(item)}
              className={`hover:bg-slate-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column) => (
                <td 
                  key={`${keyExtractor(item)}-${column.key}`}
                  className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700"
                >
                  {column.render 
                    ? column.render(item) 
                    : (item as any)[column.key]}
                </td>
              ))}
              {actions && (
                <td className="border-b border-slate-200 px-4 py-3 text-right">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;