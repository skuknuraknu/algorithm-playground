import { useEffect, useRef } from 'react';
import { CloudRain, Droplets, Zap, Code, Building2, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

export default function TrappingRainWaterExplanation() {
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
            {/* Problem Introduction */}
            <div ref={addToRefs} className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-8 shadow-lg border-2 border-sky-200">
                <div className="flex items-start gap-4">
                    <div className="text-5xl">🌧️</div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <CloudRain className="text-blue-600" size={36} />
                            Trapping Rain Water
                        </h2>
                        <p className="text-slate-700 text-lg leading-relaxed mb-4">
                            Bayangkan array sebagai <strong className="text-blue-700">deretan gedung dengan tinggi berbeda</strong>.
                            Saat hujan turun 🌧️, air akan <strong className="text-cyan-600">terperangkap di lembah</strong> antara gedung-gedung tinggi.
                            Berapa banyak air yang bisa ditampung?
                        </p>
                        <div className="bg-white rounded-lg p-4 border-2 border-sky-200">
                            <div className="text-sm font-semibold text-sky-700 mb-2">💡 Challenge</div>
                            <p className="text-sm text-slate-600">
                                Hitung total unit air yang bisa ter-trap dengan <strong className="text-emerald-600">O(n)</strong> time
                                dan <strong className="text-emerald-600">O(1)</strong> space (two pointer approach)!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fun Analogy */}
            <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Building2 className="text-indigo-600" size={28} />
                    🏙️ Analogi: Skyline Kota Setelah Hujan
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
                            <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                <Droplets className="text-blue-600" size={20} />
                                Konsep Dasar
                            </h4>
                            <p className="text-slate-700 leading-relaxed mb-3">
                                Untuk setiap posisi, air yang bisa ditampung tergantung pada dua hal:
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">1.</span>
                                    <span><strong>Tembok tertinggi di KIRI</strong> (leftMax)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold">2.</span>
                                    <span><strong>Tembok tertinggi di KANAN</strong> (rightMax)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border-2 border-amber-200">
                            <h4 className="font-bold text-amber-800 mb-2">🧮 Formula</h4>
                            <div className="bg-white p-4 rounded-lg border border-amber-300 font-mono text-sm">
                                water[i] = min(leftMax, rightMax) - height[i]
                            </div>
                            <p className="text-xs text-slate-600 mt-2">
                                *Jika hasilnya negatif, berarti 0 (air tumpah, tidak ada wadah)
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl">
                        <div className="text-white text-sm mb-3 font-semibold">Visual Example:</div>
                        {/* Mini Visual */}
                        <div className="flex items-end gap-1 h-32 mb-3">
                            {[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1].map((h, i) => (
                                <div key={i} className="relative flex-1 flex flex-col justify-end">
                                    {/* Water visualization */}
                                    {[0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0][i] > 0 && (
                                        <div
                                            className="w-full bg-blue-500/70 absolute"
                                            style={{
                                                height: `${[0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0][i] * 25}px`,
                                                bottom: `${h * 25}px`
                                            }}
                                        />
                                    )}
                                    {/* Building */}
                                    <div
                                        className="w-full bg-slate-600 border border-slate-500 rounded-t"
                                        style={{ height: `${h * 25}px`, minHeight: '2px' }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <div className="text-cyan-400 text-2xl font-bold">6 units</div>
                            <div className="text-slate-400 text-xs">Total water trapped</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Three Approaches */}
            <div ref={addToRefs} className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-800">🎯 Three Solution Approaches</h3>

                <div className="grid md:grid-cols-3 gap-4">
                    {/* Brute Force */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <h4 className="font-bold text-red-800">Brute Force</h4>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="bg-white p-3 rounded-lg border border-red-200">
                                <div className="font-semibold text-red-700 mb-1">Idea:</div>
                                <p className="text-slate-600">
                                    Untuk setiap posisi, scan kiri dan kanan untuk cari max
                                </p>
                            </div>
                            <div className="bg-red-600 text-white p-3 rounded-lg">
                                <div className="text-xs opacity-90">Complexity:</div>
                                <div className="font-mono">Time: O(n²)<br />Space: O(1)</div>
                            </div>
                            <div className="text-xs text-red-700">
                                ❌ Terlalu lambat untuk array besar
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Programming */}
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border-2 border-purple-200">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                            <h4 className="font-bold text-purple-800">Dynamic Programming</h4>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="bg-white p-3 rounded-lg border border-purple-200">
                                <div className="font-semibold text-purple-700 mb-1">Idea:</div>
                                <p className="text-slate-600">
                                    Pre-compute leftMax dan rightMax arrays
                                </p>
                            </div>
                            <div className="bg-purple-600 text-white p-3 rounded-lg">
                                <div className="text-xs opacity-90">Complexity:</div>
                                <div className="font-mono">Time: O(n)<br />Space: O(n)</div>
                            </div>
                            <div className="text-xs text-purple-700">
                                ✅ Good, tapi butuh extra space
                            </div>
                        </div>
                    </div>

                    {/* Two Pointers */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200 ring-4 ring-emerald-300/50">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                            <h4 className="font-bold text-emerald-800">Two Pointers ⭐</h4>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="bg-white p-3 rounded-lg border border-emerald-200">
                                <div className="font-semibold text-emerald-700 mb-1">Idea:</div>
                                <p className="text-slate-600">
                                    Dua pointer dari kiri & kanan, gerak ke tengah
                                </p>
                            </div>
                            <div className="bg-emerald-600 text-white p-3 rounded-lg">
                                <div className="text-xs opacity-90">Complexity:</div>
                                <div className="font-mono">Time: O(n)<br />Space: O(1)</div>
                            </div>
                            <div className="text-xs text-emerald-700 font-semibold">
                                ⭐ OPTIMAL!
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Pointer Deep Dive */}
            <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <TrendingUp className="text-emerald-600" size={28} />
                    🔍 Two Pointer Approach (Deep Dive)
                </h3>

                <div className="space-y-6">
                    {/* Algorithm Steps */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
                        <h4 className="font-bold text-emerald-800 mb-4">📝 Algorithm Steps:</h4>
                        <ol className="space-y-3">
                            {[
                                { step: 'Initialize left = 0, right = n-1', desc: 'Mulai dari kedua ujung' },
                                { step: 'Track leftMax = 0, rightMax = 0', desc: 'Simpan tinggi maksimal' },
                                { step: 'While left < right:', desc: 'Loop sampai bertemu' },
                                { step: '  If height[left] < height[right]:', desc: 'Cek sisi mana yang lebih rendah' },
                                { step: '    Process left side', desc: 'Air ditentukan oleh leftMax' },
                                { step: '  Else:', desc: '' },
                                { step: '    Process right side', desc: 'Air ditentukan oleh rightMax' },
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {idx + 1}
                                    </span>
                                    <div>
                                        <code className="text-sm bg-white px-2 py-1 rounded border border-emerald-300">{item.step}</code>
                                        {item.desc && <p className="text-xs text-slate-600 mt-1">{item.desc}</p>}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Code Implementation */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-900 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Code className="text-emerald-400" size={20} />
                                <h4 className="text-lg font-bold text-white">Two Pointer Code</h4>
                            </div>
                            <pre className="text-xs text-emerald-400 overflow-x-auto">
                                {`function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  
  return water;
}`}
                            </pre>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
                                <h4 className="font-bold text-blue-800 mb-2">💡 Key Insight</h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Kita <strong>tidak perlu tahu</strong> exact max di sisi lain!
                                    Cukup tahu sisi mana yang <strong>lebih rendah</strong>, karena air akan
                                    dibatasi oleh sisi yang rendah tersebut.
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200">
                                <h4 className="font-bold text-amber-800 mb-2">🎯 Why It Works</h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Jika <code className="bg-white px-1 rounded">height[left] {"<"} height[right]</code>,
                                    berarti <strong>leftMax</strong> adalah bottleneck untuk posisi <code className="bg-white px-1 rounded">left</code>.
                                    Tidak peduli seberapa tinggi tembok di kanan!
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
                                <h4 className="font-bold text-purple-800 mb-2">⚡ Optimization</h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Dengan memproses dari kedua ujung <strong>simultaneously</strong>,
                                    kita hanya perlu <strong>satu pass</strong> (O(n)) dan
                                    <strong>zero extra space</strong> (O(1))!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real World Applications */}
            <div ref={addToRefs} className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                    <h4 className="font-bold text-cyan-800 mb-4 flex items-center gap-2">
                        <Droplets className="text-cyan-600" size={24} />
                        🏗️ Real World: Urban Planning
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        <strong>Drainage System Design:</strong> Engineers menggunakan konsep ini untuk
                        menghitung kapasitas genangan air di area urban dengan topografi tidak rata,
                        membantu design sistem drainase yang optimal.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
                    <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <Zap className="text-emerald-600" size={24} />
                        📊 Real World: Data Analysis
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        <strong>Histogram Analysis:</strong> Konsep similar dipakai dalam image processing
                        dan data visualization untuk mengidentifikasi "valleys" dan "peaks" dalam distribusi data.
                    </p>
                </div>
            </div>

            {/* Edge Cases */}
            <div ref={addToRefs} className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-rose-200">
                <h3 className="text-xl font-bold text-rose-800 mb-4">⚠️ Edge Cases to Consider</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-lg border border-rose-200">
                        <strong className="text-rose-700">Empty or single element:</strong>
                        <p className="text-slate-600 mt-1">Return 0 (no water can be trapped)</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-rose-200">
                        <strong className="text-rose-700">Flat terrain:</strong>
                        <p className="text-slate-600 mt-1">[2,2,2,2] → 0 (no valleys)</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-rose-200">
                        <strong className="text-rose-700">Ascending or descending:</strong>
                        <p className="text-slate-600 mt-1">[1,2,3,4] or [4,3,2,1] → 0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
