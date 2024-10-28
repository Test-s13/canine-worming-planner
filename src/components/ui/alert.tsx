import React from 'react';

export const Alert: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`}>
    {children}
  </div>
);

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm">{children}</p>
);
