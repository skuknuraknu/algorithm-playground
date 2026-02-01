export type MinStackOpType = 'push' | 'pop' | 'top' | 'getMin';

export interface MinStackOp {
  id: string;
  type: MinStackOpType;
  value?: number;
}

export interface MinStackStep {
  index: number;
  op: MinStackOp;
  stack: number[];
  minStack: number[];
  output?: number | null;
  action: string;
}

export const buildMinStackSteps = (ops: MinStackOp[]): MinStackStep[] => {
  const steps: MinStackStep[] = [];
  const stack: number[] = [];
  const minStack: number[] = [];

  ops.forEach((op, index) => {
    let output: number | null | undefined = undefined;
    let action = '';

    if (op.type === 'push') {
      const value = op.value ?? 0;
      stack.push(value);
      if (minStack.length === 0 || value <= minStack[minStack.length - 1]) {
        minStack.push(value);
      }
      action = `push(${value}) → stack=[${stack.join(', ')}], min=[${minStack.join(', ')}]`;
    }

    if (op.type === 'pop') {
      if (stack.length > 0) {
        const popped = stack.pop()!;
        if (minStack[minStack.length - 1] === popped) {
          minStack.pop();
        }
        action = `pop() → remove ${popped}`;
      } else {
        action = 'pop() diabaikan karena stack kosong';
      }
    }

    if (op.type === 'top') {
      output = stack.length ? stack[stack.length - 1] : null;
      action = `top() → ${output ?? 'null'}`;
    }

    if (op.type === 'getMin') {
      output = minStack.length ? minStack[minStack.length - 1] : null;
      action = `getMin() → ${output ?? 'null'}`;
    }

    steps.push({
      index,
      op,
      stack: [...stack],
      minStack: [...minStack],
      output,
      action,
    });
  });

  return steps;
};
