import { Shuffle } from 'lucide-react';

interface ValidParenthesesInputPanelProps {
  value: string;
  setValue: (v: string) => void;
}

const presets = [
  { label: 'Balanced 1', value: '()[]{}' },
  { label: 'Nested', value: '{[()]}' },
  { label: 'Invalid Mix', value: '([)]' },
  { label: 'Deep', value: '((({[]})))' },
];

const chars = ['(', ')', '[', ']', '{', '}'];

export default function ValidParenthesesInputPanel({ value, setValue }: ValidParenthesesInputPanelProps) {
  const handleRandom = () => {
    const len = Math.floor(Math.random() * 8) + 4; // 4-11 chars
    let s = '';
    for (let i = 0; i < len; i++) {
      s += chars[Math.floor(Math.random() * chars.length)];
    }
    setValue(s);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Input String</h3>
          <p className="text-sm text-slate-600">Gunakan karakter (), [], {'{}'} untuk diuji.</p>
        </div>
        <button
          onClick={handleRandom}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-slate-800"
        >
          <Shuffle size={18} /> Random
        </button>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="contoh: {[()]}"
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 font-mono"
      />

      <div>
        <div className="text-sm font-semibold text-slate-700 mb-2">Preset</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setValue(p.value)}
              className="px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 text-sm font-semibold"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-sm text-slate-700 font-mono">
        Current: {value || '(kosong)'}
      </div>
    </div>
  );
}
