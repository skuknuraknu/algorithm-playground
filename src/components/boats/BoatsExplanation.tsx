import { BookOpen, Anchor, TrendingUp, Code } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function BoatsExplanation() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">{t.problemStatement}</h2>
        </div>
        <div className="space-y-4 text-slate-700">
          <p className="leading-relaxed">
            You are given an array <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">people</code> where <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">people[i]</code> is the weight of the <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">i<sup>th</sup></code> person, and an infinite number of boats where each boat can carry a maximum weight of <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">limit</code>.
          </p>
          <p className="leading-relaxed">
            Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">limit</code>.
          </p>
          <p className="leading-relaxed font-semibold">
            Return the minimum number of boats to carry every given person.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{t.examples}</h3>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-slate-600">{t.input}:</span>{' '}
                <span className="text-blue-700">people = [1,2], limit = 3</span>
              </div>
              <div>
                <span className="text-slate-600">{t.output}:</span>{' '}
                <span className="text-green-700">1</span>
              </div>
              <div className="text-slate-600 text-xs mt-2">
                Explanation: 1 boat can carry both people (1 + 2 ≤ 3)
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-slate-600">{t.input}:</span>{' '}
                <span className="text-blue-700">people = [3,2,2,1], limit = 3</span>
              </div>
              <div>
                <span className="text-slate-600">{t.output}:</span>{' '}
                <span className="text-green-700">3</span>
              </div>
              <div className="text-slate-600 text-xs mt-2">
                Explanation: 3 boats (1+2), (2), (3)
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-slate-600">{t.input}:</span>{' '}
                <span className="text-blue-700">people = [3,5,3,4], limit = 5</span>
              </div>
              <div>
                <span className="text-slate-600">{t.output}:</span>{' '}
                <span className="text-green-700">4</span>
              </div>
              <div className="text-slate-600 text-xs mt-2">
                Explanation: 4 boats (3), (5), (3), (4) - no pairs fit together
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <Code className="text-orange-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">{t.bruteForce}</h3>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>Pair people randomly without sorting, leading to suboptimal pairings.</p>
            <div className="bg-white p-3 rounded-lg border border-orange-200">
              <div className="font-mono text-xs text-slate-800">
                <div>boats = 0</div>
                <div>while people remain:</div>
                <div className="ml-4">try to pair anyone</div>
                <div className="ml-4">boats++</div>
              </div>
            </div>
            <div className="bg-red-100 text-red-800 text-xs p-2 rounded border border-red-300">
              ❌ {t.tooSlowForLargeInputs}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <Anchor className="text-green-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">{t.twoPointers}</h3>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>Sort array, pair lightest with heaviest when possible.</p>
            <div className="bg-white p-3 rounded-lg border border-green-200">
              <div className="font-mono text-xs text-slate-800">
                <div>sort(people)</div>
                <div>left = 0, right = n-1</div>
                <div>while left ≤ right:</div>
                <div className="ml-4">if people[left] + people[right] ≤ limit:</div>
                <div className="ml-8">left++ // pair both</div>
                <div className="ml-4">right-- // heaviest gets boat</div>
                <div className="ml-4">boats++</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="text-green-600" size={16} />
              <span className="font-semibold">{t.timeComplexity}: O(n log n) | {t.spaceComplexity}: O(1)</span>
            </div>
            <div className="bg-green-100 text-green-800 text-xs p-2 rounded border border-green-300">
              ✓ {t.optimalSolution}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-purple-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{t.keyInsights}</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">1.</span>
            <span>
              <strong>Sort first:</strong> Sorting allows us to make optimal greedy choices
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">2.</span>
            <span>
              <strong>Pair extremes:</strong> Try to pair the lightest person with the heaviest person
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">3.</span>
            <span>
              <strong>If cannot pair:</strong> The heaviest person must go alone, move on to next heaviest
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">4.</span>
            <span>
              <strong>Two pointers:</strong> Left pointer for lightest, right pointer for heaviest, move inward
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">5.</span>
            <span>
              <strong>Greedy is optimal:</strong> By always trying to pair the lightest with the heaviest, we maximize boat efficiency
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
