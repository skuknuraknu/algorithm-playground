import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function FirstBadVersionExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Problem: First Bad Version
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed">
          You are a product manager and currently leading a team to develop a new product. 
          Unfortunately, the latest version of your product fails the quality check. Since each 
          version is developed based on the previous version, all the versions after a bad version 
          are also bad.
        </p>
        <p className="text-slate-700 text-lg leading-relaxed mt-4">
          Suppose you have <code className="bg-slate-100 px-2 py-1 rounded">n</code> versions{' '}
          <code className="bg-slate-100 px-2 py-1 rounded">[1, 2, ..., n]</code> and you want to 
          find out the first bad one, which causes all the following ones to be bad.
        </p>
        <p className="text-slate-700 text-lg leading-relaxed mt-4">
          You are given an API <code className="bg-slate-100 px-2 py-1 rounded">isBadVersion(version)</code>{' '}
          which returns whether <code className="bg-slate-100 px-2 py-1 rounded">version</code> is bad. 
          Implement a function to find the first bad version.{' '}
          <strong>You should minimize the number of calls to the API.</strong>
        </p>

        <div className="mt-6 bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
          <h3 className="font-bold text-orange-900 text-xl mb-2">Example:</h3>
          <div className="space-y-3 text-slate-700">
            <div>
              <strong>Input:</strong>{' '}
              <code className="bg-white px-3 py-1 rounded">n = 5, bad = 4</code>
              <br />
              <span className="text-sm mt-2 block">
                Versions: [1, 2, 3, 4, 5] where 4 is the first bad version
              </span>
            </div>
            <div>
              <strong>Output:</strong>{' '}
              <code className="bg-white px-3 py-1 rounded">4</code>
            </div>
            <div className="text-sm bg-white p-3 rounded border border-orange-200">
              <strong>Explanation:</strong>
              <br />
              call isBadVersion(3) → false
              <br />
              call isBadVersion(5) → true
              <br />
              call isBadVersion(4) → true
              <br />
              Then 4 is the first bad version.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 shadow-lg border-2 border-orange-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-orange-600" size={28} />
          Binary Search Approach
        </h3>
        <div className="space-y-4 text-slate-700">
          <p className="text-lg">
            The optimal solution uses <strong>Binary Search</strong> to minimize API calls:
          </p>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li className="text-lg">
              <strong>Initialize:</strong> left = 1, right = n
            </li>
            <li className="text-lg">
              <strong>Binary Search:</strong> Check middle version
            </li>
            <li className="text-lg">
              <strong>If bad:</strong> First bad version is at mid or before, search left half
            </li>
            <li className="text-lg">
              <strong>If good:</strong> First bad version is after mid, search right half
            </li>
            <li className="text-lg">
              <strong>Converge:</strong> When left == right, that's the first bad version
            </li>
          </ol>
        </div>

        <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
          <h4 className="font-bold text-slate-800 mb-3 text-xl">Algorithm Steps:</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <ArrowRight className="text-orange-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 1:</strong> Set left = 1, right = n
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="text-orange-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 2:</strong> Calculate mid = left + (right - left) / 2
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="text-orange-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 3:</strong> Call isBadVersion(mid)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="text-orange-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 4:</strong> If true, right = mid; else left = mid + 1
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="text-orange-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <strong>Step 5:</strong> Repeat until left == right
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Complexity Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
            <h4 className="font-bold text-green-900 mb-2 text-lg">Time Complexity</h4>
            <p className="text-2xl font-mono font-bold text-green-700">O(log n)</p>
            <p className="text-slate-700 mt-2">
              Binary search reduces search space by half each iteration
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2 text-lg">Space Complexity</h4>
            <p className="text-2xl font-mono font-bold text-purple-700">O(1)</p>
            <p className="text-slate-700 mt-2">
              Only constant space for pointers
            </p>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <h4 className="font-bold text-blue-900 mb-2 text-lg">API Calls</h4>
          <p className="text-slate-700">
            For n versions, binary search makes at most{' '}
            <span className="font-mono font-bold text-blue-700">⌈log₂(n)⌉</span> API calls.
          </p>
          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <div>• n = 100 → ~7 calls</div>
            <div>• n = 1000 → ~10 calls</div>
            <div>• n = 1,000,000 → ~20 calls</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 shadow-lg border-2 border-yellow-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Key Insights</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Minimize API Calls:</strong> Binary search is optimal for this problem
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Key Property:</strong> All versions after first bad version are also bad
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Search Strategy:</strong> If current is bad, search left; if good, search right
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Common Pattern:</strong> Classic binary search variant for finding boundaries
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
