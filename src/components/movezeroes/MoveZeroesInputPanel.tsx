import { Plus, Trash2, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface MoveZeroesInputPanelProps {
  nums: number[];
  onNumsChange: (nums: number[]) => void;
}

export default function MoveZeroesInputPanel({ nums, onNumsChange }: MoveZeroesInputPanelProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddNumber = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      onNumsChange([...nums, num]);
      setInputValue('');
    }
  };

  const handleRemoveNumber = (index: number) => {
    onNumsChange(nums.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    onNumsChange([0, 1, 0, 3, 12]);
    setInputValue('');
  };

  const handleRandomArray = () => {
    const length = 8 + Math.floor(Math.random() * 5); // 8-12 elements
    const newNums = Array.from({ length }, () => 
      Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 20) + 1
    );
    onNumsChange(newNums);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Input Array</h3>
      
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNumber()}
          placeholder="Enter a number"
          className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddNumber}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
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
          Current Array: [{nums.length} elements]
        </div>
        <div className="flex flex-wrap gap-2">
          {nums.map((num, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold shadow-md ${
                num === 0
                  ? 'bg-red-100 text-red-700 border-2 border-red-300'
                  : 'bg-blue-100 text-blue-700 border-2 border-blue-300'
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
          <strong>Tip:</strong> Add numbers to the array. Zeros are highlighted in red.
        </p>
      </div>
    </div>
  );
}
