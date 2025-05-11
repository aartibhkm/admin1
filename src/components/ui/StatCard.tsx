import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-5 transition-all hover:shadow-lg ${className}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-slate-500 ml-1">from last period</span>
            </div>
          )}
        </div>
        <div className="rounded-full p-2 bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;