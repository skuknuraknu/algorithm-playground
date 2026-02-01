export type VPChar = '(' | ')' | '[' | ']' | '{' | '}' | string;

export interface VPStep {
  index: number;
  char: VPChar;
  action: string;
  stack: string[];
  isValidSoFar: boolean;
}

const isOpen = (c: string) => c === '(' || c === '[' || c === '{';
const matches = (open: string, close: string) =>
  (open === '(' && close === ')') ||
  (open === '[' && close === ']') ||
  (open === '{' && close === '}');

export const buildVPSteps = (s: string): VPStep[] => {
  const steps: VPStep[] = [];
  const stack: string[] = [];
  let valid = true;

  [...s].forEach((char, idx) => {
    let action = '';
    if (isOpen(char)) {
      stack.push(char);
      action = `push '${char}' ke stack`;
    } else {
      const top = stack[stack.length - 1];
      if (top && matches(top, char)) {
        stack.pop();
        action = `pop '${top}' karena cocok dengan '${char}'`;
      } else {
        valid = false;
        action = `mismatch: '${char}' tidak cocok dengan top '${top ?? 'kosong'}'`;
      }
    }

    steps.push({
      index: idx,
      char,
      action,
      stack: [...stack],
      isValidSoFar: valid,
    });
  });

  return steps;
};
