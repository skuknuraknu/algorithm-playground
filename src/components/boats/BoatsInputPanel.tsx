import { useState } from 'react';
import { Shuffle, Trash2 } from 'lucide-react';

interface BoatsInputPanelProps {
  people: number[];
  limit: number;
  onPeopleChange: (people: number[]) => void;
  onLimitChange: (limit: number) => void;
}

const presetExamples = [
  { name: 'Simple Pair', people: [1, 2], limit: 3 },
  { name: 'Mixed Weights', people: [3, 2, 2, 1], limit: 3 },
  { name: 'No Pairs', people: [3, 5, 3, 4], limit: 5 },
  { name: 'All Pairs', people: [1, 2, 1, 2], limit: 3 },
  { name: 'Heavy Load', people: [5, 1, 4, 2, 3], limit: 6 },
];

export default function BoatsInputPanel({
  people,
  limit,
  onPeopleChange,
  onLimitChange,
}: BoatsInputPanelProps) {
  const [inputValue, setInputValue] = useState(people.join(', '));

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numbers = value
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n) && n > 0);
    if (numbers.length > 0) {
      onPeopleChange(numbers);
    }
  };

  const handleRandomize = () => {
    const length = Math.floor(Math.random() * 6) + 4;
    const maxWeight = Math.floor(Math.random() * 3) + 4;
    const random = Array.from({ length }, () => Math.floor(Math.random() * maxWeight) + 1);
    onPeopleChange(random);
    setInputValue(random.join(', '));
    onLimitChange(maxWeight + 2);
  };

  const handlePreset = (people: number[], limit: number) => {
    onPeopleChange(people);
    onLimitChange(limit);
    setInputValue(people.join(', '));
  };

  const handleClear = () => {
    const defaultPeople = [3, 2, 2, 1];
    const defaultLimit = 3;
    onPeopleChange(defaultPeople);
    onLimitChange(defaultLimit);
    setInputValue(defaultPeople.join(', '));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            People Weights (comma-separated)
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 font-mono text-sm"
            placeholder="3, 2, 2, 1"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Boat Weight Limit
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => onLimitChange(parseInt(e.target.value) || 1)}
            min="1"
            className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
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

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Preset Examples
        </label>
        <div className="flex flex-wrap gap-2">
          {presetExamples.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePreset(preset.people, preset.limit)}
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
