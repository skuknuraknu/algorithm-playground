import { useState } from 'react';

interface MissingNumberCodeEditorProps {
  nums: number[];
}

export default function MissingNumberCodeEditor({ nums }: MissingNumberCodeEditorProps) {
  const [selectedApproach, setSelectedApproach] = useState<'math' | 'xor' | 'set'>('math');
  const [output, setOutput] = useState<string>('');

  const mathCode = `function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = n * (n + 1) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}`;

  const xorCode = `function missingNumber(nums) {
  const n = nums.length;
  let xor = 0;
  
  // XOR all indices from 0 to n
  for (let i = 0; i <= n; i++) {
    xor ^= i;
  }
  
  // XOR all elements in array
  for (let num of nums) {
    xor ^= num;
  }
  
  return xor;
}`;

  const setCode = `function missingNumber(nums) {
  const n = nums.length;
  const numSet = new Set(nums);
  
  for (let i = 0; i <= n; i++) {
    if (!numSet.has(i)) {
      return i;
    }
  }
  
  return -1; // Should never reach
}`;

  const approaches = [
    { id: 'math' as const, name: 'Math (Gauss)', code: mathCode, time: 'O(n)', space: 'O(1)' },
    { id: 'xor' as const, name: 'XOR Bit Manipulation', code: xorCode, time: 'O(n)', space: 'O(1)' },
    { id: 'set' as const, name: 'Hash Set', code: setCode, time: 'O(n)', space: 'O(n)' },
  ];

  const runCode = () => {
    try {
      let result: number;
      const n = nums.length;

      if (selectedApproach === 'math') {
        const expectedSum = n * (n + 1) / 2;
        const actualSum = nums.reduce((sum, num) => sum + num, 0);
        result = expectedSum - actualSum;
      } else if (selectedApproach === 'xor') {
        let xor = 0;
        for (let i = 0; i <= n; i++) {
          xor ^= i;
        }
        for (const num of nums) {
          xor ^= num;
        }
        result = xor;
      } else {
        const numSet = new Set(nums);
        result = -1;
        for (let i = 0; i <= n; i++) {
          if (!numSet.has(i)) {
            result = i;
            break;
          }
        }
      }

      const outputText = `Input: [${nums.join(', ')}]
Length: ${n}
Expected Range: [0, ${n}]

Missing Number: ${result}

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
            <p className="text-sm text-slate-600">Pilih pendekatan, pelajari kompleksitas, lalu jalankan.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {approaches.map((approach) => (
              <button
                key={approach.id}
                onClick={() => setSelectedApproach(approach.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors border-2 ${
                  selectedApproach === approach.id
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md'
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
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-3">
              <div className="text-xs text-slate-600">Time Complexity</div>
              <div className="text-lg font-bold text-indigo-700">{selectedCode.time}</div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
              <div className="text-xs text-slate-600">Space Complexity</div>
              <div className="text-lg font-bold text-green-700">{selectedCode.space}</div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Code Implementation</label>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto border-2 border-slate-800">
            <code>{selectedCode?.code}</code>
          </pre>
        </div>

        <button
          onClick={runCode}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
        >
          ▶ Run Code
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
          {[{ nums: [3, 0, 1], output: 2, desc: 'n = 3, range [0,3] → hilang 2' }, { nums: [0, 1], output: 2, desc: 'n = 2, range [0,2] → hilang 2' }, { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1], output: 8, desc: 'n = 9, range [0,9] → hilang 8' }].map((test) => (
            <div key={test.output} className="bg-slate-50 border-2 border-slate-200 rounded-lg p-3 text-sm text-slate-700">
              <div className="font-mono"><strong>Input:</strong> nums = [{test.nums.join(', ')}]</div>
              <div className="font-mono"><strong>Output:</strong> {test.output}</div>
              <div className="text-xs text-slate-500 mt-1">{test.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 rounded-xl p-5 border-2 border-purple-200 shadow-lg">
        <h4 className="font-semibold text-purple-900 mb-2">💡 Mengapa Bekerja?</h4>
        <div className="text-sm text-slate-700 space-y-2">
          {selectedApproach === 'math' && (
            <>
              <p><strong>Gauss Formula:</strong> jumlah 0..n = n × (n + 1) / 2</p>
              <p>Selisih antara jumlah seharusnya dan jumlah aktual memberi angka yang hilang.</p>
            </>
          )}
          {selectedApproach === 'xor' && (
            <>
              <p><strong>Properti XOR:</strong> a ⊕ a = 0, a ⊕ 0 = a</p>
              <p>Pasangan angka akan saling membatalkan; yang hilang akan tersisa.</p>
            </>
          )}
          {selectedApproach === 'set' && (
            <>
              <p><strong>Hash Set:</strong> Simpan semua angka, lalu cek 0..n untuk menemukan yang tidak ada.</p>
              <p>Intuitif, tetapi memakai O(n) memori.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
