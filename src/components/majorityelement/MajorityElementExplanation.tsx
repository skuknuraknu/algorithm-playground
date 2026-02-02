export default function MajorityElementExplanation() {
  return (
    <div className="space-y-6">
      {/* Problem Introduction */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 shadow-lg border-2 border-violet-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">👑</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Majority Element</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Diberikan array <code className="bg-white px-2 py-1 rounded border border-violet-300 font-semibold">nums</code> berisi n elemen,
              temukan elemen yang muncul <strong className="text-violet-700">lebih dari ⌊n/2⌋ kali</strong>.
            </p>
            <div className="bg-white border-2 border-violet-200 rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-2">Contoh: Array dengan 7 elemen</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-600">n = 7, maka ⌊7/2⌋ = 3</span>
                <span className="text-violet-600">→</span>
                <span className="font-bold text-violet-700">Majority element muncul {">"} 3 kali (minimal 4 kali)</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">
              <strong className="text-violet-700">Jaminan:</strong> Selalu ada majority element dalam array (tidak perlu handle edge case).
            </p>
          </div>
        </div>
      </div>

      {/* Visual Example */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">📊 Contoh Visual</h3>
        <div className="space-y-4">
          {/* Example 1 */}
          <div className="bg-violet-50 border-2 border-violet-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl">✅</div>
              <div className="font-semibold text-violet-700">Example 1</div>
            </div>
            <div className="space-y-3">
              <div className="bg-white border border-violet-200 rounded p-3">
                <div className="text-sm text-slate-600 mb-2">Input:</div>
                <div className="flex gap-2 flex-wrap">
                  {[2, 2, 1, 1, 1, 2, 2].map((num, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-lg font-bold ${num === 2
                        ? 'bg-violet-500 text-white border-2 border-violet-600'
                        : 'bg-slate-100 text-slate-600 border border-slate-300'
                        }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white border border-violet-200 rounded p-3">
                  <div className="text-slate-600">Frekuensi:</div>
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-violet-600">2:</span>
                      <div className="flex-1 bg-violet-100 rounded-full h-2">
                        <div className="bg-violet-500 h-2 rounded-full" style={{ width: '57%' }} />
                      </div>
                      <span className="font-bold text-violet-600">4 kali</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-600">1:</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div className="bg-slate-400 h-2 rounded-full" style={{ width: '43%' }} />
                      </div>
                      <span className="font-bold text-slate-600">3 kali</span>
                    </div>
                  </div>
                </div>
                <div className="bg-violet-100 border border-violet-300 rounded p-3">
                  <div className="text-slate-600 mb-1">Output:</div>
                  <div className="text-3xl font-bold text-violet-700">2</div>
                  <div className="text-xs text-slate-600 mt-1">4 {">"}  ⌊7/2⌋ = 3 ✓</div>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl">✅</div>
              <div className="font-semibold text-emerald-700">Example 2</div>
            </div>
            <div className="space-y-3">
              <div className="bg-white border border-emerald-200 rounded p-3">
                <div className="text-sm text-slate-600 mb-2">Input:</div>
                <div className="flex gap-2 flex-wrap">
                  {[3, 2, 3].map((num, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-lg font-bold ${num === 3
                        ? 'bg-emerald-500 text-white border-2 border-emerald-600'
                        : 'bg-slate-100 text-slate-600 border border-slate-300'
                        }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-100 border border-emerald-300 rounded p-3 text-center">
                <div className="text-sm text-slate-600 mb-1">Output:</div>
                <div className="text-3xl font-bold text-emerald-700">3</div>
                <div className="text-xs text-slate-600 mt-1">2 {">"} ⌊3/2⌋ = 1 ✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Approaches */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Boyer-Moore Voting */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Boyer-Moore Voting Algorithm
          </h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="bg-white border-2 border-indigo-100 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">💡 Konsep</h4>
              <p className="text-slate-600 leading-relaxed">
                Bayangkan voting: setiap elemen adalah suara. Majority element akan "menang" karena
                muncul lebih dari setengah total votes.
              </p>
            </div>

            <div className="bg-white border-2 border-indigo-100 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">🔄 Cara Kerja</h4>
              <ol className="space-y-2 text-slate-600">
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-600">1.</span>
                  <span>Pilih kandidat pertama, set counter = 1</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-600">2.</span>
                  <span>Jika elemen sama dengan kandidat: counter++</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-600">3.</span>
                  <span>Jika berbeda: counter--</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-600">4.</span>
                  <span>Jika counter = 0: ganti kandidat</span>
                </li>
              </ol>
            </div>

            <div className="bg-white border-2 border-indigo-100 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">💻 Code</h4>
              <pre className="text-xs bg-slate-50 p-3 rounded border border-indigo-200 overflow-x-auto">
                {`let candidate = nums[0];
let count = 1;

for (let i = 1; i < nums.length; i++) {
  if (count === 0) {
    candidate = nums[i];
    count = 1;
  } else if (nums[i] === candidate) {
    count++;
  } else {
    count--;
  }
}

return candidate;`}
              </pre>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Complexity</div>
              <div className="font-semibold text-indigo-700">Time: O(n) | Space: O(1)</div>
              <div className="text-xs text-slate-500 mt-1">✨ Optimal solution!</div>
            </div>
          </div>
        </div>

        {/* Hash Map Approach */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 shadow-lg border-2 border-emerald-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            Hash Map Approach
          </h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="bg-white border-2 border-emerald-100 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-700 mb-2">💡 Konsep</h4>
              <p className="text-slate-600 leading-relaxed">
                Hitung frekuensi setiap elemen menggunakan hash map, lalu cari elemen dengan
                count {">"} n/2.
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-100 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-700 mb-2">🔄 Cara Kerja</h4>
              <ol className="space-y-2 text-slate-600">
                <li className="flex gap-2">
                  <span className="font-bold text-emerald-600">1.</span>
                  <span>Buat hash map kosong</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-emerald-600">2.</span>
                  <span>Iterasi array, count frekuensi</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-emerald-600">3.</span>
                  <span>Cari elemen dengan count {">"} n/2</span>
                </li>
              </ol>
            </div>

            <div className="bg-white border-2 border-emerald-100 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-700 mb-2">💻 Code</h4>
              <pre className="text-xs bg-slate-50 p-3 rounded border border-emerald-200 overflow-x-auto">
                {`const map = new Map();
const threshold = Math.floor(nums.length / 2);

for (const num of nums) {
  map.set(num, (map.get(num) || 0) + 1);
  if (map.get(num) {">"} threshold) {
    return num;
  }
}

return -1; // never reached`}
              </pre>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Complexity</div>
              <div className="font-semibold text-emerald-700">Time: O(n) | Space: O(n)</div>
              <div className="text-xs text-slate-500 mt-1">Simple but uses extra space</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Boyer-Moore Works */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-purple-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🤔</span>
          Mengapa Boyer-Moore Selalu Benar?
        </h3>
        <div className="space-y-3 text-sm">
          <div className="bg-white border-2 border-purple-100 rounded-lg p-4">
            <div className="font-semibold text-purple-700 mb-2">🎲 Insight 1: Pairing Cancellation</div>
            <p className="text-slate-600">
              Bayangkan majority element (M) dan non-majority elements (N) berpasangan saling menghapus.
              Karena M {">"} n/2, akan selalu ada M yang tersisa di akhir.
            </p>
            <div className="mt-2 flex gap-2 items-center text-xs">
              <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-mono">M M M M N N N</div>
              <span className="text-slate-400">→</span>
              <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-mono">M M M <s>M N</s> <s>N N</s></div>
              <span className="text-slate-400">→</span>
              <div className="px-2 py-1 bg-purple-500 text-white rounded font-mono font-bold">M M M</div>
            </div>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-lg p-4">
            <div className="font-semibold text-purple-700 mb-2">⚖️ Insight 2: Counter Balance</div>
            <p className="text-slate-600">
              Counter bertindak seperti "timbangan". Setiap kali ketemu M, timbangan naik (+1).
              Ketemu N, turun (-1). Karena M lebih banyak, timbangan akhirnya positif dengan M sebagai kandidat.
            </p>
          </div>

          <div className="bg-white border-2 border-purple-100 rounded-lg p-4">
            <div className="font-semibold text-purple-700 mb-2">🎯 Insight 3: Candidate Switching</div>
            <p className="text-slate-600">
              Meskipun kandidat berganti-ganti saat counter = 0, majority element akan SELALU menjadi
              kandidat final karena frekuensinya {">"} 50%.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Example */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">🔍 Step-by-Step: Boyer-Moore</h3>
        <div className="text-sm text-slate-600 mb-3">Array: [2, 2, 1, 1, 1, 2, 2]</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50">
                <th className="text-left py-2 px-3">Step</th>
                <th className="text-center py-2 px-3">Element</th>
                <th className="text-center py-2 px-3">Candidate</th>
                <th className="text-center py-2 px-3">Count</th>
                <th className="text-left py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { step: 0, elem: '2', cand: '2', count: 1, action: 'Initialize' },
                { step: 1, elem: '2', cand: '2', count: 2, action: 'Same, count++' },
                { step: 2, elem: '1', cand: '2', count: 1, action: 'Different, count--' },
                { step: 3, elem: '1', cand: '2', count: 0, action: 'Different, count--' },
                { step: 4, elem: '1', cand: '1', count: 1, action: 'Count=0, switch candidate' },
                { step: 5, elem: '2', cand: '1', count: 0, action: 'Different, count--' },
                { step: 6, elem: '2', cand: '2', count: 1, action: 'Count=0, switch candidate' },
              ].map((row, i) => (
                <tr key={i} className={`border-b border-slate-200 ${i === 6 ? 'bg-violet-50 font-semibold' : ''}`}>
                  <td className="py-2 px-3">{row.step}</td>
                  <td className="text-center py-2 px-3 font-mono font-bold text-violet-600">{row.elem}</td>
                  <td className="text-center py-2 px-3 font-mono font-bold text-indigo-600">{row.cand}</td>
                  <td className="text-center py-2 px-3 font-mono">{row.count}</td>
                  <td className="py-2 px-3 text-slate-600">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-violet-50 border border-violet-200 rounded-lg">
          <div className="font-semibold text-violet-700">✅ Result: Candidate = 2</div>
          <div className="text-xs text-slate-600 mt-1">Final candidate is the majority element!</div>
        </div>
      </div>

      {/* Edge Cases & Tips */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-3">🔍 Edge Cases</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 p-2 bg-slate-50 rounded">
              <span className="text-violet-600">•</span>
              <div>
                <span className="font-semibold">Single element:</span>
                <span className="text-slate-600"> [5] → 5</span>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-slate-50 rounded">
              <span className="text-violet-600">•</span>
              <div>
                <span className="font-semibold">All same:</span>
                <span className="text-slate-600"> [7,7,7,7] → 7</span>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-slate-50 rounded">
              <span className="text-violet-600">•</span>
              <div>
                <span className="font-semibold">Exact majority:</span>
                <span className="text-slate-600"> [1,2,1] → 1 (2 {">"} ⌊3/2⌋)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 shadow-lg border-2 border-indigo-200">
          <h3 className="text-lg font-bold text-slate-800 mb-3">💡 Pro Tips</h3>
          <div className="space-y-2 text-sm text-indigo-800">
            <div className="flex items-start gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Boyer-Moore is <strong>optimal</strong> for this problem</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500">✓</span>
              <span>No need for second pass (guaranteed majority exists)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Can be extended to find elements appearing {">"} n/3 times</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
