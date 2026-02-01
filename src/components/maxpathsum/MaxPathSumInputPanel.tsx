import { useState } from 'react';
import { Wand2, RefreshCw } from 'lucide-react';

type Props = {
  nodes: (number | null)[];
  onNodesChange: (nodes: (number | null)[]) => void;
};

function parseNodes(str: string): (number | null)[] {
  return str
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => (s.toLowerCase() === 'null' ? null : Number(s)));
}

const presets = [
  { label: 'Contoh klasik', value: '1,2,3' },
  { label: 'Ada negatif', value: '-10,9,20,null,null,15,7' },
  { label: 'Semua negatif', value: '-3,-2,null,-1' },
];

export default function MaxPathSumInputPanel({ nodes, onNodesChange }: Props) {
  const [local, setLocal] = useState(nodes.map((n) => (n === null ? 'null' : String(n))).join(','));

  const apply = (value: string) => {
    setLocal(value);
    onNodesChange(parseNodes(value));
  };

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Input level-order (pisahkan koma)</h3>
          <p className="text-sm text-slate-500">Gunakan kata <span className="font-semibold text-indigo-600">null</span> untuk node kosong.</p>
        </div>
        <button
          onClick={() => apply(local)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 text-sm font-semibold"
        >
          Terapkan
        </button>
      </div>

      <textarea
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        className="w-full rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 p-3 text-slate-700"
        rows={3}
      />

      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => apply(p.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 hover:border-indigo-200 bg-slate-50 text-sm font-semibold text-slate-700"
          >
            <Wand2 size={14} /> {p.label}
          </button>
        ))}
        <button
          onClick={() => apply('1,2,3')}
          className="px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm font-semibold flex items-center gap-1"
        >
          <RefreshCw size={14} /> Reset Default
        </button>
      </div>

      <div className="text-xs text-slate-500 bg-indigo-50 border border-indigo-100 rounded-xl p-3">
        Contoh: <span className="font-semibold text-indigo-700">-10,9,20,null,null,15,7</span>
      </div>
    </div>
  );
}
