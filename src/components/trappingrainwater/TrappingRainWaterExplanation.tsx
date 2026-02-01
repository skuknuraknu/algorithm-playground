import { CloudRain, Umbrella, MoveHorizontal, Building2, Droplets } from 'lucide-react';

export default function TrappingRainWaterExplanation() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    🌧️ Trapping Rain Water: Banjir Lokal
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Bayangin array itu adalah jajaran gedung dengan tinggi beda-beda. Pas hujan turun, air bakal
                    kejebak di "lembah" antara gedung-gedung itu.
                </p>
                <p className="text-slate-700 leading-relaxed">
                    Tugas kita: Hitung total unit air yang bisa ketampung biar nggak meluber! 🌊
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-sky-50 rounded-xl border-2 border-sky-100 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-sky-800 mb-3 flex items-center gap-2">
                            <Umbrella className="w-5 h-5" />
                            Logic: Ember Bocor
                        </h3>
                        <p className="text-slate-700 text-sm mb-3">
                            Kalo kamu diri di satu gedung (posisi <code>i</code>), air yang bisa kamu tampung di atas kepalamu
                            tergantung sama <strong>tembok tertinggi di kirimu</strong> DAN <strong>tembok tertinggi di kananmu</strong>.
                        </p>
                        <p className="text-slate-700 text-sm font-medium bg-sky-100 p-3 rounded-lg border border-sky-200">
                            Level Air di <code>i</code> = min(MaxLeft, MaxRight) - Tinggi[i]
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                            *Kalo hasilnya negatif, berarti 0 (air tumpah, gak ada wadah).
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <CloudRain className="w-32 h-32" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2 relative z-10">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                            Real World Use Case
                        </h3>
                        <ul className="space-y-3 relative z-10">
                            <li className="flex gap-3">
                                <div className="mt-1 bg-indigo-100 p-2 rounded-lg h-fit text-indigo-600">
                                    <Droplets className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">Design Drainase</h4>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Arsitek lansekap perlu ngitung potensi genangan air di kontur tanah yang gak rata buat bikin saluran air yang bener.
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1 bg-emerald-100 p-2 rounded-lg h-fit text-emerald-600">
                                    <MoveHorizontal className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">Histogram Processing</h4>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Di pengolahan citra, logika serupa dipake buat segmentasi atau ngeratain histogram (walau gak persis sama, konsep "scanning" kiri-kanan itu kepake).
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
