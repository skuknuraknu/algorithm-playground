import { Check, Circle } from 'lucide-react';
import { useProgress } from '../progress';
import { ProblemId } from '../types/Problem';

interface CompletionToggleProps {
    problemId: ProblemId;
    showLabel?: boolean;
}

export default function CompletionToggle({ problemId, showLabel = true }: CompletionToggleProps) {
    const { isSolved, toggleSolved } = useProgress();
    const solved = isSolved(problemId);

    return (
        <button
            onClick={() => toggleSolved(problemId)}
            className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${solved
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-dashed border-slate-300 dark:border-slate-500'
                }`}
        >
            <div
                className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${solved
                        ? 'bg-white border-white'
                        : 'border-slate-400 dark:border-slate-500 group-hover:border-green-500 dark:group-hover:border-green-400'
                    }`}
            >
                {solved ? (
                    <Check className="text-green-500" size={16} strokeWidth={3} />
                ) : (
                    <Circle className="text-slate-400 dark:text-slate-500 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors" size={12} />
                )}
            </div>
            {showLabel && (
                <span className={solved ? '' : 'group-hover:text-slate-800 dark:group-hover:text-slate-100'}>
                    {solved ? 'Completed!' : 'Mark as Done'}
                </span>
            )}
        </button>
    );
}
