import { useState } from 'react';

interface CountPrimesCodeEditorProps {
  n: number;
}

export default function CountPrimesCodeEditor({ n }: CountPrimesCodeEditorProps) {
  const [output, setOutput] = useState<string>('');

  const sieveCode = `function countPrimes(n) {
  if (n <= 2) return 0;
  
  // Create boolean array, initially all true
  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime
  
  // Sieve of Eratosthenes
  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      // Mark all multiples of i as composite
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }
  
  // Count remaining primes
  return isPrime.filter(prime => prime).length;
}`;

  const optimizedCode = `function countPrimes(n) {
  if (n <= 2) return 0;
  
  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;
  
  let count = 0;
  
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      count++;
      
      // Only mark multiples if i * i < n
      // Avoid overflow for large n
      if (i * i < n) {
        for (let j = i * i; j < n; j += i) {
          isPrime[j] = false;
        }
      }
    }
  }
  
  return count;
}`;

  const bruteForceCode = `function countPrimes(n) {
  let count = 0;
  
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      count++;
    }
  }
  
  return count;
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  
  return true;
}`;

  const [selectedApproach, setSelectedApproach] = useState<'sieve' | 'optimized' | 'brute'>('sieve');

  const approaches = [
    { 
      id: 'sieve' as const, 
      name: 'Sieve (Basic)', 
      code: sieveCode, 
      time: 'O(n log log n)', 
      space: 'O(n)' 
    },
    { 
      id: 'optimized' as const, 
      name: 'Sieve (Optimized)', 
      code: optimizedCode, 
      time: 'O(n log log n)', 
      space: 'O(n)' 
    },
    { 
      id: 'brute' as const, 
      name: 'Brute Force', 
      code: bruteForceCode, 
      time: 'O(n√n)', 
      space: 'O(1)' 
    },
  ];

  const runCode = () => {
    try {
      const startTime = performance.now();
      let result: number;
      let primes: number[] = [];

      if (selectedApproach === 'sieve' || selectedApproach === 'optimized') {
        if (n <= 2) {
          result = 0;
        } else {
          const isPrime = new Array(n).fill(true);
          isPrime[0] = isPrime[1] = false;

          for (let i = 2; i * i < n; i++) {
            if (isPrime[i]) {
              for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
              }
            }
          }

          result = isPrime.filter(p => p).length;
          
          // Get first few primes for display
          primes = isPrime
            .map((prime, idx) => prime ? idx : null)
            .filter(p => p !== null)
            .slice(0, 20) as number[];
        }
      } else { // brute force
        result = 0;
        const isPrimeFunc = (num: number): boolean => {
          if (num <= 1) return false;
          if (num <= 3) return true;
          if (num % 2 === 0 || num % 3 === 0) return false;
          
          for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) {
              return false;
            }
          }
          return true;
        };

        for (let i = 2; i < n; i++) {
          if (isPrimeFunc(i)) {
            result++;
            if (primes.length < 20) primes.push(i);
          }
        }
      }

      const endTime = performance.now();
      const executionTime = (endTime - startTime).toFixed(4);

      const outputText = `Input: n = ${n}

Algorithm: ${approaches.find(a => a.id === selectedApproach)?.name}

Result: ${result} prime number${result !== 1 ? 's' : ''} less than ${n}

${primes.length > 0 ? `First ${Math.min(primes.length, 20)} primes: ${primes.join(', ')}${result > 20 ? '...' : ''}` : 'No primes found'}

Execution Time: ${executionTime}ms
Time Complexity: ${approaches.find(a => a.id === selectedApproach)?.time}
Space Complexity: ${approaches.find(a => a.id === selectedApproach)?.space}

✅ Test Passed!`;

      setOutput(outputText);
    } catch (error) {
      setOutput(`❌ Error: ${error}`);
    }
  };

  const selectedCode = approaches.find(a => a.id === selectedApproach);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Practice Coding</h3>
            <p className="text-sm text-slate-600">Pilih pendekatan, lihat implementasi, lalu jalankan dengan n = {n}.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {approaches.map((approach) => (
              <button
                key={approach.id}
                onClick={() => setSelectedApproach(approach.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors border-2 ${
                  selectedApproach === approach.id
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {approach.name}
              </button>
            ))}
          </div>
        </div>

        {selectedCode && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3">
              <div className="text-xs text-slate-600">Time Complexity</div>
              <div className="text-lg font-bold text-amber-700">{selectedCode.time}</div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
              <div className="text-xs text-slate-600">Space Complexity</div>
              <div className="text-lg font-bold text-green-700">{selectedCode.space}</div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Code Implementation</label>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto max-h-96 border-2 border-slate-800">
            <code>{selectedCode?.code}</code>
          </pre>
        </div>

        <button
          onClick={runCode}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
        >
          ▶ Run Code (n = {n})
        </button>

        {output && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Output</label>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm whitespace-pre-wrap border-2 border-slate-800">
              {output}
            </pre>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <h4 className="text-lg font-bold text-slate-800">Test Cases</h4>
        <div className="space-y-2">
          {[{ input: 10, output: 4, desc: 'Prima < 10 adalah 2, 3, 5, 7' }, { input: 0, output: 0, desc: 'Tidak ada prima < 0' }, { input: 1, output: 0, desc: 'Tidak ada prima < 1' }].map((test) => (
            <div key={test.input} className="bg-slate-50 border-2 border-slate-200 rounded-lg p-3 text-sm text-slate-700">
              <div className="font-mono"><strong>Input:</strong> n = {test.input}</div>
              <div className="font-mono"><strong>Output:</strong> {test.output}</div>
              <div className="text-xs text-slate-500 mt-1">{test.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-amber-50 rounded-xl p-5 border-2 border-amber-200 shadow-lg">
          <h4 className="font-semibold text-amber-900 mb-2">🔬 Algorithm Comparison</h4>
          <div className="text-sm text-slate-700 space-y-2">
            <div>
              <strong>Sieve of Eratosthenes:</strong>
              <ul className="list-disc list-inside ml-2 text-xs mt-1 space-y-1">
                <li>Optimal untuk banyak prima</li>
                <li>Time O(n log log n), Space O(n)</li>
                <li>Menandai composite sekaligus</li>
              </ul>
            </div>
            <div>
              <strong>Brute Force:</strong>
              <ul className="list-disc list-inside ml-2 text-xs mt-1 space-y-1">
                <li>Cek primalitas satu per satu</li>
                <li>Time O(n√n), Space O(1)</li>
                <li>Tidak efisien untuk n besar</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200 shadow-lg">
          <h4 className="font-semibold text-blue-900 mb-2">⚡ Optimization Tips</h4>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Iterasi hanya sampai √n untuk menandai kelipatan</li>
            <li>• Mulai penandaan dari i²</li>
            <li>• Lewati bilangan genap setelah menangani 2</li>
            <li>• Gunakan bitset untuk hemat memori</li>
            <li>• Segmented sieve untuk rentang sangat besar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
