import { useState } from 'react';
import { Shuffle, Trash2 } from 'lucide-react';

interface MountainInputPanelProps {
  arr: number[];
  onArrChange: (arr: number[]) => void;
}

const presetExamples = [
  { name: 'Valid Mountain', values: [0, 3, 2, 1] },
  { name: 'Plateau', values: [3, 5, 5] },
  { name: 'Only Up', values: [0, 1, 2, 3, 4, 5] },
  { name: 'Only Down', values: [5, 4, 3, 2, 1] },
  { name: 'Large Mountain', values: [0, 2, 3, 4, 5, 3, 2, 1, 0] },
];

export default function MountainInputPanel({ arr, onArrChange }: MountainInputPanelProps) {
  const [inputValue, setInputValue] = useState(arr.join(', '));

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numbers = value
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
    if (numbers.length > 0) {
      onArrChange(numbers);
    }
  };

  const handleRandomize = () => {
    const length = Math.floor(Math.random() * 6) + 5;
    const random: number[] = [];
    const peak = Math.floor(Math.random() * (length - 2)) + 1;

    for (let i = 0; i <= peak; i++) {
      random.push(i * 2);
    }
    for (let i = peak + 1; i < length; i++) {
      random.push((length - i) * 2 - 1);
    }

    onArrChange(random);
    setInputValue(random.join(', '));
  };

  const handlePreset = (values: number[]) => {
    onArrChange(values);
    setInputValue(values.join(', '));
  };

  const handleClear = () => {
    const defaultValues = [0, 3, 2, 1];
    onArrChange(defaultValues);
    setInputValue(defaultValues.join(', '));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Array Input (comma-separated numbers)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 border-2 border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 font-mono text-sm"
            placeholder="0, 3, 2, 1"
          />
          <button
            onClick={handleRandomize}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md"
          >
            <Shuffle size={18} />
            Random
          </button>
          <button
            onClick={handleClear}
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md"
          >
            <Trash2 size={18} />
            Reset
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Preset Examples
        </label>
        <div className="flex flex-wrap gap-2">
          {presetExamples.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePreset(preset.values)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border-2 border-slate-300"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
