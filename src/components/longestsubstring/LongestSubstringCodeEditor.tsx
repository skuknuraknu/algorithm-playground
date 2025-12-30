import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import gsap from 'gsap';

export default function LongestSubstringCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  }, []);

  const [code, setCode] = useState(`function lengthOfLongestSubstring(s: string): number {
  // Tulis solusi kamu di sini
  // Kembalikan panjang substring terpanjang tanpa karakter berulang
  
}`);

  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: number; actual: number | null; error?: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const testCases = [
    { input: 'abcabcbb', expected: 3 },
    { input: 'bbbbb', expected: 1 },
    { input: 'pwwkew', expected: 3 },
    { input: '', expected: 0 },
    { input: 'dvdf', expected: 3 },
    { input: 'abcdefghijklmnopqrstuvwxyz', expected: 26 },
    { input: 'au', expected: 2 },
  ];

  const runTests = () => {
    const results = testCases.map((testCase) => {
      try {
  // Buat fungsi dari kode pengguna
        const userFunction = new Function('s', code + '\nreturn lengthOfLongestSubstring(s);');
        
        const result = userFunction(testCase.input);
        const passed = result === testCase.expected;
        
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

  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Editor Kode</h3>
        <p className="text-sm text-slate-600 mb-4">Lengkapi fungsi <code className="bg-slate-100 px-2 py-1 rounded">lengthOfLongestSubstring</code> menggunakan teknik sliding window.</p>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-purple-500"
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
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Hasil Tes</h3>
            <div className={`text-2xl font-bold ${passedTests === totalTests ? 'text-green-600' : 'text-orange-600'}`}>
              {passedTests} / {totalTests} Lulus
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
                  <span className="font-bold text-slate-800">
                    Test Case {index + 1}
                  </span>
                </div>

                <div className="ml-8 space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-slate-700">Input:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">
                      "{result.input}"
                    </code>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Ekspektasi:</span>{' '}
                    <code className="bg-white px-2 py-1 rounded border border-slate-300">
                      {result.expected}
                    </code>
                  </div>
                  {result.actual !== null && (
                    <div>
                      <span className="font-semibold text-slate-700">Output kamu:</span>{' '}
                      <code className={`px-2 py-1 rounded border ${
                        result.passed ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
                      }`}>
                        {result.actual}
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
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle size={32} />
                <div>
                  <h4 className="text-xl font-bold">Selamat! 🎉</h4>
                  <p>Semua test case lulus. Kamu berhasil menyelesaikan masalah ini.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
  <h4 className="font-bold text-purple-900 mb-2">Petunjuk:</h4>
        <ul className="space-y-2 text-slate-700 list-disc list-inside">
          <li>Pakai teknik sliding window dengan dua pointer (left dan right)</li>
          <li>Gunakan Set atau Map untuk melacak karakter dalam jendela</li>
          <li>Jika ada duplikat, geser pointer left hingga karakter duplikat keluar</li>
          <li>Simpan ukuran jendela maksimum yang pernah didapat</li>
          <li>Setiap karakter dikunjungi maksimal dua kali → O(n)</li>
        </ul>
      </div>
    </div>
  );
}
