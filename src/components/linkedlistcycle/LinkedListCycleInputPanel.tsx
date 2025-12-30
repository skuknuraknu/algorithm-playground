import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface LinkedListCycleInputPanelProps {
  setProblemState: (state: any) => void;
}

export default function LinkedListCycleInputPanel({ setProblemState }: LinkedListCycleInputPanelProps) {
  const [inputValue, setInputValue] = useState('3,2,0,-4');
  const [posValue, setPosValue] = useState('1');
  const [error, setError] = useState('');

  const handleUpdate = () => {
    try {
      const arr = inputValue.split(',').map(num => {
        const parsed = parseInt(num.trim());
        if (isNaN(parsed)) throw new Error('Input harus berupa angka');
        return parsed;
      });

      const pos = parseInt(posValue);
      if (isNaN(pos)) throw new Error('Posisi harus berupa angka');
      if (pos < -1 || pos >= arr.length) throw new Error('Posisi tidak valid (harus -1 atau index dalam list)');

      setError('');
      setProblemState({ list: arr, pos });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-slate-200 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-orange-100 rounded-lg">
          <RefreshCw className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Input Linked List</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nilai Node (pisahkan dengan koma)
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none font-mono text-slate-600"
            placeholder="Contoh: 3,2,0,-4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Posisi Cycle (Index node yang dituju ekor, -1 jika tidak ada)
          </label>
          <input
            type="number"
            value={posValue}
            onChange={(e) => setPosValue(e.target.value)}
            className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none font-mono text-slate-600"
            placeholder="Contoh: 1"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        <button
          onClick={handleUpdate}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95 transform duration-100"
        >
          <RefreshCw size={20} />
          Update Visualisasi
        </button>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600">
        <p className="font-semibold mb-1">Cara Penggunaan:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Masukkan angka dipisahkan koma untuk membuat list.</li>
          <li>Tentukan <strong>Posisi Cycle</strong> (index 0-based).</li>
          <li>Gunakan <strong>-1</strong> jika tidak ingin ada cycle (list lurus).</li>
        </ul>
      </div>
    </div>
  );
}
