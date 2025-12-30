import { useState } from 'react';
import { Play, Check, X, AlertCircle } from 'lucide-react';

interface TestCase {
  people: number[];
  limit: number;
  expected: number;
}

const defaultTestCases: TestCase[] = [
  { people: [1, 2], limit: 3, expected: 1 },
  { people: [3, 2, 2, 1], limit: 3, expected: 3 },
  { people: [3, 5, 3, 4], limit: 5, expected: 4 },
  { people: [5, 1, 4, 2], limit: 6, expected: 2 },
  { people: [1, 2, 2, 3], limit: 3, expected: 3 },
];

export default function BoatsCodeEditor() {
  const [userCode, setUserCode] = useState(`function numRescueBoats(people, limit) {
  people.sort((a, b) => a - b);

  let left = 0;
  let right = people.length - 1;
  let boats = 0;

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++;
    }
    right--;
    boats++;
  }

  return boats;
}`);
  const [testResults, setTestResults] = useState<
    Array<{
      passed: boolean;
      output: number;
      expected: number;
      people: number[];
      limit: number;
    }>
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = () => {
    setIsRunning(true);
    setError(null);
    const results: Array<{
      passed: boolean;
      output: number;
      expected: number;
      people: number[];
      limit: number;
    }> = [];

    try {
      const func = eval(`(${userCode})`);

      defaultTestCases.forEach((testCase) => {
        try {
          const output = func([...testCase.people], testCase.limit);
          results.push({
            passed: output === testCase.expected,
            output,
            expected: testCase.expected,
            people: testCase.people,
            limit: testCase.limit,
          });
        } catch (err) {
          results.push({
            passed: false,
            output: -1,
            expected: testCase.expected,
            people: testCase.people,
            limit: testCase.limit,
          });
        }
      });

      setTestResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error running code');
    } finally {
      setTimeout(() => setIsRunning(false), 500);
    }
  };

  const passedCount = testResults.filter((r) => r.passed).length;
  const totalCount = testResults.length;

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-3 text-sm text-slate-400 font-mono">solution.js</span>
          </div>
          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Play size={14} />
            {isRunning ? 'Running...' : 'Run Tests'}
          </button>
        </div>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="w-full bg-slate-900 text-slate-100 font-mono text-sm p-4 focus:outline-none resize-none"
          rows={18}
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <div className="font-semibold text-red-800">Syntax Error</div>
            <div className="text-sm text-red-700 mt-1">{error}</div>
          </div>
        </div>
      )}

      {testResults.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Test Results</h3>
            <div
              className={`text-sm font-semibold px-4 py-2 rounded-full ${
                passedCount === totalCount
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {passedCount} / {totalCount} Passed
            </div>
          </div>

          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  result.passed
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {result.passed ? (
                        <Check className="text-green-600" size={18} />
                      ) : (
                        <X className="text-red-600" size={18} />
                      )}
                      <span className="font-semibold text-slate-800">
                        Test Case {index + 1}
                      </span>
                    </div>
                    <div className="text-sm space-y-1 ml-6">
                      <div className="text-slate-700">
                        <span className="font-medium">People:</span> [
                        {result.people.join(', ')}]
                      </div>
                      <div className="text-slate-700">
                        <span className="font-medium">Limit:</span> {result.limit}
                      </div>
                      <div className="text-slate-700">
                        <span className="font-medium">Expected:</span> {result.expected}{' '}
                        boats
                      </div>
                      <div
                        className={result.passed ? 'text-green-700' : 'text-red-700'}
                      >
                        <span className="font-medium">Your Output:</span> {result.output}{' '}
                        boats
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
