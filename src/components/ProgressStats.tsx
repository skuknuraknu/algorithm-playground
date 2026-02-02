import { Trophy, Target, Flame, Zap } from 'lucide-react';
import { useProgress } from '../progress';

export default function ProgressStats() {
    const { stats } = useProgress();

    return (
        <div className="bg-white dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Main Progress */}
                    <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-md">
                            <Trophy className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Progress: {stats.solved}/{stats.total} Solved
                                </span>
                                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                                    {stats.percentage}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${stats.percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Difficulty Breakdown */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Easy */}
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Zap className="text-green-600 dark:text-green-400" size={16} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Easy</div>
                                <div className="text-sm font-bold text-green-600 dark:text-green-400">
                                    {stats.easy.solved}/{stats.easy.total}
                                </div>
                            </div>
                        </div>

                        {/* Medium */}
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                <Target className="text-orange-600 dark:text-orange-400" size={16} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Medium</div>
                                <div className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                    {stats.medium.solved}/{stats.medium.total}
                                </div>
                            </div>
                        </div>

                        {/* Hard */}
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <Flame className="text-red-600 dark:text-red-400" size={16} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Hard</div>
                                <div className="text-sm font-bold text-red-600 dark:text-red-400">
                                    {stats.hard.solved}/{stats.hard.total}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
