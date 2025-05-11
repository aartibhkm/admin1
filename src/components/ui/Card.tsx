import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle,
  icon
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || subtitle || icon) && (
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center">
            {icon && <div className="mr-3">{icon}</div>}
            <div>
              {title && <h3 className="text-lg font-medium text-slate-900">{title}</h3>}
              {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;