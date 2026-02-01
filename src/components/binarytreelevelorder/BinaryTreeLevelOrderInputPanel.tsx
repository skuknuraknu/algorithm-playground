import { useState } from 'react';
import { TreeDeciduous, Shuffle, Info } from 'lucide-react';

interface Props {
  nodes: (number | null)[];
  setNodes: (nodes: (number | null)[]) => void;
}

const presets = [
  { label: 'Balanced', value: '3,9,20,null,null,15,7' },
  { label: 'Single Node', value: '1' },
  { label: 'Skewed Left', value: '1,2,null,3,null,4' },
  { label: 'Skewed Right', value: '1,null,2,null,3,null,4' },
];

export default function BinaryTreeLevelOrderInputPanel({ nodes, setNodes }: Props) {
  const [inputValue, setInputValue] = useState(nodes.join(','));

  const parse = (value: string) =>
    value
      .split(',')
      .map((s) => s.trim())
      .map((s) => {
        if (s === '' || s.toLowerCase() === 'null') return null;
        const n = Number(s);
        return Number.isNaN(n) ? null : n;
      });

  const handleChange = (value: string) => {
    setInputValue(value);
    setNodes(parse(value));
  };

  const handleRandom = () => {
    const len = Math.floor(Math.random() * 6) + 3; // 3-8 nodes
    const arr: (number | null)[] = [];
    for (let i = 0; i < len; i++) {
      const roll = Math.random();
      if (roll < 0.2) {
        arr.push(null);
      } else {
        arr.push(Math.floor(Math.random() * 30) - 5);
      }
    }
    setInputValue(arr.join(','));
    setNodes(arr);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <TreeDeciduous className="text-emerald-700" size={18} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Input Tree (Level-Order)</h3>
            <p className="text-sm text-slate-600">Gunakan <code>null</code> untuk node kosong.</p>
          </div>
        </div>
        <button
          onClick={handleRandom}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-slate-800"
        >
          <Shuffle size={18} /> Random
        </button>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-sm text-blue-800 flex gap-2">
        <Info size={16} className="mt-0.5" />
        Format: contoh <span className="font-mono">3,9,20,null,null,15,7</span>. Ini dibaca dari atas ke bawah, kiri ke kanan.
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 font-mono"
        placeholder="3,9,20,null,null,15,7"
      />

      <div>
        <div className="text-sm font-semibold text-slate-700 mb-2">Preset</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => handleChange(p.value)}
              className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-semibold"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-sm text-slate-700 font-mono">
        Current: [{nodes.join(', ')}]
      </div>
    </div>
  );
}
