import { useState } from 'react';
import { Sparkles, RefreshCw, Target } from 'lucide-react';

interface CombinationSumInputPanelProps {
  candidates: number[];
  target: number;
  setCandidates: (candidates: number[]) => void;
  setTarget: (target: number) => void;
}

export default function CombinationSumInputPanel({ 
  candidates, 
  target, 
  setCandidates, 
  setTarget 
}: CombinationSumInputPanelProps) {
  const [candidatesInput, setCandidatesInput] = useState(candidates.join(', '));
  const [targetInput, setTargetInput] = useState(String(target));

  const handleCandidatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidatesInput(e.target.value);
    const parsed = e.target.value
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number)
      .filter(n => !isNaN(n) && n >= 2 && n <= 40);
    
    const unique = Array.from(new Set(parsed));
    setCandidates(unique);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetInput(e.target.value);
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 40) {
      setTarget(value);
    }
  };

  const handleRandom = () => {
    const length = Math.floor(Math.random() * 3) + 2; // 2-4 candidates
    const newCandidates = Array.from(new Set(
      Array.from({ length }, () => Math.floor(Math.random() * 8) + 2) // 2-9 for simplicity
    ));
    const newTarget = Math.floor(Math.random() * 15) + 5; // 5-19
    
    setCandidates(newCandidates);
    setTarget(newTarget);
    setCandidatesInput(newCandidates.join(', '));
    setTargetInput(String(newTarget));
  };

  return (
    <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-rose-100 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg shadow-lg">
              <Target className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Input Parameter
            </h3>
          </div>
          <button
            onClick={handleRandom}
            className="group px-5 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-semibold flex items-center gap-2"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Acak
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
              Candidates (pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={candidatesInput}
              onChange={handleCandidatesChange}
              className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:border-rose-500 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all duration-300 text-lg font-mono bg-white shadow-inner"
              placeholder="misal: 2, 3, 6, 7"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
              Target
            </label>
            <input
              type="number"
              value={targetInput}
              onChange={handleTargetChange}
              min={1}
              max={40}
              className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 focus:outline-none transition-all duration-300 text-lg font-mono bg-white shadow-inner"
              placeholder="misal: 7"
            />
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex gap-2 flex-wrap">
              {candidates.map((num, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-200 rounded-xl font-mono font-bold text-rose-700 shadow-sm"
                >
                  {num}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <div className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full font-medium flex items-center gap-1">
                <Sparkles size={14} />
                {candidates.length} kandidat
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-md">
                Target: {target}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
