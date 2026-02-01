import React from 'react';
import { RefreshCw } from 'lucide-react';

interface Props {
    nodes: (number | null)[];
    setNodes: (nodes: (number | null)[]) => void;
}

export default function BinaryTreeZigzagInputPanel({ nodes, setNodes }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const arr = val.split(',').map(v => {
            const trimmed = v.trim();
            if (trimmed === 'null' || trimmed === '') return null;
            const parsed = parseInt(trimmed);
            return isNaN(parsed) ? null : parsed;
        });
        setNodes(arr);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-700">Input Tree Array</h3>
                <button
                    onClick={() => setNodes([3, 9, 20, null, null, 15, 7])}
                    className="text-xs flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                >
                    <RefreshCw size={12} /> Reset
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    value={nodes.map(n => n === null ? 'null' : n).join(', ')}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-slate-200 rounded-lg font-mono text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. 1, 2, 3, null, null, 4, 5"
                />
                <p className="text-xs text-slate-500 mt-2">
                    Format: level-order array (e.g. <code>[1,2,3,null,5]</code>)
                </p>
            </div>
        </div>
    );
}
