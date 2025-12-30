import { LucideIcon } from 'lucide-react';

interface TabButtonProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({ name, icon: Icon, color, isActive, onClick }: TabButtonProps) {
  const colorClasses = {
    blue: {
      active: 'bg-blue-600 text-white',
      inactive: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
    },
    cyan: {
      active: 'bg-cyan-600 text-white',
      inactive: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
    },
    green: {
      active: 'bg-green-600 text-white',
      inactive: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
    },
    orange: {
      active: 'bg-orange-600 text-white',
      inactive: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
    },
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
        isActive ? colorClass.active : colorClass.inactive
      }`}
    >
      <Icon size={20} />
      <span>{name}</span>
    </button>
  );
}
