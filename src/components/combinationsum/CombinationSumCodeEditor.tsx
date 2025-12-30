import CodeEditor from '../CodeEditor';

const defaultCode = `
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(start, current, currentSum) {
        if (currentSum === target) {
            result.push([...current]);
            return;
        }
        
        if (currentSum > target) {
            return; // Prune: no need to continue
        }
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            // We can reuse same element, so pass i (not i+1)
            backtrack(i, current, currentSum + candidates[i]);
            current.pop(); // Backtrack
        }
    }
    
    backtrack(0, [], 0);
    return result;
}
`;

export default function CombinationSumCodeEditor() {
  return (
    <CodeEditor
      // @ts-ignore
      initialCode={defaultCode}
      language="javascript"
    />
  );
}
