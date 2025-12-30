interface AddBinaryVisualizerProps {
  a: string;
  b: string;
}

function addBinary(a: string, b: string): { result: string; steps: { index: number; aDigit: number; bDigit: number; carryIn: number; sum: number; resultDigit: number; carryOut: number }[] } {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const steps: { index: number; aDigit: number; bDigit: number; carryIn: number; sum: number; resultDigit: number; carryOut: number }[] = [];
  const res: string[] = [];
  let idx = 0;

  while (i >= 0 || j >= 0 || carry) {
    const aDigit = i >= 0 ? Number(a[i]) : 0;
    const bDigit = j >= 0 ? Number(b[j]) : 0;
    const carryIn = carry;
    const sum = aDigit + bDigit + carry;
    const resultDigit = sum % 2;
    carry = Math.floor(sum / 2);

    res.push(String(resultDigit));
    steps.push({ index: idx, aDigit, bDigit, carryIn, sum, resultDigit, carryOut: carry });

    i -= 1;
    j -= 1;
    idx += 1;
  }

  return { result: res.reverse().join(''), steps };
}

export default function AddBinaryVisualizer({ a, b }: AddBinaryVisualizerProps) {
  const { result, steps } = addBinary(a || '0', b || '0');

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Addition Walkthrough</h3>
          <p className="text-slate-600">Proses penjumlahan biner digit demi digit.</p>
        </div>
        <div className="bg-orange-50 border-2 border-orange-200 text-orange-700 px-4 py-2 rounded-lg font-semibold">
          Result: {result}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 font-mono text-lg space-y-1">
        <div>a: {a || '0'}</div>
        <div>b: {b || '0'}</div>
        <div className="text-sm text-slate-500">(dihitung dari kanan ke kiri)</div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {steps.map((step) => (
          <div key={step.index} className="p-4 rounded-lg border-2 border-orange-200 bg-orange-50 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-800">Digit {step.index + 1}</div>
              <div className="text-xs px-2 py-1 rounded-full bg-white border border-orange-200">carry in: {step.carryIn}</div>
            </div>
            <div className="text-sm text-slate-700">
              {step.aDigit} + {step.bDigit} + carry {step.carryIn} = {step.sum} → digit {step.resultDigit}, carry out {step.carryOut}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
