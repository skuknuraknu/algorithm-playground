import { useState } from 'react';
import { Wand2, RefreshCw, Upload } from 'lucide-react';

type Props = {
  serialized: string;
  onNodesChange: (nodes: (number | null)[], serialized?: string) => void;
  onSerializedChange: (value: string) => void;
};

function parseSerialized(str: string): (number | null)[] {
  return str
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => (s.toLowerCase() === 'null' ? null : Number(s)));
}

const presets = [
  { label: 'Balanced', value: '1,2,3,4,5,null,7' },
  { label: 'Skewed Left', value: '1,2,null,3,null,4' },
  { label: 'Sparse', value: '5,3,8,2,null,6,10,null,null,null,7' },
];

export default function SerializeTreeInputPanel({ serialized, onNodesChange, onSerializedChange }: Props) {
  const [local, setLocal] = useState(serialized);

  const handleApply = (value: string) => {
    setLocal(value);
    onSerializedChange(value);
    onNodesChange(parseSerialized(value), value);
  };

  const handleNodesUpdate = (value: string) => {
    setLocal(value);
    onSerializedChange(value);
    onNodesChange(parseSerialized(value), value);
  };

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Input level-order (pisah dengan koma)</h3>
          <p className="text-sm text-slate-500">Gunakan kata <span className="font-semibold text-indigo-600">null</span> untuk node kosong.</p>
        </div>
        <button
          onClick={() => handleApply(serialized)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 text-sm font-semibold"
        >
          <Upload size={16} />
          Terapkan
        </button>
      </div>

      <textarea
        value={local}
        onChange={(e) => handleNodesUpdate(e.target.value)}
        className="w-full rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 p-3 text-slate-700"
        rows={3}
      />

      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => handleApply(p.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 hover:border-indigo-200 bg-slate-50 text-sm font-semibold text-slate-700"
          >
            <Wand2 size={14} /> {p.label}
          </button>
        ))}
        <button
          onClick={() => handleApply('1,2,3,null,null,4,5')}
          className="px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm font-semibold flex items-center gap-1"
        >
          <RefreshCw size={14} /> Reset Default
        </button>
      </div>

      <div className="text-xs text-slate-500 bg-indigo-50 border border-indigo-100 rounded-xl p-3">
        Contoh format: <span className="font-semibold text-indigo-700">1,2,3,null,null,4,5</span> (level-order). Visualisasi & simulasi akan mengikuti string ini.
      </div>
    </div>
  );
}
