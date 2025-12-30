import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneSpace } from 'react-syntax-highlighter/dist/esm/styles/prism';

const code = `function minWindow(s, t) {
  if (t.length > s.length) return '';
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let missing = t.length;
  let left = 0;
  let best = [-Infinity, Infinity];

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    need.set(ch, (need.get(ch) || 0) - 1);
    if (need.get(ch) >= 0) missing--;

    while (missing === 0) {
      if (right - left < best[1] - best[0]) best = [left, right];
      const leftCh = s[left];
      need.set(leftCh, (need.get(leftCh) || 0) + 1);
      if (need.get(leftCh) > 0) missing++;
      left++;
    }
  }

  return best[1] === Infinity ? '' : s.slice(best[0], best[1] + 1);
}
`;

export default function MinWindowCodeEditor() {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md border border-slate-800">
      <div className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-400 bg-slate-950 border-b border-slate-800">
        Sliding window O(n)
      </div>
      <SyntaxHighlighter language="javascript" style={duotoneSpace} customStyle={{ margin: 0, padding: '16px', background: 'transparent' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
