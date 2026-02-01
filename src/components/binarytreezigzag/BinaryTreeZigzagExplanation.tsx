import { Smile, Zap, Repeat, Printer, ArrowRightLeft } from 'lucide-react';

export default function BinaryTreeZigzagExplanation() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    ⚡ Zigzag Traversal: Maju Mundur Cantik
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Kalau Level Order biasa itu kayak baris-berbaris yang rapi, <strong>Zigzag Traversal</strong> ini lebih kayak style "baperan".
                    Kadang ke kanan, kadang ke kiri. Persis kayak lagu syantik: <em>"Maju mundur cantik... cantik!"</em> 💃
                </p>
                <p className="text-slate-700 leading-relaxed">
                    Intinya sama kayak BFS biasa, tapi arah masukin nilainya gonta-ganti tiap level.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-100 shadow">
                        <h3 className="text-xl font-bold text-pink-800 mb-2 flex items-center gap-2">
                            <Smile className="w-5 h-5" />
                            Intuisi: Analogi Ular Tangga 🐍
                        </h3>
                        <p className="text-slate-700 mb-4 text-sm">
                            Inget main ular tangga pas kecil?
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
                            <li><strong>Baris 1 (Bawah):</strong> Jalan dari kiri ke kanan (1, 2, 3...)</li>
                            <li><strong>Baris 2 (Atasnya):</strong> Jalan dari kanan ke kiri (20, 19, 18...)</li>
                            <li><strong>Baris 3:</strong> Balik lagi kiri ke kanan.</li>
                        </ul>
                        <p className="text-slate-700 mt-4 text-sm">
                            Nah, Zigzag Traversal ini persis kayak papan ular tangga. Biar efisien dan gak capek bolak-balik ujung ke ujung.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-500" />
                            Teknisnya Gimana? (Jujurly)
                        </h3>

                        <div className="space-y-3">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <strong className="text-indigo-600">The Trick:</strong> Pake <code>Deque</code> (Double Ended Queue) atau mainin posisi indeks array.
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <strong className="text-indigo-600">Logic:</strong>
                                <ul className="list-disc list-inside ml-2 mt-1 text-sm text-slate-600">
                                    <li>Ada flag/boolean <code>isReverse</code>.</li>
                                    <li>Kalau <code>false</code>: append biasa (push).</li>
                                    <li>Kalau <code>true</code>: append depan (unshift).</li>
                                    <li>Flip flag tiap ganti level. Simpel kan?</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Printer className="w-24 h-24" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2 relative z-10">
                            <Printer className="w-5 h-5 text-emerald-600" />
                            Real World Use Cases
                        </h3>
                        <div className="space-y-4 relative z-10">
                            <div className="flex gap-3">
                                <div className="mt-1 bg-emerald-100 p-2 rounded-lg h-fit text-emerald-600">
                                    <Printer className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">1. Old School Dot Matrix Printers</h4>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Printer jadul nyetak baris 1 dari kiri-kanan, terus baris 2 dari kanan-kiri pas head-nya balik. Biar cepet, gak buang waktu balikin head ke kiri dulu (Carriage Return). Hemat waktu = Duit! 💸
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 bg-blue-100 p-2 rounded-lg h-fit text-blue-600">
                                    <ArrowRightLeft className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">2. Disk Scheduling (SCAN Algorithm)</h4>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Head hard disk baca data dari track luar ke dalem, terus dari dalem ke luar lagi. Mirip gerakan lift (Elevator Algorithm) biar gak mondar-mandir sembarangan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl border-2 border-purple-100 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
                            <Repeat className="w-5 h-5" />
                            Complexity
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-purple-900">
                            <div>
                                <strong>Time: O(N)</strong>
                                <br /> Semua node dikunjungi sekali.
                            </div>
                            <div>
                                <strong>Space: O(W)</strong>
                                <br /> W = Width max tree (bisa sampe N/2).
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
