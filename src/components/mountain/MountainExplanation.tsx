import { BookOpen, Mountain, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function MountainExplanation() {
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
            Given an array of integers <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">arr</code>, return <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">true</code> if and only if it is a valid mountain array.
          </p>
          <p className="leading-relaxed">
            An array is a mountain array if and only if:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">arr.length ≥ 3</code></li>
            <li>There exists some <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">i</code> with <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">0 &lt; i &lt; arr.length - 1</code> such that:
              <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                <li><code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">arr[0] &lt; arr[1] &lt; ... &lt; arr[i - 1] &lt; arr[i]</code></li>
                <li><code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">arr[i] &gt; arr[i + 1] &gt; ... &gt; arr[arr.length - 1]</code></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{t.examples}</h3>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-slate-600">{t.input}:</span>{' '}
                <span className="text-blue-700">arr = [0,3,2,1]</span>
              </div>
              <div>
                <span className="text-slate-600">{t.output}:</span>{' '}
                <span className="text-green-700 font-bold">true</span>
              </div>
              <div className="text-slate-600 text-xs mt-2">
                Explanation: Goes up (0→3) then down (3→2→1)
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-slate-600">{t.input}:</span>{' '}
                <span className="text-blue-700">arr = [3,5,5]</span>
              </div>
              <div>
                <span className="text-slate-600">{t.output}:</span>{' '}
                <span className="text-red-700 font-bold">false</span>
              </div>
              <div className="text-slate-600 text-xs mt-2">
                Explanation: Has a plateau (5,5), not strictly increasing/decreasing
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-slate-600">{t.input}:</span>{' '}
                <span className="text-blue-700">arr = [0,1,2,3,4,5,6,7,8,9]</span>
              </div>
              <div>
                <span className="text-slate-600">{t.output}:</span>{' '}
                <span className="text-red-700 font-bold">false</span>
              </div>
              <div className="text-slate-600 text-xs mt-2">
                Explanation: Only goes up, never goes down
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border-2 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <Mountain className="text-green-600" size={24} />
          <h3 className="text-xl font-bold text-slate-800">{t.optimalSolution}</h3>
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          <p className="font-semibold">Single Pass Algorithm:</p>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="font-mono text-xs text-slate-800 space-y-1">
              <div>1. Check if length &lt; 3, return false</div>
              <div>2. Walk up the mountain (while increasing)</div>
              <div>3. Check if we moved and not at end</div>
              <div>4. Walk down the mountain (while decreasing)</div>
              <div>5. Check if we reached the end</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="text-green-600" size={16} />
            <span className="font-semibold">{t.timeComplexity}: O(n) | {t.spaceComplexity}: O(1)</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-purple-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{t.keyInsights}</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">1.</span>
            <span>
              <strong>Must go up then down:</strong> Peak cannot be at the start or end
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">2.</span>
            <span>
              <strong>Strictly increasing/decreasing:</strong> No plateaus allowed (consecutive equal values)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">3.</span>
            <span>
              <strong>Single peak:</strong> Only one peak allowed, cannot have multiple ups and downs
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 font-bold text-lg">4.</span>
            <span>
              <strong>Minimum length:</strong> Need at least 3 elements to form a mountain
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
