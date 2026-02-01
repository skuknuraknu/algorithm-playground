export const starterCode = `/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    // Tulis kodemu di sini
    // Clue: Pake queue, terus cek index levelnya genap/ganjil
    
    return [];
};
`;

export default function BinaryTreeZigzagCodeEditor() {
    return null; // This component handles the config internally usually, or is just a placeholder here if the main CodeEditor uses the string export.
}
