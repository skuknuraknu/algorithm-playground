import { useState } from 'react';
import { Plus, Trash2, RotateCcw } from 'lucide-react';

interface GroupAnagramsInputPanelProps {
  strs: string[];
  setStrs: (strs: string[]) => void;
}

export default function GroupAnagramsInputPanel({ strs, setStrs }: GroupAnagramsInputPanelProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      setStrs([...strs, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index: number) => {
    const newStrs = [...strs];
    newStrs.splice(index, 1);
    setStrs(newStrs);
  };

  const handleReset = () => {
    setStrs(["eat", "tea", "tan", "ate", "nat", "bat"]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-lg font-bold text-slate-700 mb-4">Input Strings</h3>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Enter a string..."
            className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
          <button
            onClick={handleReset}
            className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            title="Reset to default"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {strs.map((str, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <span className="font-mono text-slate-700">{str}</span>
              <button
                onClick={() => handleRemove(index)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {strs.length === 0 && (
            <div className="text-slate-400 italic w-full text-center py-4">
              No strings added. Add some strings to group anagrams!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
