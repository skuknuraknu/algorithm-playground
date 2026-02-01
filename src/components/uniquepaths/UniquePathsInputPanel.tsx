import React from 'react';
import { Settings2 } from 'lucide-react';

interface Props {
    m: number;
    setM: (val: number) => void;
    n: number;
    setN: (val: number) => void;
}

export default function UniquePathsInputPanel({ m, setM, n, setN }: Props) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-700 font-bold">
                <Settings2 size={20} />
                <h3>Grid Configuration</h3>
            </div>

            <div className="flex flex-wrap gap-8">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-600 mb-2">Rows (m): {m}</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={m}
                        onChange={(e) => setM(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>1</span>
                        <span>10</span>
                    </div>
                </div>

                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-slate-600 mb-2">Columns (n): {n}</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={n}
                        onChange={(e) => setN(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>1</span>
                        <span>10</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
