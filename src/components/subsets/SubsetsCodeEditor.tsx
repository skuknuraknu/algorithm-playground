import CodeEditor from '../CodeEditor';

const defaultCode = `
function subsets(nums) {
    const result = [];
    const n = nums.length;

    function backtrack(start, currentSubset) {
        result.push([...currentSubset]);

        for (let i = start; i < n; i++) {
            currentSubset.push(nums[i]);
            backtrack(i + 1, currentSubset);
            currentSubset.pop();
        }
    }

    backtrack(0, []);
    return result;
}
`;

export default function SubsetsCodeEditor() {
  return (
    <CodeEditor
      // @ts-ignore
      initialCode={defaultCode}
      language="javascript"
    />
  );
}
