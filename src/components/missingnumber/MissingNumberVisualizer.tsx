interface MissingNumberVisualizerProps {
  nums: number[];
}

export default function MissingNumberVisualizer({ nums }: MissingNumberVisualizerProps) {
  if (nums.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 text-center text-slate-500">
        Masukkan array untuk melihat visualisasi
      </div>
    );
  }

  const n = nums.length;
  const expectedRange = Array.from({ length: n + 1 }, (_, i) => i);
  const numsSet = new Set(nums);
  const missing = expectedRange.find(num => !numsSet.has(num));

  // Calculate expected sum and actual sum
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-6">
      {/* Input Array Visualization */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">📥 Input Array</h3>
        <div className="flex flex-wrap gap-2">
          {nums.map((num, idx) => (
            <div
              key={idx}
              className="w-16 h-16 flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg font-bold"
            >
              <div className="text-xs opacity-75">i={idx}</div>
              <div className="text-xl">{num}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Range */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">📊 Expected Range [0, {n}]</h3>
        <div className="flex flex-wrap gap-2">
          {expectedRange.map((num) => {
            const exists = numsSet.has(num);
            return (
              <div
                key={num}
                className={`w-16 h-16 flex items-center justify-center rounded-lg font-bold text-xl ${
                  exists
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white animate-pulse'
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Present in array</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Missing number</span>
          </div>
        </div>
      </div>

      {/* Math Approach Visualization */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">🧮 Math Approach (Gauss Formula)</h3>
        
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">Expected Sum (0 to {n}):</div>
            <div className="font-mono text-lg">
              {n} × ({n} + 1) / 2 = <span className="font-bold text-purple-600">{expectedSum}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-slate-600 mb-1">Actual Sum:</div>
            <div className="font-mono text-lg">
              {nums.join(' + ')} = <span className="font-bold text-blue-600">{actualSum}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border-2 border-red-400">
            <div className="text-sm text-gray-700 mb-1">Missing Number:</div>
            <div className="font-mono text-2xl font-bold text-red-600">
              {expectedSum} - {actualSum} = {missing}
            </div>
          </div>
        </div>
      </div>

      {/* XOR Approach Visualization */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">⚡ XOR Approach</h3>
        
        <div className="space-y-2 text-sm text-slate-700">
          <div className="bg-white p-3 rounded">
            <strong>Step 1:</strong> XOR all indices (0 to {n})
            <div className="font-mono mt-1">{expectedRange.join(' ⊕ ')}</div>
          </div>
          <div className="bg-white p-3 rounded">
            <strong>Step 2:</strong> XOR with all array elements
            <div className="font-mono mt-1">⊕ {nums.join(' ⊕ ')}</div>
          </div>
          <div className="bg-green-100 p-3 rounded border-2 border-green-400">
            <strong>Result:</strong> Numbers cancel out (a ⊕ a = 0), except missing number
            <div className="font-mono text-xl font-bold text-green-600 mt-1">Missing = {missing}</div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-600 bg-white p-3 rounded">
          
          <strong>Why XOR works:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>a ⊕ a = 0 (same numbers cancel)</li>
            <li>a ⊕ 0 = a (XOR with 0 returns original)</li>
            <li>XOR is commutative and associative</li>
          </ul>
        </div>
      </div>

      {/* Result */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-400">
        <h3 className="text-xl font-bold text-slate-800 mb-2">🎯 Missing Number</h3>
        <div className="text-5xl font-bold text-orange-600 text-center">
          {missing !== undefined ? missing : '?'}
        </div>
      </div>
    </div>
  );
}
