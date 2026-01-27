import { useState } from 'react';
import { ListOrdered, Sparkles } from 'lucide-react';

interface KthSmallestInputPanelProps {
  onNodesChange: (nodes: (number | null)[]) => void;
  onKChange: (k: number) => void;
}

const parseNodes = (value: string) =>
  value.split(',').map((v) => {
    const t = v.trim().toLowerCase();
    if (t === 'null' || t === '') return null;
    const n = parseInt(t, 10);
    return Number.isNaN(n) ? null : n;
  });

export default function KthSmallestInputPanel({ onNodesChange, onKChange }: KthSmallestInputPanelProps) {
  const [inputValue, setInputValue] = useState('5,3,6,2,4,null,null,1');
  const [kValue, setKValue] = useState(3);

  const handleNodesChange = (value: string) => {
    setInputValue(value);
    const parsed = parseNodes(value);
    onNodesChange(parsed);
  };

  const handleKChange = (value: string) => {
    const n = parseInt(value, 10);
    setKValue(Number.isNaN(n) ? 1 : n);
    onKChange(Number.isNaN(n) ? 1 : n);
  };

  const presets = [
    { label: 'BST Balanced (k=3)', nodes: '5,3,6,2,4,null,null,1', k: 3 },
    { label: 'BST Skewed (k=2)', nodes: '3,1,4,null,2', k: 2 },
    { label: 'BST Larger (k=5)', nodes: '7,3,10,2,5,9,12,1,null,4,6', k: 5 },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 shadow-xl border-2 border-indigo-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
          <ListOrdered size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Input BST & nilai k</h3>
          <p className="text-sm text-slate-500">Gunakan level-order (pakai "null" untuk node kosong)</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Nodes (level-order)</label>
          <input
            value={inputValue}
            onChange={(e) => handleNodesChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
            placeholder="contoh: 5,3,6,2,4,null,null,1"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">k (urutan elemen)</label>
          <input
            type="number"
            min={1}
            value={kValue}
            onChange={(e) => handleKChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
            placeholder="misal 3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setInputValue(p.nodes);
                setKValue(p.k);
                onNodesChange(parseNodes(p.nodes));
                onKChange(p.k);
              }}
              className="px-4 py-3 bg-white border-2 border-indigo-100 hover:border-indigo-300 rounded-xl shadow-sm text-sm font-semibold text-slate-700 flex items-center gap-2 transition"
            >
              <Sparkles size={16} className="text-indigo-500" />
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
