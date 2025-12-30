import { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import gsap from 'gsap';

export default function GroupAnagramsCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (resultsRef.current) {
      gsap.fromTo(resultsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [resultsRef.current]);

  const [code, setCode] = useState(`function groupAnagrams(strs: string[]): string[][] {
  // Write your solution here
  // Group strings that are anagrams of each other
  
}`);

  const [testResults, setTestResults] = useState<{ passed: boolean; input: string[]; expected: string[][]; actual: string[][] | null; error?: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const testCases = [
    { 
      input: ["eat", "tea", "tan", "ate", "nat", "bat"], 
      expected: [["bat"],["nat","tan"],["ate","eat","tea"]] 
    },
    { 
      input: [""], 
      expected: [[""]] 
    },
    { 
      input: ["a"], 
      expected: [["a"]] 
    },
  ];

  // Helper to sort results for comparison since order of groups doesn't matter
  const normalizeResult = (res: string[][]) => {
    return res.map(group => group.sort()).sort((a, b) => a[0].localeCompare(b[0]));
  };

  const runTests = () => {
    const results = testCases.map((testCase) => {
      try {
        const userFunction = new Function(
          'strs',
          code + '\nreturn groupAnagrams(strs);'
        );

        const result = userFunction(testCase.input);
        
        // Normalize both expected and actual for comparison
        const normalizedExpected = normalizeResult(testCase.expected);
        const normalizedActual = normalizeResult(result);
        
        const passed = JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);

        return {
          passed,
          input: testCase.input,
          expected: testCase.expected,
          actual: result,
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
      <div ref={containerRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Code Editor</h3>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-indigo-500"
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
        <div ref={resultsRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
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
            {testResults.map((result, index) => (
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
                </div>

                <div className="ml-8 space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-slate-700">Input:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">
                      {JSON.stringify(result.input)}
                    </code>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Expected:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">
                      {JSON.stringify(result.expected)}
                    </code>
                  </div>
                  {result.actual && (
                    <div>
                      <span className="font-semibold text-slate-700">Your output:</span>{' '}
                      <code
                        className={`px-2 py-1 rounded border ${
                          result.passed
                            ? 'bg-green-100 border-green-300'
                            : 'bg-red-100 border-red-300'
                        }`}
                      >
                        {JSON.stringify(result.actual)}
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
            <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-lg animate-pulse">
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

      <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
        <h4 className="font-bold text-indigo-900 mb-2">Hints:</h4>
        <ul className="space-y-2 text-slate-700 list-disc list-inside">
          <li>Use a Hash Map to group strings</li>
          <li>The key for the map should be the sorted version of the string (e.g., "eat" → "aet")</li>
          <li>The value for the map should be a list of original strings</li>
          <li>Iterate through each string, sort it to find the key, and add to the corresponding list</li>
          <li>Finally, return all values from the map</li>
        </ul>
      </div>
    </div>
  );
}
