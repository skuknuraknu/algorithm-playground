interface RobotReturnVisualizerProps {
  moves: string;
}

export default function RobotReturnVisualizer({ moves }: RobotReturnVisualizerProps) {
  let x = 0;
  let y = 0;
  const path = [{ x, y }];

  for (const move of moves) {
    if (move === 'U') y += 1;
    else if (move === 'D') y -= 1;
    else if (move === 'R') x += 1;
    else if (move === 'L') x -= 1;
    path.push({ x, y });
  }

  const isOrigin = x === 0 && y === 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Path Visualization</h3>
          <p className="text-slate-600">Jejak posisi setelah setiap langkah.</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-semibold border-2 ${isOrigin ? 'bg-green-50 border-green-300 text-green-700' : 'bg-amber-50 border-amber-300 text-amber-700'}`}>
          {isOrigin ? 'Back to Origin' : 'Not at Origin'}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {path.map((p, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-2 ${idx === path.length - 1 ? 'border-cyan-300 bg-cyan-50' : 'border-slate-200 bg-slate-50'} shadow-sm`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Step {idx}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-700">{idx === 0 ? 'Start' : moves[idx - 1]}</span>
            </div>
            <div className="text-sm text-slate-700">Position: (<span className="font-semibold text-cyan-700">{p.x}</span>, <span className="font-semibold text-cyan-700">{p.y}</span>)</div>
          </div>
        ))}
      </div>

      <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-4 text-sm text-slate-700">
        <div className="font-semibold text-cyan-800 mb-1">Final Position</div>
        <div className="text-2xl font-bold text-cyan-700">({x}, {y})</div>
        <div className="text-xs text-slate-500 mt-1">Origin tercapai jika posisi akhir (0, 0).</div>
      </div>
    </div>
  );
}
