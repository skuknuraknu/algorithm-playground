import { useLanguage } from '../../i18n';

export default function TwoSumExplanation() {
  const { t, language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">➕ Two Sum</h2>
        <p className="text-slate-700 leading-relaxed">
          {language === 'id' 
            ? <>Diberikan array <span className="font-semibold">nums</span> dan sebuah <span className="font-semibold">target</span>, temukan pasangan indeks yang jumlah elemennya sama dengan target. Diasumsikan selalu ada tepat satu solusi.</>
            : <>Given an array <span className="font-semibold">nums</span> and a <span className="font-semibold">target</span>, find the pair of indices whose elements sum to the target. Assume there is exactly one solution.</>
          }
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-lg border-2 border-blue-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">💡 {t.approach}</h3>
          <div className="space-y-3 text-slate-700 text-sm">
            <div className="bg-white border-2 border-blue-100 rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 mb-1">1. Hash Map (One-pass)</h4>
              <p>{language === 'id' 
                ? 'Simpan angka yang sudah dilihat ke dalam map (nilai → indeks). Untuk setiap angka, cek apakah complement sudah ada.'
                : 'Store seen numbers in a map (value → index). For each number, check if complement exists.'}
              </p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(n) space</div>
            </div>
            <div className="bg-white border-2 border-emerald-100 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-700 mb-1">2. {t.bruteForce}</h4>
              <p>{language === 'id'
                ? 'Periksa semua pasangan (i, j). Mudah tetapi O(n²) dan tidak efisien.'
                : 'Check all pairs (i, j). Easy but O(n²) and inefficient.'}
              </p>
              <div className="text-xs text-slate-500 mt-1">O(n²) time | O(1) space</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">⏱️ {t.complexity}</h3>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">{t.timeComplexity}</div>
            <div className="text-2xl font-bold text-blue-700">O(n)</div>
            <div className="text-xs text-slate-500">{language === 'id' ? 'Hash map lookup per elemen' : 'Hash map lookup per element'}</div>
          </div>
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">{t.spaceComplexity}</div>
            <div className="text-2xl font-bold text-emerald-700">O(n)</div>
            <div className="text-xs text-slate-500">{language === 'id' ? 'Map menyimpan angka yang sudah dilihat' : 'Map stores seen numbers'}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 mb-1">🎯 {t.example}</h3>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2 text-slate-700 text-sm">
          <div><strong>{t.input}:</strong> nums = [2,7,11,15], target = 9</div>
          <div><strong className="text-green-700">{t.output}:</strong> [0, 1]</div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            {language === 'id' ? 'Penjelasan: nums[0] + nums[1] = 2 + 7 = 9' : 'Explanation: nums[0] + nums[1] = 2 + 7 = 9'}
          </div>
        </div>
      </div>
    </div>
  );
}
