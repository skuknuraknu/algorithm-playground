import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Layers, Hash } from 'lucide-react';
import gsap from 'gsap';

export default function GroupAnagramsExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="space-y-6">
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 hover:border-indigo-400 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <Layers className="text-indigo-600" size={32} />
          Problem: Group Anagrams
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed">
          Given an array of strings <code className="bg-slate-100 px-2 py-1 rounded font-mono text-indigo-600">strs</code>,
          group the <strong>anagrams</strong> together. You can return the answer in any order.
        </p>
        <p className="text-slate-700 text-lg leading-relaxed mt-4">
          An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase,
          typically using all the original letters exactly once.
        </p>

        <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
          <h3 className="font-bold text-indigo-900 text-xl mb-4">Example:</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
              <div className="text-sm text-slate-500 mb-1">Input</div>
              <code className="text-lg font-bold text-slate-800">strs = ["eat","tea","tan","ate","nat","bat"]</code>
              <div className="mt-3 text-sm text-slate-500 mb-1">Output</div>
              <code className="text-lg font-bold text-indigo-600">[["bat"],["nat","tan"],["ate","eat","tea"]]</code>
            </div>
          </div>
        </div>
      </div>

      <div ref={addToRefs} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 shadow-lg border-2 border-purple-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Hash className="text-purple-600" size={28} />
          Approach: Categorize by Sorted String
        </h3>
        <div className="space-y-4 text-slate-700">
          <p className="text-lg">
            Two strings are anagrams if and only if their <strong>sorted characters</strong> are equal.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white/80 p-5 rounded-lg border border-purple-100 hover:bg-white transition-colors">
              <h4 className="font-bold text-purple-700 mb-2">The Idea</h4>
              <p className="text-sm text-slate-600">
                We can use a <strong>Hash Map</strong> where:
              </p>
              <ul className="text-sm list-disc list-inside text-slate-600 mt-2">
                <li><strong>Key:</strong> The sorted string (e.g., "aet" for "eat")</li>
                <li><strong>Value:</strong> A list of strings that match this key</li>
              </ul>
            </div>

            <div className="bg-white/80 p-5 rounded-lg border border-purple-100 hover:bg-white transition-colors flex flex-col justify-center">
              <div className="flex items-center justify-center gap-4 text-sm font-mono">
                <div className="text-center">
                  <div className="font-bold text-slate-800">"eat"</div>
                  <ArrowRight className="mx-auto text-slate-400 my-1 rotate-90" size={16} />
                  <div className="font-bold text-purple-600">"aet"</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800">"tea"</div>
                  <ArrowRight className="mx-auto text-slate-400 my-1 rotate-90" size={16} />
                  <div className="font-bold text-purple-600">"aet"</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800">"ate"</div>
                  <ArrowRight className="mx-auto text-slate-400 my-1 rotate-90" size={16} />
                  <div className="font-bold text-purple-600">"aet"</div>
                </div>
              </div>
              <p className="text-center text-xs text-slate-500 mt-3">All map to the same key!</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500">
          <h4 className="font-bold text-slate-800 mb-3 text-xl">Algorithm Steps:</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3 group">
              <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                <ArrowRight className="text-purple-600" size={20} />
              </div>
              <div>
                <strong>Step 1:</strong> Initialize an empty Hash Map (or Dictionary).
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                <ArrowRight className="text-purple-600" size={20} />
              </div>
              <div>
                <strong>Step 2:</strong> Iterate through each string in the input array.
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                <ArrowRight className="text-purple-600" size={20} />
              </div>
              <div>
                <strong>Step 3:</strong> Sort the characters of the string to form the <strong>key</strong>.
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                <ArrowRight className="text-purple-600" size={20} />
              </div>
              <div>
                <strong>Step 4:</strong> Add the original string to the list corresponding to that key in the map.
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                <ArrowRight className="text-purple-600" size={20} />
              </div>
              <div>
                <strong>Step 5:</strong> Return all values from the map as the result.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Complexity Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200 hover:scale-105 transition-transform duration-300">
            <h4 className="font-bold text-green-900 mb-2 text-lg">Time Complexity</h4>
            <p className="text-2xl font-mono font-bold text-green-700">O(N * K log K)</p>
            <p className="text-slate-700 mt-2">
              Where N is the number of strings, and K is the maximum length of a string. We iterate N times, and sorting takes K log K.
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200 hover:scale-105 transition-transform duration-300">
            <h4 className="font-bold text-purple-900 mb-2 text-lg">Space Complexity</h4>
            <p className="text-2xl font-mono font-bold text-purple-700">O(N * K)</p>
            <p className="text-slate-700 mt-2">
              To store the hash map with all strings grouped.
            </p>
          </div>
        </div>
      </div>

      <div ref={addToRefs} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 shadow-lg border-2 border-orange-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Key Insights</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Canonical Form:</strong> Sorting a string creates a canonical form that is identical for all its anagrams.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Hash Map Power:</strong> Hash Maps are perfect for grouping items based on a shared property (the sorted key).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Alternative:</strong> Instead of sorting (K log K), you could use a character count array (size 26) as the key (O(K)), but it's slightly more complex to implement as a map key.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
