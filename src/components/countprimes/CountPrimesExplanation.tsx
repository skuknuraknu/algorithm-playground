export default function CountPrimesExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">🔢 Count Primes</h2>
        <p className="text-slate-700 leading-relaxed">
          Hitung berapa banyak bilangan prima yang lebih kecil dari integer non-negatif{' '}
          <code className="bg-amber-50 px-2 py-1 rounded border border-amber-200">n</code>. Bilangan prima adalah
          bilangan bulat {'>'} 1 yang hanya habis dibagi 1 dan dirinya sendiri.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg border-2 border-amber-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3">💡 Sieve of Eratosthenes</h3>
          <p className="text-slate-700 mb-3">
            Algoritma klasik untuk menemukan semua bilangan prima {'<'} n dengan efisien.
          </p>
          <ol className="space-y-2 text-slate-700 list-decimal list-inside">
            <li>Buat array boolean <code className="bg-white px-2 py-1 rounded border border-amber-200">isPrime</code> berisi true</li>
            <li>Tandai 0 dan 1 sebagai bukan prima</li>
            <li>Untuk setiap i dari 2 hingga √n:
              <div className="ml-5 mt-1 space-y-1 text-sm">
                <div>• Jika isPrime[i] masih true → i adalah prima</div>
                <div>• Tandai kelipatan i mulai dari i² sebagai composite</div>
              </div>
            </li>
            <li>Jumlahkan nilai true yang tersisa</li>
          </ol>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">🎯 Contoh: n = 10</h3>
          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2 text-slate-700 text-sm">
            <div><strong>Range:</strong> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9</div>
            <div><strong className="text-green-700">Prima:</strong> 2, 3, 5, 7</div>
            <div><strong className="text-red-700">Composite:</strong> 0, 1, 4, 6, 8, 9</div>
            <div className="pt-2 border-t border-slate-200 font-semibold">
              Output: 4 bilangan prima
            </div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-sm text-slate-700 space-y-1">
            <div><strong>Step 1:</strong> i = 2 → tandai 4, 6, 8</div>
            <div><strong>Step 2:</strong> i = 3 → tandai 9</div>
            <div><strong>Step 3:</strong> i ≥ √10 → stop</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">⚡ Optimisasi</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
              <span className="font-semibold text-green-700">Loop hingga √n:</span> kelipatan {'>'} √n sudah ditandai faktor lebih kecil
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
              <span className="font-semibold text-blue-700">Mulai dari i²:</span> kelipatan sebelumnya sudah ditandai
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3">
              <span className="font-semibold text-amber-700">Skip genap:</span> setelah menangani 2, iterasi i += 2
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">⏱️ Kompleksitas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-center">
              <div className="text-sm text-slate-600">Time Complexity</div>
              <div className="text-2xl font-bold text-amber-700">O(n log log n)</div>
              <div className="text-xs text-slate-500 mt-1">Sieve of Eratosthenes</div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
              <div className="text-sm text-slate-600">Space Complexity</div>
              <div className="text-2xl font-bold text-green-700">O(n)</div>
              <div className="text-xs text-slate-500 mt-1">Array boolean</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-3">🔑 Key Points</h3>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>0 dan 1 bukan bilangan prima</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>2 adalah satu-satunya bilangan prima genap</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Sieve efektif untuk menemukan banyak prima sekaligus</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Cukup iterasi hingga √n untuk menandai composite</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 shadow-lg">
        <h3 className="text-lg font-bold text-amber-900 mb-2">📚 Fun Fact</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          Algoritma Sieve of Eratosthenes dinamai dari matematikawan Yunani kuno Eratosthenes (276-194 SM)
          yang juga terkenal karena menghitung keliling Bumi dengan akurat!
        </p>
      </div>
    </div>
  );
}
