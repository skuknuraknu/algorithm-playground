import { useState } from 'react';
import { GitBranch, Sparkles, Info } from 'lucide-react';

interface PathSumInputPanelProps {
  onNodesChange: (nodes: (number | null)[]) => void;
  onTargetChange: (target: number) => void;
}

export default function PathSumInputPanel({ onNodesChange, onTargetChange }: PathSumInputPanelProps) {
  const [inputValue, setInputValue] = useState('5,4,8,11,null,13,4,7,2,null,null,null,1');
  const [targetSum, setTargetSum] = useState(22);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const parsed = value
      .split(',')
      .map(item => {
        const trimmed = item.trim();
        if (trimmed === '' || trimmed.toLowerCase() === 'null') return null;
        const num = parseInt(trimmed);
        return isNaN(num) ? null : num;
      });
    
    onNodesChange(parsed);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setTargetSum(value);
      onTargetChange(value);
    }
  };

  const exampleCases = [
    { 
      nodes: '5,4,8,11,null,13,4,7,2,null,null,null,1', 
      target: 22, 
      label: 'Classic Example',
      hasPath: true
    },
    { 
      nodes: '1,2,3', 
      target: 5, 
      label: 'No Path',
      hasPath: false
    },
    { 
      nodes: '1,2', 
      target: 1, 
      label: 'Not a Leaf',
      hasPath: false
    },
    { 
      nodes: '-2,null,-3', 
      target: -5, 
      label: 'Negative Values',
      hasPath: true
    }
  ];

  const nodeCount = inputValue.split(',').filter(item => {
    const trimmed = item.trim();
    return trimmed !== '' && trimmed.toLowerCase() !== 'null';
  }).length;

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl p-8 shadow-xl border-2 border-orange-100">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg shadow-lg">
            <GitBranch className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Input Tree & Target Sum
          </h3>
        </div>

        {/* Info Alert */}
        <div className="flex items-start gap-3 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-800">
            Masukkan nodes dalam format level-order dan target sum. Path harus dari root ke leaf dengan jumlah = target.
          </p>
        </div>

        {/* Tree Input Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Tree Nodes (level-order):
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Contoh: 5,4,8,11,null,13,4,7,2"
            className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300 font-mono text-lg text-slate-800 shadow-inner"
          />
        </div>

        {/* Target Sum Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Target Sum:
          </label>
          <input
            type="number"
            value={targetSum}
            onChange={handleTargetChange}
            placeholder="Contoh: 22"
            className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all duration-300 font-mono text-lg text-slate-800 shadow-inner"
          />
        </div>

        {/* Example Buttons */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Sparkles className="text-orange-500" size={16} />
            Contoh Test Cases:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {exampleCases.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputValue(example.nodes);
                  setTargetSum(example.target);
                  const parsed = example.nodes
                    .split(',')
                    .map(item => {
                      const trimmed = item.trim();
                      if (trimmed === '' || trimmed.toLowerCase() === 'null') return null;
                      const num = parseInt(trimmed);
                      return isNaN(num) ? null : num;
                    });
                  onNodesChange(parsed);
                  onTargetChange(example.target);
                }}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${
                  example.hasPath
                    ? 'bg-gradient-to-br from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 text-orange-700 border-orange-200'
                    : 'bg-gradient-to-br from-slate-100 to-gray-100 hover:from-slate-200 hover:to-gray-200 text-slate-700 border-slate-200'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{example.label}</div>
                <div className="text-xs opacity-70">Target: {example.target}</div>
                <div className={`text-xs mt-1 font-bold ${example.hasPath ? 'text-emerald-600' : 'text-red-600'}`}>
                  {example.hasPath ? '✓ Has Path' : '✗ No Path'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        {inputValue && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t-2 border-orange-100">
            <div className="bg-white p-4 rounded-xl border-2 border-orange-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Total Nodes</p>
              <p className="text-2xl font-bold text-orange-600">{nodeCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-amber-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Target Sum</p>
              <p className="text-2xl font-bold text-amber-600">{targetSum}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-yellow-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Null Nodes</p>
              <p className="text-2xl font-bold text-yellow-600">
                {inputValue.split(',').length - nodeCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
