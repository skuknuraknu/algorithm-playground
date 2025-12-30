import { LucideIcon } from 'lucide-react';
import { Problem } from '../../types/Problem';

interface ProblemCardProps {
  problem: Problem;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export default function ProblemCard({ problem, icon: Icon, isActive, onClick }: ProblemCardProps) {
  const difficultyColors = {
    Easy: 'text-green-600 bg-green-100',
    Medium: 'text-yellow-600 bg-yellow-100',
    Hard: 'text-red-600 bg-red-100',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white hover:bg-slate-50 border-2 border-slate-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
          <Icon size={24} className={isActive ? 'text-white' : 'text-slate-700'} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-slate-800'}`}>
              {problem.title}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded font-semibold ${
                isActive ? 'bg-white/20 text-white' : difficultyColors[problem.difficulty]
              }`}
            >
              {problem.difficulty}
            </span>
          </div>
          <p className={`text-sm ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
            {problem.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {problem.topics.map((topic) => (
              <span
                key={topic}
                className={`text-xs px-2 py-0.5 rounded ${
                  isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
