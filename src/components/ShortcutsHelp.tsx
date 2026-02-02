import { X, Keyboard } from 'lucide-react';
import { formatShortcut, ShortcutAction } from '../hooks/useKeyboardShortcuts';

interface ShortcutsHelpProps {
    isOpen: boolean;
    onClose: () => void;
    shortcuts: ShortcutAction[];
}

interface ShortcutGroup {
    title: string;
    shortcuts: ShortcutAction[];
}

export default function ShortcutsHelp({ isOpen, onClose, shortcuts }: ShortcutsHelpProps) {
    if (!isOpen) return null;

    // Group shortcuts by category
    const groups: ShortcutGroup[] = [
        {
            title: 'Navigation',
            shortcuts: shortcuts.filter(s =>
                ['1', '2', '3', '4', 'j', 'k', 'arrowdown', 'arrowup'].includes(s.key.toLowerCase()) ||
                (s.ctrlKey && s.key.toLowerCase() === 'k')
            ),
        },
        {
            title: 'Actions',
            shortcuts: shortcuts.filter(s =>
                ['m', 't', 'l', 'escape'].includes(s.key.toLowerCase()) && !s.ctrlKey
            ),
        },
        {
            title: 'Help',
            shortcuts: shortcuts.filter(s => s.key === '?'),
        },
    ].filter(group => group.shortcuts.length > 0);

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                            <Keyboard className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                            Keyboard Shortcuts
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X className="text-slate-600 dark:text-slate-400" size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {groups.map((group) => (
                        <div key={group.title}>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                                {group.title}
                            </h3>
                            <div className="space-y-2">
                                {group.shortcuts.map((shortcut, index) => (
                                    <div
                                        key={`${shortcut.key}-${index}`}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                    >
                                        <span className="text-slate-700 dark:text-slate-300">
                                            {shortcut.description}
                                        </span>
                                        <kbd className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md font-mono text-sm font-semibold border border-slate-300 dark:border-slate-600 shadow-sm">
                                            {formatShortcut(shortcut)}
                                        </kbd>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                        Press <kbd className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 font-mono text-xs">Esc</kbd> or click outside to close
                    </p>
                </div>
            </div>
        </div>
    );
}
