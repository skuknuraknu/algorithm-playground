import { RefreshCw, Package } from 'lucide-react';

interface FirstBadVersionInputPanelProps {
  totalVersions: number;
  firstBadVersion: number;
  onTotalVersionsChange: (total: number) => void;
  onFirstBadVersionChange: (bad: number) => void;
}

export default function FirstBadVersionInputPanel({
  totalVersions,
  firstBadVersion,
  onTotalVersionsChange,
  onFirstBadVersionChange,
}: FirstBadVersionInputPanelProps) {
  const handleReset = () => {
    onTotalVersionsChange(10);
    onFirstBadVersionChange(7);
  };

  const handleRandom = () => {
    const total = 10 + Math.floor(Math.random() * 21); // 10-30
    const bad = Math.floor(Math.random() * total) + 1; // 1 to total
    onTotalVersionsChange(total);
    onFirstBadVersionChange(bad);
  };

  const handleTotalChange = (newTotal: number) => {
    if (newTotal < 1) newTotal = 1;
    if (newTotal > 100) newTotal = 100;
    onTotalVersionsChange(newTotal);
    if (firstBadVersion > newTotal) {
      onFirstBadVersionChange(newTotal);
    }
  };

  const handleBadChange = (newBad: number) => {
    if (newBad < 1) newBad = 1;
    if (newBad > totalVersions) newBad = totalVersions;
    onFirstBadVersionChange(newBad);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Package className="text-orange-600" size={24} />
        Version Configuration
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
        {/* Total Versions */}
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Total Versions (n)
          </label>
          <input
            type="number"
            value={totalVersions}
            onChange={(e) => handleTotalChange(parseInt(e.target.value) || 1)}
            min="1"
            max="100"
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-2xl font-bold text-center"
          />
          <div className="text-xs text-slate-600 mt-2 text-center">
            Range: 1 - 100
          </div>
        </div>

        {/* First Bad Version */}
        <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            First Bad Version (hidden from algorithm)
          </label>
          <input
            type="number"
            value={firstBadVersion}
            onChange={(e) => handleBadChange(parseInt(e.target.value) || 1)}
            min="1"
            max={totalVersions}
            className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500 font-mono text-2xl font-bold text-center"
          />
          <div className="text-xs text-slate-600 mt-2 text-center">
            Range: 1 - {totalVersions}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleReset}
          className="flex-1 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} />
          Reset to Example
        </button>
        <button
          onClick={handleRandom}
          className="flex-1 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
        >
          Random Configuration
        </button>
      </div>

      {/* Visual Representation */}
      <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
        <div className="text-sm text-slate-600 mb-3 font-semibold">
          Version Timeline:
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: Math.min(totalVersions, 30) }, (_, i) => i + 1).map((version) => (
            <div
              key={version}
              className={`w-10 h-10 flex items-center justify-center rounded font-mono text-sm font-bold shadow-md ${
                version >= firstBadVersion
                  ? 'bg-red-500 text-white border-2 border-red-600'
                  : 'bg-green-500 text-white border-2 border-green-600'
              } ${
                version === firstBadVersion ? 'ring-4 ring-yellow-400 ring-offset-2 scale-110' : ''
              }`}
              title={version >= firstBadVersion ? 'Bad Version' : 'Good Version'}
            >
              {version}
            </div>
          ))}
          {totalVersions > 30 && (
            <div className="w-10 h-10 flex items-center justify-center text-slate-500 font-bold">
              ...
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded border border-green-600"></div>
            Good Versions: {firstBadVersion - 1}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded border border-red-600"></div>
            Bad Versions: {totalVersions - firstBadVersion + 1}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
        <p className="text-sm text-slate-700">
          <strong>Note:</strong> In the actual problem, the first bad version is unknown. 
          We set it here only for simulation and visualization purposes.
        </p>
      </div>
    </div>
  );
}
