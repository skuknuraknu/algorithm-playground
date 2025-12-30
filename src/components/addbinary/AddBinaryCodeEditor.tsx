import { useState } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';

export default function AddBinaryCodeEditor() {
  const [code, setCode] = useState(`function addBinary(a: string, b: string): string {
  // Write your solution here
  return '';
}`);

  const [testResults, setTestResults] = useState<{ passed: boolean; input: { a: string; b: string }; expected: string; actual: string | null; error?: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const testCases = [
    { input: { a: '11', b: '1' }, expected: '100' },
    { input: { a: '1010', b: '1011' }, expected: '10101' },
    { input: { a: '0', b: '0' }, expected: '0' },
    { input: { a: '1111', b: '1' }, expected: '10000' },
  ];

  const runTests = () => {
    const results = testCases.map((testCase) => {
      try {
        const userFunction = new Function('a', 'b', code + '\nreturn addBinary(a, b);');
        const output = userFunction(testCase.input.a, testCase.input.b);
        const passed = output === testCase.expected;
        return {
          passed,
          input: testCase.input,
          expected: testCase.expected,
          actual: output,
        };
      } catch (error) {
        return {
          passed: false,
          input: testCase.input,
          expected: testCase.expected,
          actual: null,
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
          className="w-full h-64 p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500"
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
            <div className={`text-2xl font-bold ${passedTests === totalTests ? 'text-green-600' : 'text-orange-600'}`}>
              {passedTests} / {totalTests} Passed
            </div>
          </div>

          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  result.passed ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {result.passed ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                  <span className="font-bold text-slate-800">Test Case {index + 1}</span>
                </div>

                <div className="ml-8 space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-slate-700">Input:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">a = "{result.input.a}", b = "{result.input.b}"</code>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Expected:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">{result.expected}</code>
                  </div>
                  {result.actual !== null && (
                    <div>
                      <span className="font-semibold text-slate-700">Your output:</span>{' '}
                      <code className={`px-2 py-1 rounded border ${
                        result.passed ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
                      }`}>
                        {String(result.actual)}
                      </code>
                    </div>
                  )}
                  {result.error && (
                    <div className="text-red-700 bg-red-100 p-2 rounded border border-red-300">
                      <span className="font-semibold">Error:</span> {result.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {passedTests === totalTests && (
            <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle size={32} />
                <div>
                  <h4 className="text-xl font-bold">Great job! 🎉</h4>
                  <p>Semua test cases lulus. Penjumlahan binermu sudah benar.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
