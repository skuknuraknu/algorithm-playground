import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface LongestSubstringInputPanelProps {
  str: string;
  onStrChange: (str: string) => void;
}

export default function LongestSubstringInputPanel({ str, onStrChange }: LongestSubstringInputPanelProps) {
  const [inputValue, setInputValue] = useState(str);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onStrChange(value);
  };

  const handleReset = () => {
    const defaultStr = 'abcabcbb';
    setInputValue(defaultStr);
    onStrChange(defaultStr);
  };

  const handleExample = (example: string) => {
    setInputValue(example);
    onStrChange(example);
  };

  const examples = [
    { label: 'Example 1', value: 'abcabcbb' },
    { label: 'Example 2', value: 'bbbbb' },
    { label: 'Example 3', value: 'pwwkew' },
    { label: 'Example 4', value: 'dvdf' },
    { label: 'Long', value: 'abcdefghijklmnopqrstuvwxyz' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Input String</h3>
      
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a string"
          className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-purple-500 font-mono text-lg"
        />
        <button
          onClick={handleReset}
          className="bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={20} />
          Reset
        </button>
      </div>

      <div className="mb-4">
        <div className="text-sm text-slate-600 mb-2 font-semibold">Quick Examples:</div>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example.label}
              onClick={() => handleExample(example.value)}
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors text-sm"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
        <div className="text-sm text-slate-600 mb-2 font-semibold">
          Current String: {str.length} characters
        </div>
        <div className="font-mono text-lg text-slate-800 break-all bg-white p-3 rounded border-2 border-slate-300">
          {str || '(empty)'}
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        <p>
          <strong>Tip:</strong> Type any string to find the longest substring without repeating characters.
        </p>
      </div>
    </div>
  );
}
