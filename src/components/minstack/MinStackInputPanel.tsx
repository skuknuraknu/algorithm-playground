import { useMemo, useState } from 'react';
import { Plus, RotateCcw, Shuffle } from 'lucide-react';
import { MinStackOp, MinStackOpType } from './types';

interface MinStackInputPanelProps {
  operations: MinStackOp[];
  setOperations: (ops: MinStackOp[]) => void;
}

const presetScenarios: Record<string, MinStackOp[]> = {
  dasar: [
    { id: 'p1', type: 'push', value: 3 },
    { id: 'p2', type: 'push', value: 5 },
    { id: 'p3', type: 'getMin' },
    { id: 'p4', type: 'push', value: 2 },
    { id: 'p5', type: 'getMin' },
  ],
  duplikat: [
    { id: 'd1', type: 'push', value: 4 },
    { id: 'd2', type: 'push', value: 4 },
    { id: 'd3', type: 'push', value: 1 },
    { id: 'd4', type: 'pop' },
    { id: 'd5', type: 'getMin' },
  ],
  zigzag: [
    { id: 'z1', type: 'push', value: 7 },
    { id: 'z2', type: 'push', value: 3 },
    { id: 'z3', type: 'push', value: 6 },
    { id: 'z4', type: 'getMin' },
    { id: 'z5', type: 'pop' },
    { id: 'z6', type: 'getMin' },
    { id: 'z7', type: 'push', value: 2 },
    { id: 'z8', type: 'getMin' },
  ],
};

export default function MinStackInputPanel({ operations, setOperations }: MinStackInputPanelProps) {
  const [opType, setOpType] = useState<MinStackOpType>('push');
  const [value, setValue] = useState('');

  const addOperation = () => {
    if (opType === 'push') {
      const num = Number(value);
      if (Number.isNaN(num)) return;
      setOperations([
        ...operations,
        { id: `${Date.now()}-${operations.length}`, type: 'push', value: num },
      ]);
      setValue('');
      return;
    }

    setOperations([...operations, { id: `${Date.now()}-${operations.length}`, type: opType }]);
  };

  const handleReset = () => setOperations([]);

  const handleRandom = () => {
    const len = Math.floor(Math.random() * 5) + 4;
    const ops: MinStackOp[] = [];
    for (let i = 0; i < len; i++) {
      const roll = Math.random();
      if (roll < 0.55) {
        const val = Math.floor(Math.random() * 20) - 5;
        ops.push({ id: `r-${i}`, type: 'push', value: val });
      } else if (roll < 0.7) {
        ops.push({ id: `r-${i}`, type: 'pop' });
      } else if (roll < 0.85) {
        ops.push({ id: `r-${i}`, type: 'top' });
      } else {
        ops.push({ id: `r-${i}`, type: 'getMin' });
      }
    }
    setOperations(ops);
  };

  const stats = useMemo(() => {
    const pushes = operations.filter((op) => op.type === 'push').length;
    const others = operations.length - pushes;
    return { pushes, others };
  }, [operations]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Susun Daftar Operasi</h3>
            <p className="text-sm text-slate-600">Push nilai, lalu campur pop/top/getMin untuk diuji.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRandom}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-slate-800"
            >
              <Shuffle size={18} /> Random
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-2 rounded-lg font-semibold border border-rose-200 hover:bg-rose-200"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-4 flex gap-2">
            {(['push', 'pop', 'top', 'getMin'] as MinStackOpType[]).map((type) => (
              <button
                key={type}
                onClick={() => setOpType(type)}
                className={`flex-1 py-2 rounded-lg font-semibold capitalize border-2 transition-colors ${
                  opType === type ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="md:col-span-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nilai (hanya untuk push)</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={opType !== 'push'}
              placeholder="contoh: 3"
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 disabled:bg-slate-100"
            />
          </div>

          <div className="md:col-span-2">
            <button
              onClick={addOperation}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold shadow"
            >
              <Plus size={18} /> Tambah
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-slate-700">Daftar Operasi ({operations.length})</h4>
            <div className="text-xs text-slate-500">push: {stats.pushes} | lainnya: {stats.others}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {operations.map((op, idx) => (
              <span
                key={op.id}
                className="px-3 py-2 rounded-lg border-2 bg-slate-50 border-slate-200 text-sm font-mono flex items-center gap-2"
              >
                <span className="text-slate-500">{idx + 1}.</span>
                <span className="font-semibold text-indigo-700">{op.type}</span>
                {op.type === 'push' && <span className="text-emerald-700">{op.value}</span>}
                <button
                  onClick={() => setOperations(operations.filter((o) => o.id !== op.id))}
                  className="text-rose-500 hover:text-rose-700 text-xs"
                >
                  ✕
                </button>
              </span>
            ))}
            {operations.length === 0 && <span className="text-slate-400 italic">Belum ada operasi.</span>}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
        <div className="text-sm font-semibold text-slate-700 mb-2">Preset Skenario</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(presetScenarios).map(([key, ops]) => (
            <button
              key={key}
              onClick={() => setOperations(ops)}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 text-sm font-semibold"
            >
              {key === 'dasar' ? 'Dasar' : key === 'duplikat' ? 'Duplikat' : 'Zigzag' }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
