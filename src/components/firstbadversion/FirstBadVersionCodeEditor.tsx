import { useState } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';

export default function FirstBadVersionCodeEditor() {
  const [code, setCode] = useState(`/**
 * The API isBadVersion is defined for you.
 * isBadVersion(version: number): boolean
 */

function solution(isBadVersion: (version: number) => boolean) {
  return function(n: number): number {
    // Write your solution here
    // Find the first bad version minimizing API calls
    
  };
}
`);

  const [testResults, setTestResults] = useState<{
    passed: boolean;
    input: { n: number; bad: number };
    expected: number;
    actual: number | null;
    apiCalls: number;
    error?: string;
  }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const testCases = [
    { input: { n: 5, bad: 4 }, expected: 4 },
    { input: { n: 1, bad: 1 }, expected: 1 },
    { input: { n: 10, bad: 7 }, expected: 7 },
    { input: { n: 20, bad: 1 }, expected: 1 },
    { input: { n: 100, bad: 100 }, expected: 100 },
    { input: { n: 2126753390, bad: 1702766719 }, expected: 1702766719 },
  ];

  const runTests = () => {
    const results = testCases.map((testCase) => {
      try {
        let apiCallCount = 0;
        const isBadVersion = (version: number): boolean => {
          apiCallCount++;
          return version >= testCase.input.bad;
        };

        // Create user function
        const solutionFunc = new Function(
          'isBadVersion',
          code + '\nreturn solution(isBadVersion);'
        );

        const userFirstBadVersion = solutionFunc(isBadVersion);
        const result = userFirstBadVersion(testCase.input.n);

        const passed = result === testCase.expected;

        return {
          passed,
          input: testCase.input,
          expected: testCase.expected,
          actual: result,
          apiCalls: apiCallCount,
        };
      } catch (error) {
        return {
          passed: false,
          input: testCase.input,
          expected: testCase.expected,
          actual: null,
          apiCalls: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });

    setTestResults(results);
    setShowResults(true);
  };

  const passedTests = testResults.filter((r) => r.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Code Editor</h3>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-orange-500"
          spellCheck={false}
        />

        <button
          onClick={runTests}
          className="mt-4 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <Play size={20} />
          Run Tests
        </button>
      </div>

      {showResults && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Test Results</h3>
            <div
              className={`text-2xl font-bold ${
                passedTests === totalTests ? 'text-green-600' : 'text-orange-600'
              }`}
            >
              {passedTests} / {totalTests} Passed
            </div>
          </div>

          <div className="space-y-4">
            {testResults.map((result, index) => {
              const maxApiCalls = Math.ceil(Math.log2(result.input.n));
              const efficientApiCalls = result.apiCalls <= maxApiCalls;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    result.passed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CheckCircle className="text-green-600" size={24} />
                    ) : (
                      <XCircle className="text-red-600" size={24} />
                    )}
                    <span className="font-bold text-slate-800">Test Case {index + 1}</span>
                    {result.passed && efficientApiCalls && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                        Efficient
                      </span>
                    )}
                  </div>

                  <div className="ml-8 space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-slate-700">n (total versions):</span>{' '}
                      <code className="bg-white px-2 py-1 rounded border border-slate-300">
                        {result.input.n.toLocaleString()}
                      </code>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">First bad version:</span>{' '}
                      <code className="bg-white px-2 py-1 rounded border border-slate-300">
                        {result.expected}
                      </code>
                    </div>
                    {result.actual !== null && (
                      <div>
                        <span className="font-semibold text-slate-700">Your output:</span>{' '}
                        <code
                          className={`px-2 py-1 rounded border ${
                            result.passed
                              ? 'bg-green-100 border-green-300'
                              : 'bg-red-100 border-red-300'
                          }`}
                        >
                          {result.actual}
                        </code>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-slate-700">API calls made:</span>{' '}
                      <code
                        className={`px-2 py-1 rounded border font-bold ${
                          efficientApiCalls
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-orange-100 border-orange-300 text-orange-700'
                        }`}
                      >
                        {result.apiCalls} / {maxApiCalls} max
                      </code>
                    </div>
                    {result.error && (
                      <div className="text-red-700 bg-red-100 p-2 rounded border border-red-300">
                        <span className="font-semibold">Error:</span> {result.error}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {passedTests === totalTests && (
            <div className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle size={32} />
                <div>
                  <h4 className="text-xl font-bold">Congratulations! 🎉</h4>
                  <p>All test cases passed! You've successfully solved the problem.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
        <h4 className="font-bold text-orange-900 mb-2">Hints:</h4>
        <ul className="space-y-2 text-slate-700 list-disc list-inside">
          <li>Use binary search to minimize API calls</li>
          <li>Initialize left = 1, right = n</li>
          <li>If isBadVersion(mid) is true, search left half (right = mid)</li>
          <li>If isBadVersion(mid) is false, search right half (left = mid + 1)</li>
          <li>Continue until left equals right</li>
          <li>Be careful with integer overflow: use mid = left + (right - left) / 2</li>
        </ul>
      </div>
    </div>
  );
}
