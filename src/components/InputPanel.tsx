import { useState } from 'react';
import { Shuffle, Trash2 } from 'lucide-react';
import { useLanguage } from '../i18n';

interface InputPanelProps {
  heights: number[];
  onHeightsChange: (heights: number[]) => void;
}

export default function InputPanel({ heights, onHeightsChange }: InputPanelProps) {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(heights.join(', '));

  const presetExamples = [
    { name: t.presetClassic, values: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
    { name: t.presetSimple, values: [1, 1] },
    { name: t.presetAscending, values: [1, 2, 3, 4, 5, 6, 7, 8] },
    { name: t.presetDescending, values: [8, 7, 6, 5, 4, 3, 2, 1] },
    { name: t.presetMountain, values: [1, 3, 5, 7, 9, 7, 5, 3, 1] },
  ];

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numbers = value
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n) && n > 0);
    if (numbers.length > 0) {
      onHeightsChange(numbers);
    }
  };

  const handleRandomize = () => {
    const length = Math.floor(Math.random() * 8) + 5;
    const random = Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
    onHeightsChange(random);
    setInputValue(random.join(', '));
  };

  const handlePreset = (values: number[]) => {
    onHeightsChange(values);
    setInputValue(values.join(', '));
  };

  const handleClear = () => {
    const defaultValues = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    onHeightsChange(defaultValues);
    setInputValue(defaultValues.join(', '));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {t.inputArrayLabel}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 border-2 border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 font-mono text-sm"
            placeholder="1, 8, 6, 2, 5, 4, 8, 3, 7"
          />
          <button
            onClick={handleRandomize}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md"
            title="Generate random array"
          >
            <Shuffle size={18} />
            {t.random}
          </button>
          <button
            onClick={handleClear}
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md"
            title="Reset to default"
          >
            <Trash2 size={18} />
            {t.reset}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {t.presetExamples}
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

      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> {t.tipContainer}
        </p>
      </div>
    </div>
  );
}
