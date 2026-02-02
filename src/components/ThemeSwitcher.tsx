import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme';

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-all duration-300 border-2 border-slate-300 dark:border-slate-600 overflow-hidden"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            <div
                className={`absolute transition-all duration-500 ease-in-out ${theme === 'light'
                        ? 'rotate-0 opacity-100 scale-100'
                        : 'rotate-90 opacity-0 scale-50'
                    }`}
            >
                <Sun size={20} />
            </div>
            <div
                className={`absolute transition-all duration-500 ease-in-out ${theme === 'dark'
                        ? 'rotate-0 opacity-100 scale-100'
                        : '-rotate-90 opacity-0 scale-50'
                    }`}
            >
                <Moon size={20} />
            </div>
        </button>
    );
}
