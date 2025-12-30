import { CheckCircle, XCircle } from 'lucide-react';

interface FirstBadVersionVisualizerProps {
  totalVersions: number;
  firstBadVersion: number;
}

export default function FirstBadVersionVisualizer({
  totalVersions,
  firstBadVersion,
}: FirstBadVersionVisualizerProps) {
  const findFirstBadVersion = (): { result: number; apiCalls: number; callHistory: { version: number; isBad: boolean }[] } => {
    const callHistory: { version: number; isBad: boolean }[] = [];
    const isBadVersion = (version: number): boolean => {
      const isBad = version >= firstBadVersion;
      callHistory.push({ version, isBad });
      return isBad;
    };

    let left = 1;
    let right = totalVersions;

    while (left < right) {
      const mid = Math.floor(left + (right - left) / 2);
      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return {
      result: left,
      apiCalls: callHistory.length,
      callHistory,
    };
  };

  const { result, apiCalls, callHistory } = findFirstBadVersion();
  const correct = result === firstBadVersion;

  return (
    <div className="space-y-8">
      {/* Version Timeline */}
      <div>
        <h4 className="text-lg font-bold text-slate-700 mb-3">Version Timeline</h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: Math.min(totalVersions, 30) }, (_, i) => i + 1).map((version) => {
            const isBad = version >= firstBadVersion;
            const wasChecked = callHistory.some(call => call.version === version);
            const isResult = version === result;

            return (
              <div key={version} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg font-mono text-lg font-bold shadow-lg transition-all ${
                    isBad
                      ? 'bg-red-500 text-white border-4 border-red-600'
                      : 'bg-green-500 text-white border-4 border-green-600'
                  } ${
                    isResult
                      ? 'ring-4 ring-yellow-400 ring-offset-2 scale-125'
                      : ''
                  } ${
                    wasChecked && !isResult
                      ? 'opacity-75 ring-2 ring-blue-300'
                      : ''
                  }`}
                >
                  {version}
                </div>
                {wasChecked && (
                  <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    API
                  </div>
                )}
                {isResult && (
                  <div className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    Found
                  </div>
                )}
              </div>
            );
          })}
          {totalVersions > 30 && (
            <div className="flex items-center justify-center text-slate-500 font-bold text-2xl">
              ...
            </div>
          )}
        </div>
      </div>

      {/* Result Display */}
      <div className={`rounded-lg p-6 border-2 ${
        correct
          ? 'bg-green-50 border-green-300'
          : 'bg-red-50 border-red-300'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {correct ? (
              <CheckCircle className="text-green-600" size={40} />
            ) : (
              <XCircle className="text-red-600" size={40} />
            )}
            <div>
              <div className="text-sm text-slate-600">Algorithm Result</div>
              <div className={`text-4xl font-bold font-mono ${
                correct ? 'text-green-700' : 'text-red-700'
              }`}>
                Version {result}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Actual First Bad</div>
            <div className="text-4xl font-bold font-mono text-slate-700">
              Version {firstBadVersion}
            </div>
          </div>
        </div>

        <div className={`text-center py-3 rounded font-bold text-lg ${
          correct
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {correct ? '✓ Correct!' : '✗ Incorrect'}
        </div>
      </div>

      {/* API Call History */}
      <div className="bg-white rounded-lg p-6 border-2 border-slate-200">
        <h4 className="text-lg font-bold text-slate-700 mb-3">
          API Call History ({apiCalls} calls)
        </h4>
        <div className="space-y-2">
          {callHistory.map((call, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                call.isBad
                  ? 'bg-red-50 border-red-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-sm font-mono font-bold text-slate-500">
                  Call #{index + 1}
                </div>
                <div className="font-mono font-bold text-lg">
                  isBadVersion({call.version})
                </div>
              </div>
              <div className={`flex items-center gap-2 font-bold ${
                call.isBad ? 'text-red-700' : 'text-green-700'
              }`}>
                {call.isBad ? (
                  <>
                    <XCircle size={20} />
                    true (BAD)
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    false (GOOD)
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
        <div className="grid grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{totalVersions}</div>
            <div className="text-sm text-slate-600 mt-1">Total Versions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">{apiCalls}</div>
            <div className="text-sm text-slate-600 mt-1">API Calls</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">
              {Math.ceil(Math.log2(totalVersions))}
            </div>
            <div className="text-sm text-slate-600 mt-1">Max O(log n)</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">
              {((1 - apiCalls / totalVersions) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-slate-600 mt-1">Efficiency</div>
          </div>
        </div>
      </div>
    </div>
  );
}
