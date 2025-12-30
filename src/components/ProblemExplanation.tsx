import { BookOpen, Zap, Code, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function ProblemExplanation() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">{t.problemStatement}</h2>
        </div>
        <div className="space-y-4 text-slate-700">
          <p className="leading-relaxed">
            {t.containerProblemText1}
          </p>
          <p className="leading-relaxed">
            {t.containerProblemText2}
          </p>
          <p className="leading-relaxed font-semibold">
            {t.containerProblemText3}
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm font-medium text-blue-900">
              {t.containerNote}
            </p>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{t.examples}</h3>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-slate-600">{t.input}:</span>{' '}
                <span className="text-blue-700">height = [1,8,6,2,5,4,8,3,7]</span>
              </div>
              <div>
                <span className="text-slate-600">{t.output}:</span>{' '}
                <span className="text-green-700">49</span>
              </div>
              <div className="text-slate-600 text-xs mt-2">
                {t.containerExplanation}
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-slate-600">{t.input}:</span>{' '}
                <span className="text-blue-700">height = [1,1]</span>
              </div>
              <div>
                <span className="text-slate-600">{t.output}:</span>{' '}
                <span className="text-green-700">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approaches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brute Force */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <Code className="text-orange-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">{t.bruteForce}</h3>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>{t.containerBruteForceDesc}</p>
            <div className="bg-white p-3 rounded-lg border border-orange-200">
              <div className="font-mono text-xs text-slate-800">
                <div>for i in range(n):</div>
                <div className="ml-4">for j in range(i+1, n):</div>
                <div className="ml-8">area = min(h[i], h[j]) * (j-i)</div>
                <div className="ml-8">maxArea = max(maxArea, area)</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="text-red-600" size={16} />
              <span className="font-semibold">{t.timeComplexity}: O(n²) | {t.spaceComplexity}: O(1)</span>
            </div>
            <div className="bg-red-100 text-red-800 text-xs p-2 rounded border border-red-300">
              ❌ {t.tooSlowForLargeInputs}
            </div>
          </div>
        </div>

        {/* Two Pointers */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-green-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">{t.twoPointers}</h3>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>{t.containerTwoPointersDesc}</p>
            <div className="bg-white p-3 rounded-lg border border-green-200">
              <div className="font-mono text-xs text-slate-800">
                <div>left = 0, right = n-1</div>
                <div>while left &lt; right:</div>
                <div className="ml-4">area = min(h[left], h[right]) * width</div>
                <div className="ml-4">if h[left] &lt; h[right]: left++</div>
                <div className="ml-4">else: right--</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="text-green-600" size={16} />
              <span className="font-semibold">{t.timeComplexity}: O(n) | {t.spaceComplexity}: O(1)</span>
            </div>
            <div className="bg-green-100 text-green-800 text-xs p-2 rounded border border-green-300">
              ✓ {t.optimalSolution}
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-purple-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{t.keyInsights}</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">1.</span>
            <span>
              {t.containerKeyInsight1}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">2.</span>
            <span>
              {t.containerKeyInsight2}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">3.</span>
            <span>
              {t.containerKeyInsight3}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">4.</span>
            <span>
              {t.containerKeyInsight4}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
