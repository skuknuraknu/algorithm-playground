export type ProblemId =
  | 'container-water'
  | 'mountain-array'
  | 'boats-people'
  | 'move-zeroes'
  | 'longest-substring'
  | 'find-position'
  | 'first-bad-version'
  | 'missing-number'
  | 'count-primes'
  | 'single-number'
  | 'robot-return'
  | 'add-binary'
  | 'two-sum'
  | 'contains-duplicate'
  | 'majority-element'
  | 'four-sum-ii'
  | 'min-window-substring'
  | 'group-anagrams'
  | 'lru-cache'
  | 'min-stack'
  | 'merge-two-lists'
  | 'linked-list-cycle'
  | 'reverse-linked-list'
  | 'add-two-numbers'
  | 'remove-nth-node'
  | 'odd-even-linked-list'
  | 'climbing-stairs'
  | 'coin-change'
  | 'best-time-stock'
  | 'house-robber'
  | 'subsets'
  | 'letter-combinations'
  | 'combination-sum'
  | 'palindrome-partition'
  | 'symmetric-tree'
  | 'binary-tree-level-order'
  | 'max-depth-tree'
  | 'path-sum'
  | 'kth-smallest-bst'
  | 'serialize-binary-tree'
  | 'serialize-binary-tree'
  | 'max-path-sum'
  | 'serialize-binary-tree'
  | 'max-path-sum'
  | 'binary-tree-zigzag-level-order'
  | 'unique-paths'
  | 'trapping-rain-water';

export interface Problem {
  id: ProblemId;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  description: string;
}

export const PROBLEMS: Record<ProblemId, Problem> = {
  'container-water': {
    id: 'container-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    topics: ['Array', 'Two Pointers', 'Greedy'],
    description: 'Find two lines that form a container with the most water',
  },
  'mountain-array': {
    id: 'mountain-array',
    title: 'Valid Mountain Array',
    difficulty: 'Easy',
    topics: ['Array', 'Traversal'],
    description: 'Check if an array forms a valid mountain shape',
  },
  'boats-people': {
    id: 'boats-people',
    title: 'Boats to Save People',
    difficulty: 'Medium',
    topics: ['Array', 'Two Pointers', 'Greedy', 'Sorting'],
    description: 'Find minimum boats needed to rescue all people',
  },
  'move-zeroes': {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    topics: ['Array', 'Two Pointers'],
    description: 'Move all zeros to the end while maintaining relative order',
  },
  'longest-substring': {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['String', 'Sliding Window', 'Hash Table'],
    description: 'Find the length of the longest substring without repeating characters',
  },
  'find-position': {
    id: 'find-position',
    title: 'Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    topics: ['Array', 'Binary Search'],
    description: 'Find starting and ending position of a target value in sorted array',
  },
  'first-bad-version': {
    id: 'first-bad-version',
    title: 'First Bad Version',
    difficulty: 'Easy',
    topics: ['Binary Search', 'Interactive'],
    description: 'Find the first bad version using minimum API calls',
  },
  'missing-number': {
    id: 'missing-number',
    title: 'Missing Number',
    difficulty: 'Easy',
    topics: ['Array', 'Math', 'Bit Manipulation'],
    description: 'Find the missing number in an array containing n distinct numbers',
  },
  'count-primes': {
    id: 'count-primes',
    title: 'Count Primes',
    difficulty: 'Medium',
    topics: ['Array', 'Math', 'Sieve of Eratosthenes'],
    description: 'Count the number of prime numbers less than a non-negative number n',
  },
  'single-number': {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    topics: ['Array', 'Bit Manipulation'],
    description: 'Find the element that appears exactly once while others appear twice',
  },
  'robot-return': {
    id: 'robot-return',
    title: 'Robot Return to Origin',
    difficulty: 'Easy',
    topics: ['String', 'Simulation'],
    description: 'Determine if a robot ends at origin after a sequence of moves',
  },
  'add-binary': {
    id: 'add-binary',
    title: 'Add Binary',
    difficulty: 'Easy',
    topics: ['String', 'Math', 'Simulation'],
    description: 'Add two binary strings and return their sum as binary',
  },
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Map'],
    description: 'Find indices of two numbers that add up to a target',
  },
  'contains-duplicate': {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Set'],
    description: 'Determine if any value appears at least twice in the array',
  },
  'majority-element': {
    id: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    topics: ['Array', 'Boyer-Moore', 'Voting'],
    description: 'Find the element that appears more than n/2 times',
  },
  'four-sum-ii': {
    id: 'four-sum-ii',
    title: '4Sum II',
    difficulty: 'Medium',
    topics: ['Array', 'Hash Map', 'Counting'],
    description: 'Count tuples (i, j, k, l) such that A[i] + B[j] + C[k] + D[l] = 0',
  },
  'min-window-substring': {
    id: 'min-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    topics: ['String', 'Sliding Window', 'Hash Map'],
    description: 'Find the smallest substring of s that contains all characters of t',
  },
  'group-anagrams': {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topics: ['Array', 'Hash Map', 'String'],
    description: 'Group strings that are anagrams of each other',
  },
  'lru-cache': {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    topics: ['Hash Table', 'Linked List', 'Design', 'Doubly Linked List'],
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache',
  },
  'min-stack': {
    id: 'min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    topics: ['Stack', 'Design', 'Data Structure'],
    description: 'Rancang stack yang dapat mengembalikan nilai minimum dalam O(1) untuk setiap operasi',
  },
  'merge-two-lists': {
    id: 'merge-two-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topics: ['Linked List', 'Recursion'],
    description: 'Merge two sorted linked lists and return it as a sorted list',
  },
  'linked-list-cycle': {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    topics: ['Linked List', 'Two Pointers'],
    description: 'Determine if a linked list has a cycle in it',
  },
  'reverse-linked-list': {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topics: ['Linked List', 'Two Pointers', 'Iteration'],
    description: 'Balik urutan node pada singly linked list secara in-place',
  },
  'add-two-numbers': {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    topics: ['Linked List', 'Math', 'Carry'],
    description: 'Tambahkan dua angka yang disimpan dalam linked list (digit terbalik)',
  },
  'remove-nth-node': {
    id: 'remove-nth-node',
    title: 'Remove Nth Node From End',
    difficulty: 'Medium',
    topics: ['Linked List', 'Two Pointers', 'Dummy Node'],
    description: 'Hapus node ke-n dari belakang dengan dua pointer satu-pass',
  },
  'odd-even-linked-list': {
    id: 'odd-even-linked-list',
    title: 'Odd Even Linked List',
    difficulty: 'Medium',
    topics: ['Linked List', 'Two Pointers'],
    description: 'Group all odd-indexed nodes together followed by even-indexed nodes',
  },
  'climbing-stairs': {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topics: ['Dynamic Programming', 'Math'],
    description: 'Hitung banyak cara mencapai puncak tangga dengan 1 atau 2 langkah tiap kali',
  },
  'coin-change': {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    topics: ['Dynamic Programming', 'Unbounded Knapsack'],
    description: 'Temukan minimum koin untuk membentuk jumlah target atau laporkan tidak mungkin',
  },
  'best-time-stock': {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topics: ['Array', 'Greedy', 'Sliding Window'],
    description: 'Temukan profit maksimum dengan satu kali transaksi beli-jual',
  },
  'house-robber': {
    id: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    topics: ['Dynamic Programming', 'Array'],
    description: 'Maksimalkan uang yang dicuri tanpa merampok dua rumah bersebelahan',
  },
  'subsets': {
    id: 'subsets',
    title: 'Subsets',
    difficulty: 'Medium',
    topics: ['Array', 'Backtracking', 'Bit Manipulation'],
    description: 'Return all possible subsets (the power set)',
  },
  'letter-combinations': {
    id: 'letter-combinations',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    topics: ['String', 'Backtracking', 'Recursion'],
    description: 'Dapatkan semua kombinasi huruf dari digit telepon',
  },
  'combination-sum': {
    id: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'Medium',
    topics: ['Array', 'Backtracking', 'Recursion'],
    description: 'Temukan kombinasi angka yang jumlahnya sama dengan target',
  },
  'palindrome-partition': {
    id: 'palindrome-partition',
    title: 'Palindrome Partitioning',
    difficulty: 'Medium',
    topics: ['String', 'Backtracking', 'Dynamic Programming'],
    description: 'Partisi string menjadi substring palindrome',
  },
  'symmetric-tree': {
    id: 'symmetric-tree',
    title: 'Symmetric Tree',
    difficulty: 'Easy',
    topics: ['Binary Tree', 'Recursion', 'Tree Traversal'],
    description: 'Cek apakah binary tree symmetric terhadap pusatnya',
  },
  'binary-tree-level-order': {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topics: ['Binary Tree', 'BFS', 'Queue'],
    description: 'Kembalikan daftar node per level menggunakan BFS (level-order traversal)',
  },
  'max-depth-tree': {
    id: 'max-depth-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    topics: ['Binary Tree', 'Recursion', 'DFS', 'BFS'],
    description: 'Temukan kedalaman maksimum binary tree',
  },
  'path-sum': {
    id: 'path-sum',
    title: 'Path Sum',
    difficulty: 'Easy',
    topics: ['Binary Tree', 'DFS', 'Backtracking'],
    description: 'Periksa apakah ada path root-to-leaf yang totalnya sama dengan target',
  },
  'kth-smallest-bst': {
    id: 'kth-smallest-bst',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    topics: ['Binary Search Tree', 'Inorder Traversal', 'DFS', 'Stack'],
    description: 'Temukan elemen terkecil ke-k di BST menggunakan inorder traversal',
  },
  'serialize-binary-tree': {
    id: 'serialize-binary-tree',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    topics: ['Binary Tree', 'BFS', 'DFS', 'Design'],
    description: 'Rancang fungsi untuk mengubah binary tree menjadi string dan mengembalikannya lagi',
  },
  'max-path-sum': {
    id: 'max-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    topics: ['Binary Tree', 'DFS', 'Divide and Conquer', 'Dynamic Programming'],
    description: 'Cari path dengan jumlah nilai maksimum pada binary tree (path boleh mulai/berakhir di node mana saja).',
  },
  'binary-tree-zigzag-level-order': {
    id: 'binary-tree-zigzag-level-order',
    title: 'Binary Tree Zigzag Level Order Traversal',
    difficulty: 'Medium',
    topics: ['Binary Tree', 'BFS', 'Stack', 'Queue'],
    description: 'Traverse tree secara zigzag: kiri-ke-kanan, lalu kanan-ke-kiri untuk level berikutnya.',
  },
  'unique-paths': {
    id: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'Medium',
    topics: ['Dynamic Programming', 'Combinatorics'],
    description: 'Hitung jumlah cara berbeda robot mencapai tujuan di grid m x n (hanya boleh turun/kanan).',
  },
  'trapping-rain-water': {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topics: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
    description: 'Hitung berapa banyak air hujan yang bisa tertampung di antara gedung-gedung.',
  },

};
