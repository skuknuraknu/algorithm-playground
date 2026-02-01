export type NullableNumber = number | null;

export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface LevelOrderStep {
  step: number;
  current: number | null;
  queue: (number | null)[];
  levels: number[][];
  action: string;
}

export const buildTree = (nodes: NullableNumber[]): TreeNode | null => {
  if (!nodes.length || nodes[0] === null || nodes[0] === undefined) return null;
  const root: TreeNode = { val: nodes[0]!, left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < nodes.length) {
    const node = queue.shift()!;
    if (i < nodes.length && nodes[i] !== null && nodes[i] !== undefined) {
      node.left = { val: nodes[i]!, left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < nodes.length && nodes[i] !== null && nodes[i] !== undefined) {
      node.right = { val: nodes[i]!, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  return root;
};

export const levelOrderWithSteps = (root: TreeNode | null): { levels: number[][]; steps: LevelOrderStep[] } => {
  const levels: number[][] = [];
  const steps: LevelOrderStep[] = [];
  if (!root) return { levels, steps };

  const queue: TreeNode[] = [root];
  let step = 1;

  while (queue.length) {
    const size = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      steps.push({
        step: step++,
        current: node.val,
        queue: queue.map((q) => q.val),
        levels: [...levels.map((lvl) => [...lvl]), [...currentLevel]],
        action: `Visit ${node.val}, enqueue children jika ada`,
      });

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    levels.push(currentLevel);
    steps.push({
      step: step++,
      current: null,
      queue: queue.map((q) => q.val),
      levels: levels.map((lvl) => [...lvl]),
      action: 'Selesaikan level & mulai level berikutnya',
    });
  }

  return { levels, steps };
};
