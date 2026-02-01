import { RotateCw, Shuffle } from 'lucide-react';

interface Props {
    heights: number[];
    setHeights: (h: number[]) => void;
}

export default function TrappingRainWaterInputPanel({ heights, setHeights }: Props) {
    const presets = [
        { name: 'Standard', val: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
        { name: 'Valley', val: [4, 2, 0, 3, 2, 5] },
        { name: 'Stairs', val: [0, 1, 2, 3, 4, 5] }, // No water
        { name: 'Pyramid', val: [0, 2, 4, 2, 0] }, // No water
        { name: 'Random', val: [] }, // Handled by button
    ];

    const randomize = () => {
        const len = 10 + Math.floor(Math.random() * 5);
        const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 6));
        setHeights(arr);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700">Input Heights Array</h3>
                <div className="flex gap-2">
                    <button onClick={randomize} className="text-xs flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-bold transition-colors">
                        <Shuffle size={14} /> Random
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {presets.map((p) => (
                    <button
                        key={p.name}
                        onClick={() => p.name === 'Random' ? randomize() : setHeights(p.val)}
                        className="px-3 py-1.5 rounded border border-slate-300 text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <div className="bg-slate-100 p-4 rounded-lg flex flex-wrap gap-2 font-mono text-sm border-inner shadow-inner">
                {heights.length === 0 ? <span className="text-slate-400">Empty Array</span> :
                    heights.map((h, i) => (
                        <div key={i} className="group relative">
                            <input
                                type="number"
                                min={0}
                                max={10}
                                className="w-8 h-10 text-center rounded bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                value={h}
                                onChange={(e) => {
                                    const val = Math.max(0, parseInt(e.target.value) || 0);
                                    const newArr = [...heights];
                                    newArr[i] = val;
                                    setHeights(newArr);
                                }}
                            />
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {i}
                            </span>
                        </div>
                    ))
                }
                <button
                    onClick={() => setHeights([...heights, 0])}
                    className="w-8 h-10 flex items-center justify-center rounded border-2 border-dashed border-slate-300 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
                >
                    +
                </button>
                {heights.length > 0 && (
                    <button
                        onClick={() => setHeights(heights.slice(0, -1))}
                        className="w-8 h-10 flex items-center justify-center rounded border border-rose-200 bg-rose-50 text-rose-400 hover:bg-rose-100 transition-colors"
                    >
                        x
                    </button>
                )}
            </div>
            <p className="text-xs text-slate-500 mt-2 text-right">
                *Klik nilai untuk edit manual
            </p>
        </div>
    );
}
