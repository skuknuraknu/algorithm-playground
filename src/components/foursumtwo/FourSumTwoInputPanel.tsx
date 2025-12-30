import { useState } from 'react';

interface FourSumTwoInputPanelProps {
  a: number[];
  b: number[];
  c: number[];
  d: number[];
  setA: (v: number[]) => void;
  setB: (v: number[]) => void;
  setC: (v: number[]) => void;
  setD: (v: number[]) => void;
}

const presets = [
  { label: 'Default', a: [1, 2], b: [-2, -1], c: [-1, 2], d: [0, 2] },
  { label: 'Zeros', a: [0], b: [0], c: [0], d: [0] },
  { label: 'Mix', a: [1, -1], b: [-1, 1], c: [0], d: [0] },
  { label: 'Negative', a: [-1, -2], b: [1, 2], c: [-1, 1], d: [0, 2] },
  { label: 'Large', a: [1, 2, 3], b: [-3, -2, -1], c: [0, 1], d: [0, -1] },
  { label: 'No Match', a: [1, 2, 3], b: [4, 5, 6], c: [7, 8], d: [9, 10] },
  { label: 'All Match', a: [0, 0], b: [0, 0], c: [0, 0], d: [0, 0] },
  { label: 'Complex', a: [1, 2, -1, -2], b: [3, -3, 0], c: [2, -2], d: [1, -1, 0] },
];

function parseList(value: string): number[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

export default function FourSumTwoInputPanel({ a, b, c, d, setA, setB, setC, setD }: FourSumTwoInputPanelProps) {
  const [localA, setLocalA] = useState(a.join(', '));
  const [localB, setLocalB] = useState(b.join(', '));
  const [localC, setLocalC] = useState(c.join(', '));
  const [localD, setLocalD] = useState(d.join(', '));

  const sync = () => {
    setA(parseList(localA));
    setB(parseList(localB));
    setC(parseList(localC));
    setD(parseList(localD));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Input Arrays</h3>
        <button
          onClick={sync}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow"
        >
          Apply
        </button>
      </div>

      {[
        { label: 'A', value: localA, setter: setLocalA },
        { label: 'B', value: localB, setter: setLocalB },
        { label: 'C', value: localC, setter: setLocalC },
        { label: 'D', value: localD, setter: setLocalD },
      ].map(({ label, value, setter }) => (
        <div key={label}>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Array {label}</label>
          <input
            value={value}
            onChange={(e) => setter(e.target.value)}
            onBlur={sync}
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="contoh: 1, 2, -1"
          />
        </div>
      ))}

      <div>
        <div className="text-sm font-semibold text-slate-700 mb-2">Contoh Preset:</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setLocalA(p.a.join(', '));
                setLocalB(p.b.join(', '));
                setLocalC(p.c.join(', '));
                setLocalD(p.d.join(', '));
                setA(p.a);
                setB(p.b);
                setC(p.c);
                setD(p.d);
              }}
              className="px-3 py-2 bg-indigo-50 text-indigo-800 rounded-lg border-2 border-indigo-200 text-sm font-semibold hover:bg-indigo-100 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
