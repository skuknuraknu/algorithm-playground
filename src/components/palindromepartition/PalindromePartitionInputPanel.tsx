import { useState } from 'react';
import { Scissors, Sparkles, Info } from 'lucide-react';

interface PalindromePartitionInputPanelProps {
  onStringChange: (str: string) => void;
}

export default function PalindromePartitionInputPanel({ onStringChange }: PalindromePartitionInputPanelProps) {
  const [inputString, setInputString] = useState('aab');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
    if (value.length <= 16) {
      setInputString(value);
      onStringChange(value);
    }
  };

  const exampleStrings = [
    { value: 'aab', label: 'aab' },
    { value: 'a', label: 'a' },
    { value: 'aaa', label: 'aaa' },
    { value: 'aba', label: 'aba' },
    { value: 'racecar', label: 'racecar' }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 rounded-2xl p-8 shadow-xl border-2 border-purple-100">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg shadow-lg">
            <Scissors className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Input String
          </h3>
        </div>

        {/* Info Alert */}
        <div className="flex items-start gap-3 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-800">
            Masukkan string yang ingin dipartisi. Hanya huruf kecil yang diperbolehkan (maksimal 16 karakter).
          </p>
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            String (huruf kecil):
          </label>
          <input
            type="text"
            value={inputString}
            onChange={handleInputChange}
            placeholder="Masukkan string..."
            className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 font-mono text-lg text-slate-800 shadow-inner"
            maxLength={16}
          />
          <p className="mt-2 text-sm text-slate-500">
            Panjang: <span className="font-bold text-purple-600">{inputString.length}</span> / 16
          </p>
        </div>

        {/* Example Buttons */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Sparkles className="text-purple-500" size={16} />
            Contoh String:
          </label>
          <div className="flex flex-wrap gap-2">
            {exampleStrings.map((example) => (
              <button
                key={example.value}
                onClick={() => {
                  setInputString(example.value);
                  onStringChange(example.value);
                }}
                className="px-4 py-2 bg-gradient-to-br from-purple-100 to-fuchsia-100 hover:from-purple-200 hover:to-fuchsia-200 text-purple-700 font-mono rounded-lg border-2 border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        {inputString && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-purple-100">
            <div className="bg-white p-4 rounded-xl border-2 border-purple-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Panjang String</p>
              <p className="text-2xl font-bold text-purple-600">{inputString.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-fuchsia-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Karakter Unik</p>
              <p className="text-2xl font-bold text-fuchsia-600">
                {new Set(inputString.split('')).size}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
