import { useState } from 'react';
import { Play, Check, X, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n';

interface TestCase {
  input: number[];
  expected: number;
}

const defaultTestCases: TestCase[] = [
  { input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
  { input: [1, 1], expected: 1 },
  { input: [4, 3, 2, 1, 4], expected: 16 },
  { input: [1, 2, 1], expected: 2 },
];

export default function CodeEditor() {
  const { t } = useLanguage();
  const [userCode, setUserCode] = useState(`function maxArea(heights) {
  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;

  while (left < right) {
    const currentArea = Math.min(heights[left], heights[right]) * (right - left);
    maxArea = Math.max(maxArea, currentArea);

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}`);
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; output: number; expected: number; input: number[] }>
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = () => {
    setIsRunning(true);
    setError(null);
    const results: Array<{ passed: boolean; output: number; expected: number; input: number[] }> =
      [];

    try {
      const func = eval(`(${userCode})`);

      defaultTestCases.forEach((testCase) => {
        try {
          const output = func(testCase.input);
          results.push({
            passed: output === testCase.expected,
            output,
            expected: testCase.expected,
            input: testCase.input,
          });
        } catch (err) {
          results.push({
            passed: false,
            output: -1,
            expected: testCase.expected,
            input: testCase.input,
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
      {/* Code Editor */}
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
            {isRunning ? t.running : t.runTests}
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

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <div className="font-semibold text-red-800">{t.syntaxError}</div>
            <div className="text-sm text-red-700 mt-1">{error}</div>
          </div>
        </div>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">{t.testResults}</h3>
            <div
              className={`text-sm font-semibold px-4 py-2 rounded-full ${
                passedCount === totalCount
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {passedCount} / {totalCount} {t.passed}
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
                        {t.testCase} {index + 1}
                      </span>
                    </div>
                    <div className="text-sm space-y-1 ml-6">
                      <div className="text-slate-700">
                        <span className="font-medium">{t.input}:</span> [
                        {result.input.join(', ')}]
                      </div>
                      <div className="text-slate-700">
                        <span className="font-medium">{t.output}:</span> {result.expected}
                      </div>
                      <div
                        className={
                          result.passed ? 'text-green-700' : 'text-red-700'
                        }
                      >
                        <span className="font-medium">{t.yourOutput}:</span> {result.output}
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
