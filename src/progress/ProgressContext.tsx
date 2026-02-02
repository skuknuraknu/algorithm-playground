import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { ProblemId, PROBLEMS } from '../types/Problem';

interface ProgressStats {
    total: number;
    solved: number;
    percentage: number;
    easy: { total: number; solved: number };
    medium: { total: number; solved: number };
    hard: { total: number; solved: number };
}

interface ProgressContextType {
    solvedProblems: Set<ProblemId>;
    isSolved: (problemId: ProblemId) => boolean;
    markSolved: (problemId: ProblemId) => void;
    unmarkSolved: (problemId: ProblemId) => void;
    toggleSolved: (problemId: ProblemId) => void;
    stats: ProgressStats;
    resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'problem-progress';

export function ProgressProvider({ children }: { children: ReactNode }) {
    const [solvedProblems, setSolvedProblems] = useState<Set<ProblemId>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved) as ProblemId[];
                    return new Set(parsed);
                } catch {
                    return new Set();
                }
            }
        }
        return new Set();
    });

    // Save to localStorage whenever solvedProblems changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...solvedProblems]));
    }, [solvedProblems]);

    const isSolved = (problemId: ProblemId): boolean => {
        return solvedProblems.has(problemId);
    };

    const markSolved = (problemId: ProblemId) => {
        setSolvedProblems(prev => {
            const newSet = new Set(prev);
            newSet.add(problemId);
            return newSet;
        });
    };

    const unmarkSolved = (problemId: ProblemId) => {
        setSolvedProblems(prev => {
            const newSet = new Set(prev);
            newSet.delete(problemId);
            return newSet;
        });
    };

    const toggleSolved = (problemId: ProblemId) => {
        if (isSolved(problemId)) {
            unmarkSolved(problemId);
        } else {
            markSolved(problemId);
        }
    };

    const resetProgress = () => {
        setSolvedProblems(new Set());
    };

    // Calculate statistics
    const stats = useMemo<ProgressStats>(() => {
        const problems = Object.values(PROBLEMS);
        const total = problems.length;
        const solved = solvedProblems.size;

        const easyProblems = problems.filter(p => p.difficulty === 'Easy');
        const mediumProblems = problems.filter(p => p.difficulty === 'Medium');
        const hardProblems = problems.filter(p => p.difficulty === 'Hard');

        return {
            total,
            solved,
            percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
            easy: {
                total: easyProblems.length,
                solved: easyProblems.filter(p => solvedProblems.has(p.id)).length,
            },
            medium: {
                total: mediumProblems.length,
                solved: mediumProblems.filter(p => solvedProblems.has(p.id)).length,
            },
            hard: {
                total: hardProblems.length,
                solved: hardProblems.filter(p => solvedProblems.has(p.id)).length,
            },
        };
    }, [solvedProblems]);

    const value: ProgressContextType = {
        solvedProblems,
        isSolved,
        markSolved,
        unmarkSolved,
        toggleSolved,
        stats,
        resetProgress,
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
}
