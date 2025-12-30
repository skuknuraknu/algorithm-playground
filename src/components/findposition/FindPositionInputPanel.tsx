import { Plus, Trash2, RefreshCw, Target } from 'lucide-react';
import { useState } from 'react';

interface FindPositionInputPanelProps {
  nums: number[];
  target: number;
  onNumsChange: (nums: number[]) => void;
  onTargetChange: (target: number) => void;
}

export default function FindPositionInputPanel({ nums, target, onNumsChange, onTargetChange }: FindPositionInputPanelProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddNumber = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      const newNums = [...nums, num].sort((a, b) => a - b);
      onNumsChange(newNums);
      setInputValue('');
    }
  };

  const handleRemoveNumber = (index: number) => {
    onNumsChange(nums.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    onNumsChange([5, 7, 7, 8, 8, 10]);
    onTargetChange(8);
    setInputValue('');
  };

  const handleRandomArray = () => {
    const length = 10 + Math.floor(Math.random() * 6); // 10-15 elements
    const newNums: number[] = [];
    for (let i = 0; i < length; i++) {
      newNums.push(Math.floor(Math.random() * 20));
    }
    newNums.sort((a, b) => a - b);
    onNumsChange(newNums);
    if (newNums.length > 0) {
      onTargetChange(newNums[Math.floor(Math.random() * newNums.length)]);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Input Configuration</h3>
      
      {/* Target Input */}
      <div className="mb-4 bg-indigo-50 rounded-lg p-4 border-2 border-indigo-200">
        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <Target size={18} className="text-indigo-600" />
          Target Value
        </label>
        <input
          type="number"
          value={target}
          onChange={(e) => onTargetChange(parseInt(e.target.value) || 0)}
          className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-xl font-bold text-center"
        />
      </div>

      {/* Array Input */}
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNumber()}
          placeholder="Add number to array"
          className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleAddNumber}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleReset}
          className="flex-1 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} />
          Reset to Example
        </button>
        <button
          onClick={handleRandomArray}
          className="flex-1 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
        >
          Random Array
        </button>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
        <div className="text-sm text-slate-600 mb-2 font-semibold">
          Sorted Array: [{nums.length} elements]
        </div>
        <div className="flex flex-wrap gap-2">
          {nums.map((num, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold shadow-md ${
                num === target
                  ? 'bg-indigo-500 text-white border-2 border-indigo-600 scale-110'
                  : 'bg-slate-200 text-slate-700 border-2 border-slate-300'
              }`}
            >
              {num}
              <button
                onClick={() => handleRemoveNumber(index)}
                className="hover:bg-red-200 rounded p-1 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        <p>
          <strong>Note:</strong> Array is automatically sorted. Target values are highlighted in indigo.
        </p>
      </div>
    </div>
  );
}
