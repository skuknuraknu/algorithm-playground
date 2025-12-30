import CodeEditor from '../CodeEditor';

const defaultCode = `
function letterCombinations(digits) {
    if (digits.length === 0) return [];
    
    const phoneMap = {
        '2': 'abc', '3': 'def', '4': 'ghi',
        '5': 'jkl', '6': 'mno', '7': 'pqrs',
        '8': 'tuv', '9': 'wxyz'
    };
    
    const result = [];
    
    function backtrack(index, current) {
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        const letters = phoneMap[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }
    
    backtrack(0, '');
    return result;
}
`;

export default function LetterCombinationsCodeEditor() {
  return (
    <CodeEditor
      // @ts-ignore
      initialCode={defaultCode}
      language="javascript"
    />
  );
}
