import { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';

interface LRUCacheInputPanelProps {
  capacity: number;
  setCapacity: (capacity: number) => void;
  operations: { type: 'put' | 'get'; key: number; value?: number }[];
  setOperations: (ops: { type: 'put' | 'get'; key: number; value?: number }[]) => void;
  onRunOperation: (op: { type: 'put' | 'get'; key: number; value?: number }) => void;
  onReset: () => void;
}

export default function LRUCacheInputPanel({
  capacity,
  setCapacity,
  operations,
  setOperations,
  onRunOperation,
  onReset
}: LRUCacheInputPanelProps) {
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [opType, setOpType] = useState<'put' | 'get'>('put');

  const handleAddOperation = () => {
    const key = parseInt(keyInput);
    if (isNaN(key)) return;

    if (opType === 'put') {
      const value = parseInt(valueInput);
      if (isNaN(value)) return;
      const op = { type: 'put' as const, key, value };
      setOperations([...operations, op]);
      onRunOperation(op);
      setKeyInput('');
      setValueInput('');
    } else {
      const op = { type: 'get' as const, key };
      setOperations([...operations, op]);
      onRunOperation(op);
      setKeyInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-700">Cache Configuration</h3>
          <button
            onClick={onReset}
            className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1 text-sm"
          >
            <RotateCcw size={16} />
            Reset Cache
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Capacity
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              value={capacity}
              onChange={(e) => {
                setCapacity(parseInt(e.target.value));
                onReset();
              }}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded border border-indigo-200">
              {capacity}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h4 className="text-sm font-bold text-slate-700 mb-4">Add Operation</h4>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setOpType('put')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                opType === 'put'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              PUT (key, value)
            </button>
            <button
              onClick={() => setOpType('get')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                opType === 'get'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              GET (key)
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Key"
              className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {opType === 'put' && (
              <input
                type="number"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                placeholder="Value"
                className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            )}
            <button
              onClick={handleAddOperation}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 max-h-[300px] overflow-y-auto">
        <h3 className="text-lg font-bold text-slate-700 mb-4">Operation History</h3>
        <div className="space-y-2">
          {operations.map((op, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm font-mono p-2 bg-slate-50 rounded border border-slate-200">
              <span className={`font-bold ${op.type === 'put' ? 'text-blue-600' : 'text-purple-600'}`}>
                {op.type.toUpperCase()}
              </span>
              <span className="text-slate-600">
                {op.type === 'put' ? `(${op.key}, ${op.value})` : `(${op.key})`}
              </span>
            </div>
          ))}
          {operations.length === 0 && (
            <div className="text-center text-slate-400 italic py-4">
              No operations yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
