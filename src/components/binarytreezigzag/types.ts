export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

export function buildTree(values: (number | null)[]): TreeNode | null {
    if (values.length === 0 || values[0] === null) return null;

    const root = new TreeNode(values[0]!);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (i < values.length && queue.length > 0) {
        const node = queue.shift()!;

        if (i < values.length && values[i] !== null) {
            node.left = new TreeNode(values[i]!);
            queue.push(node.left);
        }
        i++;

        if (i < values.length && values[i] !== null) {
            node.right = new TreeNode(values[i]!);
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

export interface ZigzagStep {
    step: number;
    current: number | null;
    queue: (number | null)[];
    levels: number[][];
    action: string;
}

export function zigzagLevelOrderWithSteps(root: TreeNode | null): { levels: number[][], steps: ZigzagStep[] } {
    if (!root) return { levels: [], steps: [] };

    const levels: number[][] = [];
    const steps: ZigzagStep[] = [];
    const queue: TreeNode[] = [root];
    let isRightToLeft = false;
    let stepCount = 1;

    // Initial state
    steps.push({
        step: stepCount++,
        current: null,
        queue: queue.map(n => n.val),
        levels: [],
        action: 'Mulai traversal. Root masuk queue.'
    });

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];

        // Snapshot before processing level
        steps.push({
            step: stepCount++,
            current: null,
            queue: queue.map(n => n.val),
            levels: levels.map(l => [...l]),
            action: `Mulai level baru. Arah: ${isRightToLeft ? 'Kanan ke Kiri (←)' : 'Kiri ke Kanan (→)'}`
        });

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            if (isRightToLeft) {
                currentLevel.unshift(node.val);
            } else {
                currentLevel.push(node.val);
            }

            const actionMsg = isRightToLeft
                ? `Pop ${node.val}. Push ke DEPAN array level karena arah Kanan←Kiri.`
                : `Pop ${node.val}. Push ke BELAKANG array level karena arah Kiri→Kanan.`;

            steps.push({
                step: stepCount++,
                current: node.val,
                queue: queue.map(n => n.val),
                levels: [...levels.map(l => [...l]), [...currentLevel]],
                action: actionMsg
            });

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }

            // After enqueueing children
            if (node.left || node.right) {
                steps.push({
                    step: stepCount++,
                    current: node.val,
                    queue: queue.map(n => n.val),
                    levels: [...levels.map(l => [...l]), [...currentLevel]],
                    action: `Masukkan children dari ${node.val} ke queue.`
                });
            }
        }

        levels.push(currentLevel);

        steps.push({
            step: stepCount++,
            current: null,
            queue: queue.map(n => n.val),
            levels: levels.map(l => [...l]),
            action: `Level selesai. Balik arah traversal.`
        });

        isRightToLeft = !isRightToLeft;
    }

    return { levels, steps };
}
