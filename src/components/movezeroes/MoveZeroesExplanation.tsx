import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function MoveZeroesExplanation() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          {t.problemStatement}: Move Zeroes
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed">
          Given an integer array <code className="bg-slate-100 px-2 py-1 rounded">nums</code>,
          move all <code className="bg-slate-100 px-2 py-1 rounded">0</code>'s to the end
          of it while maintaining the relative order of the non-zero elements.
        </p>
        <p className="text-slate-700 text-lg leading-relaxed mt-4">
          <strong>Note:</strong> You must do this in-place without making a copy of the array.
        </p>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h3 className="font-bold text-blue-900 text-xl mb-2">{t.example}:</h3>
          <div className="space-y-2 text-slate-700">
            <div>
              <strong>{t.input}:</strong>{' '}
              <code className="bg-white px-3 py-1 rounded">nums = [0,1,0,3,12]</code>
            </div>
            <div>
              <strong>{t.output}:</strong>{' '}
              <code className="bg-white px-3 py-1 rounded">[1,3,12,0,0]</code>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 shadow-lg border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <CheckCircle className="text-blue-600" size={28} />
          {t.twoPointers} {t.approach}
        </h3>
        <div className="space-y-4 text-slate-700">
          <p className="text-lg">
            The optimal solution uses the <strong>two-pointer technique</strong>:
          </p>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li className="text-lg">
              <strong>Pointer 1 (writePos):</strong> Tracks where to write the next non-zero element
            </li>
            <li className="text-lg">
              <strong>Pointer 2 (readPos):</strong> Scans through the array to find non-zero elements
            </li>
            <li className="text-lg">
              When a non-zero element is found, write it to the writePos and increment writePos
            </li>
            <li className="text-lg">
              After processing all elements, fill remaining positions with zeros
            </li>
          </ol>
        </div>

        <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
          <h4 className="font-bold text-slate-800 mb-3 text-xl">Algorithm Steps:</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <ArrowRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 1:</strong> Initialize writePos = 0
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 2:</strong> Iterate through array with readPos
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 3:</strong> If nums[readPos] ≠ 0, copy to nums[writePos] and increment writePos
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 4:</strong> Fill remaining positions from writePos to end with 0
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">{t.complexity}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
            <h4 className="font-bold text-green-900 mb-2 text-lg">{t.timeComplexity}</h4>
            <p className="text-2xl font-mono font-bold text-green-700">O(n)</p>
            <p className="text-slate-700 mt-2">
              Single pass through the array
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2 text-lg">{t.spaceComplexity}</h4>
            <p className="text-2xl font-mono font-bold text-purple-700">O(1)</p>
            <p className="text-slate-700 mt-2">
              In-place modification, constant extra space
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 shadow-lg border-2 border-orange-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">{t.keyInsights}</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>In-place modification:</strong> No extra array needed, modify the original array
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Stable ordering:</strong> Relative order of non-zero elements is preserved
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>{t.optimalSolution}:</strong> Can't do better than O(n) time since we need to examine each element
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
