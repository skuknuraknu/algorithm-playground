import { ReactNode } from 'react';

interface TabContentWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function TabContentWrapper({ title, description, children }: TabContentWrapperProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
        <p className="text-slate-600 mb-6">{description}</p>
        {children}
      </div>
    </div>
  );
}
