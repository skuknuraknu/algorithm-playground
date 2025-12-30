import { ArrowDown } from 'lucide-react';

interface MoveZeroesVisualizerProps {
  nums: number[];
  result?: number[];
}

export default function MoveZeroesVisualizer({ nums, result }: MoveZeroesVisualizerProps) {
  // Calculate result if not provided
  const calculatedResult = result || (() => {
    const arr = [...nums];
    let writePos = 0;
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        arr[writePos] = arr[i];
        writePos++;
      }
    }
    
    for (let i = writePos; i < arr.length; i++) {
      arr[i] = 0;
    }
    
    return arr;
  })();

  return (
    <div className="space-y-8">
      {/* Original Array */}
      <div>
        <h4 className="text-lg font-bold text-slate-700 mb-3">Original Array</h4>
        <div className="flex flex-wrap gap-3 justify-center">
          {nums.map((num, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-lg font-mono text-2xl font-bold shadow-lg transition-all ${
                  num === 0
                    ? 'bg-red-500 text-white border-4 border-red-600'
                    : 'bg-blue-500 text-white border-4 border-blue-600'
                }`}
              >
                {num}
              </div>
              <div className="text-xs font-mono text-slate-500">
                [{index}]
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-b from-slate-300 to-slate-400 rounded-full p-3 shadow-lg">
          <ArrowDown size={32} className="text-white" />
        </div>
      </div>

      {/* Result Array */}
      <div>
        <h4 className="text-lg font-bold text-slate-700 mb-3">After Moving Zeroes</h4>
        <div className="flex flex-wrap gap-3 justify-center">
          {calculatedResult.map((num, index) => {
            const isZero = num === 0;
            const wasZero = nums[index] === 0;
            const moved = isZero !== wasZero;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-lg font-mono text-2xl font-bold shadow-lg transition-all ${
                    isZero
                      ? 'bg-red-500 text-white border-4 border-red-600'
                      : 'bg-green-500 text-white border-4 border-green-600'
                  } ${moved ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}`}
                >
                  {num}
                </div>
                <div className="text-xs font-mono text-slate-500">
                  [{index}]
                </div>
                {moved && (
                  <div className="text-xs font-bold text-yellow-600">
                    Moved
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">
              {nums.filter(n => n !== 0).length}
            </div>
            <div className="text-sm text-slate-600 mt-1">Non-Zero Elements</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600">
              {nums.filter(n => n === 0).length}
            </div>
            <div className="text-sm text-slate-600 mt-1">Zero Elements</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">
              {nums.length}
            </div>
            <div className="text-sm text-slate-600 mt-1">Total Elements</div>
          </div>
        </div>
      </div>
    </div>
  );
}
