import { BookOpen, Phone, Lightbulb, Code2, CheckCircle2 } from 'lucide-react';

export default function LetterCombinationsExplanation() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg">
              <Phone className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Letter Combinations of a Phone Number
              </h2>
              <p className="text-sm text-slate-500 mt-1">Backtracking • String Mapping</p>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div className="flex gap-3">
              <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Diberikan string berisi digit dari <span className="font-semibold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">2-9</span>, kembalikan semua kombinasi huruf yang mungkin dibentuk dari angka tersebut.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Mapping digit ke huruf mengikuti tombol telepon tradisional (seperti pada ponsel lama).
              </p>
            </div>
          </div>

          {/* Phone Keypad Visual */}
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-indigo-200 shadow-inner">
            <h4 className="font-bold text-slate-800 mb-4 text-center">Papan Tombol Telepon</h4>
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {[
                { digit: '2', letters: 'abc' },
                { digit: '3', letters: 'def' },
                { digit: '4', letters: 'ghi' },
                { digit: '5', letters: 'jkl' },
                { digit: '6', letters: 'mno' },
                { digit: '7', letters: 'pqrs' },
                { digit: '8', letters: 'tuv' },
                { digit: '9', letters: 'wxyz' },
              ].map((key) => (
                <div
                  key={key.digit}
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-3 text-center hover:from-indigo-100 hover:to-blue-100 transition-all hover:scale-105"
                >
                  <div className="text-2xl font-bold text-indigo-700">{key.digit}</div>
                  <div className="text-xs text-slate-600 mt-1">{key.letters}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Examples Card */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
            <Code2 className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Contoh</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">digits = "23"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">["ad","ae","af","bd","be","bf","cd","ce","cf"]</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">digits = ""</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">[]</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">digits = "2"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">["a","b","c"]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Constraints Card */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-2xl p-8 shadow-xl border-2 border-amber-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
          Batasan
        </h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">0 ≤ digits.length ≤ 4</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">digits[i] adalah digit dalam range ['2', '9']</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
