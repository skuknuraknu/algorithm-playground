import { useState } from 'react';
import { TreeDeciduous, Sparkles, Info } from 'lucide-react';

interface MaxDepthTreeInputPanelProps {
  onNodesChange: (nodes: (number | null)[]) => void;
}

export default function MaxDepthTreeInputPanel({ onNodesChange }: MaxDepthTreeInputPanelProps) {
  const [inputValue, setInputValue] = useState('3,9,20,null,null,15,7');

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

  const exampleTrees = [
    { value: '3,9,20,null,null,15,7', label: 'Balanced Tree', depth: 3 },
    { value: '1,null,2', label: 'Right Skewed', depth: 2 },
    { value: '1,2,3,4,5', label: 'Complete Tree', depth: 3 },
    { value: '1', label: 'Single Node', depth: 1 },
    { value: '1,2,null,3,null,4,null,5', label: 'Left Chain', depth: 5 }
  ];

  const nodeCount = inputValue.split(',').filter(item => {
    const trimmed = item.trim();
    return trimmed !== '' && trimmed.toLowerCase() !== 'null';
  }).length;

  return (
    <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-cyan-100">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg">
            <TreeDeciduous className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Input Tree
          </h3>
        </div>

        {/* Info Alert */}
        <div className="flex items-start gap-3 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-800">
            Masukkan nodes dalam format level-order (BFS). Gunakan <span className="font-mono bg-blue-100 px-1 rounded">null</span> untuk node kosong. Contoh: <span className="font-mono bg-blue-100 px-1 rounded">3,9,20,null,null,15,7</span>
          </p>
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Tree Nodes (level-order):
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Contoh: 3,9,20,null,null,15,7"
            className="w-full px-4 py-3 bg-white border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all duration-300 font-mono text-lg text-slate-800 shadow-inner"
          />
          <p className="mt-2 text-sm text-slate-500">
            Gunakan koma untuk memisahkan nodes
          </p>
        </div>

        {/* Example Buttons */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Sparkles className="text-cyan-500" size={16} />
            Contoh Tree:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {exampleTrees.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputValue(example.value);
                  const parsed = example.value
                    .split(',')
                    .map(item => {
                      const trimmed = item.trim();
                      if (trimmed === '' || trimmed.toLowerCase() === 'null') return null;
                      const num = parseInt(trimmed);
                      return isNaN(num) ? null : num;
                    });
                  onNodesChange(parsed);
                }}
                className="px-4 py-3 bg-gradient-to-br from-cyan-100 to-blue-100 hover:from-cyan-200 hover:to-blue-200 text-cyan-700 rounded-lg border-2 border-cyan-200 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <div className="font-semibold text-sm mb-1">{example.label}</div>
                <div className="text-xs opacity-70">Depth: {example.depth}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        {inputValue && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t-2 border-cyan-100">
            <div className="bg-white p-4 rounded-xl border-2 border-cyan-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Total Nodes</p>
              <p className="text-2xl font-bold text-cyan-600">{nodeCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-blue-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Total Input</p>
              <p className="text-2xl font-bold text-blue-600">
                {inputValue.split(',').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-sky-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Null Nodes</p>
              <p className="text-2xl font-bold text-sky-600">
                {inputValue.split(',').length - nodeCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
