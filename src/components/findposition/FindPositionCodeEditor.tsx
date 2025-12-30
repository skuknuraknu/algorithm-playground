import { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import gsap from 'gsap';

export default function FindPositionCodeEditor() {
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
  }, [resultsRef.current]); // Re-run when results container appears

  const [code, setCode] = useState(`function searchRange(nums: number[], target: number): number[] {
  // Tulis solusimu di sini
  // Kembalikan [posisi_awal, posisi_akhir] dari target
  // Kembalikan [-1, -1] jika target tidak ditemukan
  
}`);

  const [testResults, setTestResults] = useState<{ passed: boolean; input: { nums: number[]; target: number }; expected: number[]; actual: number[] | null; error?: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const testCases = [
    { input: { nums: [5, 7, 7, 8, 8, 10], target: 8 }, expected: [3, 4] },
    { input: { nums: [5, 7, 7, 8, 8, 10], target: 6 }, expected: [-1, -1] },
    { input: { nums: [], target: 0 }, expected: [-1, -1] },
    { input: { nums: [1], target: 1 }, expected: [0, 0] },
    { input: { nums: [2, 2], target: 2 }, expected: [0, 1] },
    { input: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 5 }, expected: [4, 4] },
  ];

  const runTests = () => {
    const results = testCases.map((testCase) => {
      try {
        const userFunction = new Function(
          'nums',
          'target',
          code + '\nreturn searchRange(nums, target);'
        );

        const result = userFunction(testCase.input.nums, testCase.input.target);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);

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
        <h3 className="text-xl font-bold text-slate-800 mb-4">Editor Kode</h3>

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
          Jalankan Tes
        </button>
      </div>

      {showResults && (
        <div ref={resultsRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Hasil Tes</h3>
            <div
              className={`text-2xl font-bold ${
                passedTests === totalTests ? 'text-green-600' : 'text-orange-600'
              }`}
            >
              {passedTests} / {totalTests} Lolos
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
                    <span className="font-semibold text-slate-700">Array:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">
                      [{result.input.nums.join(', ')}]
                    </code>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Target:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">
                      {result.input.target}
                    </code>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Ekspektasi:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">
                      [{result.expected.join(', ')}]
                    </code>
                  </div>
                  {result.actual && (
                    <div>
                      <span className="font-semibold text-slate-700">Output Kamu:</span>{' '}
                      <code
                        className={`px-2 py-1 rounded border ${
                          result.passed
                            ? 'bg-green-100 border-green-300'
                            : 'bg-red-100 border-red-300'
                        }`}
                      >
                        [{result.actual.join(', ')}]
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
                  <h4 className="text-xl font-bold">Selamat! 🎉</h4>
                  <p>Semua test case berhasil! Kamu telah menyelesaikan masalah ini.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
        <h4 className="font-bold text-indigo-900 mb-2">Petunjuk:</h4>
        <ul className="space-y-2 text-slate-700 list-disc list-inside">
          <li>Gunakan binary search dua kali: sekali untuk posisi awal, sekali untuk posisi akhir</li>
          <li>Saat mencari posisi awal: jika target ketemu, terus cari ke KIRI</li>
          <li>Saat mencari posisi akhir: jika target ketemu, terus cari ke KANAN</li>
          <li>Kedua pencarian harus berjalan dalam waktu O(log n)</li>
          <li>Tangani kasus khusus: array kosong, target tidak ditemukan</li>
        </ul>
      </div>
    </div>
  );
}
