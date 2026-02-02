export default function RobotReturnExplanation() {
  return (
    <div className="space-y-6">
      {/* Problem Introduction */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-cyan-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🤖</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Robot Return to Origin</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Bayangkan sebuah robot yang berdiri di titik asal (0, 0) pada grid 2D infinite. Robot menerima
              serangkaian perintah berupa <code className="bg-white px-2 py-1 rounded border border-cyan-300 font-semibold">moves</code>,
              dimana setiap karakter merepresentasikan satu gerakan:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white border-2 border-cyan-300 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-cyan-600 mb-1">U</div>
                <div className="text-xs text-slate-600">Up (y+1)</div>
              </div>
              <div className="bg-white border-2 border-orange-300 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">D</div>
                <div className="text-xs text-slate-600">Down (y-1)</div>
              </div>
              <div className="bg-white border-2 border-pink-300 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-pink-600 mb-1">L</div>
                <div className="text-xs text-slate-600">Left (x-1)</div>
              </div>
              <div className="bg-white border-2 border-green-300 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">R</div>
                <div className="text-xs text-slate-600">Right (x+1)</div>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed mt-4">
              <strong className="text-cyan-700">Tujuan:</strong> Tentukan apakah robot kembali ke titik asal (0, 0)
              setelah menyelesaikan semua perintah.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Example */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">📊 Contoh Visual</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Example 1 - Returns to Origin */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl">✅</div>
              <div className="font-semibold text-green-700">Kembali ke Origin</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="bg-white border border-green-200 rounded p-2">
                <span className="text-slate-600">Input:</span> <code className="font-semibold text-green-700">"UDLR"</code>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div>• U: (0,0) → (0,1)</div>
                <div>• D: (0,1) → (0,0)</div>
                <div>• L: (0,0) → (-1,0)</div>
                <div>• R: (-1,0) → <span className="font-bold text-green-600">(0,0)</span> ✓</div>
              </div>
              <div className="bg-green-100 border border-green-300 rounded p-2 mt-2">
                <span className="text-slate-600">Output:</span> <code className="font-semibold text-green-700">true</code>
              </div>
            </div>
          </div>

          {/* Example 2 - Does NOT return */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl">⚠️</div>
              <div className="font-semibold text-amber-700">Tidak di Origin</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="bg-white border border-amber-200 rounded p-2">
                <span className="text-slate-600">Input:</span> <code className="font-semibold text-amber-700">"LL"</code>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div>• L: (0,0) → (-1,0)</div>
                <div>• L: (-1,0) → <span className="font-bold text-amber-600">(-2,0)</span> ✗</div>
              </div>
              <div className="bg-amber-100 border border-amber-300 rounded p-2 mt-2">
                <span className="text-slate-600">Output:</span> <code className="font-semibold text-amber-700">false</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Approaches */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Pendekatan 1: Net Displacement
          </h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="bg-white border-2 border-indigo-100 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">Konsep</h4>
              <p className="text-slate-600 leading-relaxed">
                Track posisi (x, y) secara real-time. Robot kembali ke origin jika posisi akhir adalah (0, 0).
              </p>
            </div>

            <div className="bg-white border-2 border-indigo-100 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">Algoritma</h4>
              <pre className="text-xs bg-slate-50 p-3 rounded border border-indigo-200 overflow-x-auto">
                {`x = 0, y = 0
for move in moves:
    if move == 'U': y += 1
    if move == 'D': y -= 1
    if move == 'R': x += 1
    if move == 'L': x -= 1
return x == 0 && y == 0`}
              </pre>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Complexity</div>
              <div className="font-semibold text-indigo-700">Time: O(n) | Space: O(1)</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 shadow-lg border-2 border-emerald-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Pendekatan 2: Frequency Counter
          </h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="bg-white border-2 border-emerald-100 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-700 mb-2">Konsep</h4>
              <p className="text-slate-600 leading-relaxed">
                Count berapa kali setiap gerakan terjadi. Robot di origin jika jumlah U = D dan jumlah L = R.
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-100 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-700 mb-2">Algoritma</h4>
              <pre className="text-xs bg-slate-50 p-3 rounded border border-emerald-200 overflow-x-auto">
                {`countU = countD = countL = countR = 0
for move in moves:
    if move == 'U': countU++
    if move == 'D': countD++
    if move == 'R': countR++
    if move == 'L': countL++
return countU == countD && countL == countR`}
              </pre>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Complexity</div>
              <div className="font-semibold text-emerald-700">Time: O(n) | Space: O(1)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-purple-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔑</span>
          Key Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white border-2 border-purple-100 rounded-lg p-4">
            <div className="font-semibold text-purple-700 mb-2">✨ Insight 1: Displacement</div>
            <p className="text-slate-600">
              Setiap gerakan memiliki "pasangan" yang membatalkannya: U↔D dan L↔R.
              Jika semua gerakan memiliki pasangan, robot kembali ke origin.
            </p>
          </div>
          <div className="bg-white border-2 border-purple-100 rounded-lg p-4">
            <div className="font-semibold text-purple-700 mb-2">⚡ Insight 2: Order Independence</div>
            <p className="text-slate-600">
              Urutan gerakan tidak mempengaruhi posisi akhir. "UDLR" dan "RLUD"
              sama-sama menghasilkan (0, 0).
            </p>
          </div>
          <div className="bg-white border-2 border-purple-100 rounded-lg p-4">
            <div className="font-semibold text-purple-700 mb-2">🎲 Insight 3: String Length</div>
            <p className="text-slate-600">
              Jika panjang string ganjil, robot PASTI tidak kembali ke origin
              (tidak mungkin semua gerakan berpasangan).
            </p>
          </div>
          <div className="bg-white border-2 border-purple-100 rounded-lg p-4">
            <div className="font-semibold text-purple-700 mb-2">🚀 Insight 4: Optimization</div>
            <p className="text-slate-600">
              Bisa early return jika length ganjil, atau jika di tengah simulasi
              sudah terlalu jauh dari origin.
            </p>
          </div>
        </div>
      </div>

      {/* Edge Cases */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">🔍 Edge Cases</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-cyan-600 font-bold">•</span>
            <div>
              <span className="font-semibold text-slate-700">Empty string:</span>
              <span className="text-slate-600"> "" → true (already at origin)</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-cyan-600 font-bold">•</span>
            <div>
              <span className="font-semibold text-slate-700">Single move:</span>
              <span className="text-slate-600"> "U" → false (odd length, no pairs)</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-cyan-600 font-bold">•</span>
            <div>
              <span className="font-semibold text-slate-700">All same direction:</span>
              <span className="text-slate-600"> "UUUU" → false (no cancellation)</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-cyan-600 font-bold">•</span>
            <div>
              <span className="font-semibold text-slate-700">Perfect pairs:</span>
              <span className="text-slate-600"> "UUDDLLRR" → true (balanced)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
