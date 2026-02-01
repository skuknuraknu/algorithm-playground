import { Map, Zap, Smile, GitMerge, MousePointerClick } from 'lucide-react';

export default function UniquePathsExplanation() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    🤖 Unique Paths: Robot Gabut & Jalan Tikus
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Bayangin ada robot di pojok kiri atas (Start) mau ke warteg di pojok kanan bawah (Finish).
                    Tapi robot ini rodanya agak rusak, cuma bisa gerak ke <strong>KANAN</strong> atau <strong>BAWAH</strong>.
                </p>
                <p className="text-slate-700 leading-relaxed">
                    Pertanyaannya: Ada berapa banyak <em>jalan tikus</em> (unique paths) yang bisa diambil si robot buat sampe ke warteg? 🤔
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-indigo-50 rounded-xl border-2 border-indigo-100 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">
                            <Map className="w-5 h-5" />
                            Konsep Dasar (Visual)
                        </h3>
                        <p className="text-slate-700 text-sm mb-3">
                            Kalo kamu berdiri di kotak <code>(i, j)</code>, kamu cuma bisa dateng dari:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm ml-2">
                            <li><strong>Atas (Top):</strong> Dari kotak <code>(i-1, j)</code></li>
                            <li><strong>Kiri (Left):</strong> Dari kotak <code>(i, j-1)</code></li>
                        </ul>
                        <p className="text-slate-700 text-sm mt-3 font-medium bg-indigo-100 p-2 rounded-lg inline-block">
                            Total Jalan = Jalan dari Atas + Jalan dari Kiri
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-500" />
                            Dynamic Programming (DP) Formula
                        </h3>
                        <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto text-slate-300 font-mono text-sm">
                            <span className="text-pink-400">dp[i][j]</span> = <span className="text-sky-400">dp[i-1][j]</span> + <span className="text-emerald-400">dp[i][j-1]</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            *Base case: Pinggiran grid (baris 0 & kolom 0) cuma punya 1 jalan (lurus doang mentok).
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <GitMerge className="w-32 h-32" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2 relative z-10">
                            <Map className="w-5 h-5 text-emerald-600" />
                            Analogi Kehidupan
                        </h3>
                        <div className="space-y-4 relative z-10">
                            <div className="flex gap-3">
                                <div className="mt-1 bg-emerald-100 p-2 rounded-lg h-fit text-emerald-600">
                                    <Smile className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">Anak Kos Cari Makan</h4>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Mau lewat gang A atau gang B, tujuannya sama: Warteg Bu Ijah. Kita mau itung total kombinasi rute biar gak bosen lewat jalan yang itu-itu aja.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 bg-blue-100 p-2 rounded-lg h-fit text-blue-600">
                                    <MousePointerClick className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">Game RPG</h4>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Character kamu mau ke Dungeon Boss. Map-nya kotak-kotak. Kamu grinding itungin steps biar dapet rute paling optimal (atau paling banyak XP).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-pink-50 rounded-xl border-2 border-pink-100 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-pink-800 mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Complexity
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-pink-900">
                            <div>
                                <strong>Time: O(m * n)</strong>
                                <br /> Kita ngisi setiap kotak sekali.
                            </div>
                            <div>
                                <strong>Space: O(m * n)</strong>
                                <br /> Buat nyimpen tabel DP full. Bisa dioptimasi jadi O(n) lho!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
