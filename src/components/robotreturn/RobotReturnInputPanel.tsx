interface RobotReturnInputPanelProps {
  moves: string;
  setMoves: (moves: string) => void;
}

const presets = [
  { label: 'Origin', moves: 'UDLR' },
  { label: 'Not Origin', moves: 'UUDDLR' },
  { label: 'Long Path', moves: 'UURRDDLL' },
  { label: 'Circle', moves: 'UDUDLRLR' },
];

export default function RobotReturnInputPanel({ moves, setMoves }: RobotReturnInputPanelProps) {
  const generateRandomMoves = () => {
    const options = ['U', 'D', 'L', 'R'];
    const length = Math.floor(Math.random() * 8) + 4;
    let sequence = '';
    for (let i = 0; i < length; i++) {
      sequence += options[Math.floor(Math.random() * options.length)];
    }
    setMoves(sequence);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Moves Input</h3>
          <p className="text-sm text-slate-600 mt-1">Gunakan karakter U, D, L, R untuk langkah robot.</p>
        </div>
        <button
          onClick={generateRandomMoves}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md"
        >
          🎲 Random
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Moves</label>
        <input
          type="text"
          value={moves}
          onChange={(e) => setMoves(e.target.value.toUpperCase().replace(/[^UDLR]/g, ''))}
          placeholder="contoh: UDLR"
          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 font-mono text-sm"
        />
        <p className="text-xs text-slate-500 mt-1">Karakter selain U/D/L/R akan dihapus otomatis.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Preset Examples</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setMoves(preset.moves)}
              className="px-3 py-2 bg-cyan-50 text-cyan-800 rounded-lg hover:bg-cyan-100 transition-colors text-sm border-2 border-cyan-200 font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2">
        <div className="text-sm font-semibold text-slate-700">Ringkasan</div>
        <div className="text-sm text-slate-600 space-y-1">
          <div>Length: <span className="font-semibold text-cyan-700">{moves.length}</span> steps</div>
          <div className="font-mono text-xs">Sequence: {moves || '-'} </div>
        </div>
      </div>
    </div>
  );
}
