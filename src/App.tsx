import { useState, useRef, useEffect } from 'react';
import { Droplet, BookOpen, Play, Code2, Lightbulb, Mountain, Anchor, Menu, MoveRight, Type, Search, Bug, Hash, Calculator, Cpu, Bot, PlusCircle, Plus, Copy, Crown, Layers, ScanEye, Braces, Repeat, GitMerge, RefreshCw, RotateCw, Scissors, Shuffle, Grid, Phone, Target, Binary } from 'lucide-react';
import { ProblemId, PROBLEMS } from './types/Problem';
import { useLanguage } from './i18n';
import LanguageSwitcher from './components/LanguageSwitcher';

import InputPanel from './components/InputPanel';
import ContainerVisualizer from './components/ContainerVisualizer';
import AlgorithmSimulator from './components/AlgorithmSimulator';
import CodeEditor from './components/CodeEditor';
import ProblemExplanation from './components/ProblemExplanation';

import MountainInputPanel from './components/mountain/MountainInputPanel';
import MountainVisualizer from './components/mountain/MountainVisualizer';
import MountainSimulator from './components/mountain/MountainSimulator';
import MountainCodeEditor from './components/mountain/MountainCodeEditor';
import MountainExplanation from './components/mountain/MountainExplanation';

import BoatsInputPanel from './components/boats/BoatsInputPanel';
import BoatsVisualizer from './components/boats/BoatsVisualizer';
import BoatsSimulator from './components/boats/BoatsSimulator';
import BoatsCodeEditor from './components/boats/BoatsCodeEditor';
import BoatsExplanation from './components/boats/BoatsExplanation';

import MoveZeroesInputPanel from './components/movezeroes/MoveZeroesInputPanel';
import MoveZeroesVisualizer from './components/movezeroes/MoveZeroesVisualizer';
import MoveZeroesSimulator from './components/movezeroes/MoveZeroesSimulator';
import MoveZeroesCodeEditor from './components/movezeroes/MoveZeroesCodeEditor';
import MoveZeroesExplanation from './components/movezeroes/MoveZeroesExplanation';

import LongestSubstringInputPanel from './components/longestsubstring/LongestSubstringInputPanel';
import LongestSubstringVisualizer from './components/longestsubstring/LongestSubstringVisualizer';
import LongestSubstringSimulator from './components/longestsubstring/LongestSubstringSimulator';
import LongestSubstringCodeEditor from './components/longestsubstring/LongestSubstringCodeEditor';
import LongestSubstringExplanation from './components/longestsubstring/LongestSubstringCodeEditor';

import FindPositionInputPanel from './components/findposition/FindPositionInputPanel';
import FindPositionVisualizer from './components/findposition/FindPositionVisualizer';
import FindPositionSimulator from './components/findposition/FindPositionSimulator';
import FindPositionCodeEditor from './components/findposition/FindPositionCodeEditor';
import FindPositionExplanation from './components/findposition/FindPositionExplanation';

import FirstBadVersionInputPanel from './components/firstbadversion/FirstBadVersionInputPanel';
import FirstBadVersionVisualizer from './components/firstbadversion/FirstBadVersionVisualizer';
import FirstBadVersionSimulator from './components/firstbadversion/FirstBadVersionSimulator';
import FirstBadVersionCodeEditor from './components/firstbadversion/FirstBadVersionCodeEditor';
import FirstBadVersionExplanation from './components/firstbadversion/FirstBadVersionExplanation';

import MissingNumberInputPanel from './components/missingnumber/MissingNumberInputPanel';
import MissingNumberVisualizer from './components/missingnumber/MissingNumberVisualizer';
import MissingNumberSimulator from './components/missingnumber/MissingNumberSimulator';
import MissingNumberCodeEditor from './components/missingnumber/MissingNumberCodeEditor';
import MissingNumberExplanation from './components/missingnumber/MissingNumberExplanation';

import CountPrimesInputPanel from './components/countprimes/CountPrimesInputPanel';
import CountPrimesVisualizer from './components/countprimes/CountPrimesVisualizer';
import CountPrimesSimulator from './components/countprimes/CountPrimesSimulator';
import CountPrimesCodeEditor from './components/countprimes/CountPrimesCodeEditor';
import CountPrimesExplanation from './components/countprimes/CountPrimesExplanation';
import SingleNumberInputPanel from './components/singlenumber/SingleNumberInputPanel';
import SingleNumberVisualizer from './components/singlenumber/SingleNumberVisualizer';
import SingleNumberSimulator from './components/singlenumber/SingleNumberSimulator';
import SingleNumberCodeEditor from './components/singlenumber/SingleNumberCodeEditor';
import SingleNumberExplanation from './components/singlenumber/SingleNumberExplanation';
import RobotReturnInputPanel from './components/robotreturn/RobotReturnInputPanel';
import RobotReturnVisualizer from './components/robotreturn/RobotReturnVisualizer';
import RobotReturnSimulator from './components/robotreturn/RobotReturnSimulator';
import RobotReturnCodeEditor from './components/robotreturn/RobotReturnCodeEditor';
import RobotReturnExplanation from './components/robotreturn/RobotReturnExplanation';
import AddBinaryInputPanel from './components/addbinary/AddBinaryInputPanel';
import AddBinaryVisualizer from './components/addbinary/AddBinaryVisualizer';
import AddBinarySimulator from './components/addbinary/AddBinarySimulator';
import AddBinaryCodeEditor from './components/addbinary/AddBinaryCodeEditor';
import AddBinaryExplanation from './components/addbinary/AddBinaryExplanation';
import TwoSumInputPanel from './components/twosum/TwoSumInputPanel';
import TwoSumVisualizer from './components/twosum/TwoSumVisualizer';
import TwoSumSimulator from './components/twosum/TwoSumSimulator';
import TwoSumCodeEditor from './components/twosum/TwoSumCodeEditor';
import TwoSumExplanation from './components/twosum/TwoSumExplanation';
import ContainsDuplicateInputPanel from './components/containsduplicate/ContainsDuplicateInputPanel';
import ContainsDuplicateVisualizer from './components/containsduplicate/ContainsDuplicateVisualizer';
import ContainsDuplicateSimulator from './components/containsduplicate/ContainsDuplicateSimulator';
import ContainsDuplicateCodeEditor from './components/containsduplicate/ContainsDuplicateCodeEditor';
import ContainsDuplicateExplanation from './components/containsduplicate/ContainsDuplicateExplanation';
import MajorityElementInputPanel from './components/majorityelement/MajorityElementInputPanel';
import MajorityElementVisualizer from './components/majorityelement/MajorityElementVisualizer';
import MajorityElementSimulator from './components/majorityelement/MajorityElementSimulator';
import MajorityElementCodeEditor from './components/majorityelement/MajorityElementCodeEditor';
import MajorityElementExplanation from './components/majorityelement/MajorityElementExplanation';

import FourSumTwoInputPanel from './components/foursumtwo/FourSumTwoInputPanel';
import FourSumTwoVisualizer from './components/foursumtwo/FourSumTwoVisualizer';
import FourSumTwoSimulator from './components/foursumtwo/FourSumTwoSimulator';
import FourSumTwoCodeEditor from './components/foursumtwo/FourSumTwoCodeEditor';
import FourSumTwoExplanation from './components/foursumtwo/FourSumTwoExplanation';

import MinWindowInputPanel from './components/minwindow/MinWindowInputPanel';
import MinWindowVisualizer from './components/minwindow/MinWindowVisualizer';
import MinWindowSimulator from './components/minwindow/MinWindowSimulator';
import MinWindowCodeEditor from './components/minwindow/MinWindowCodeEditor';
import MinWindowExplanation from './components/minwindow/MinWindowExplanation';

import GroupAnagramsInputPanel from './components/groupanagrams/GroupAnagramsInputPanel';
import GroupAnagramsVisualizer from './components/groupanagrams/GroupAnagramsVisualizer';
import GroupAnagramsSimulator from './components/groupanagrams/GroupAnagramsSimulator';
import GroupAnagramsCodeEditor from './components/groupanagrams/GroupAnagramsCodeEditor';
import GroupAnagramsExplanation from './components/groupanagrams/GroupAnagramsExplanation';

import LRUCacheInputPanel from './components/lrucache/LRUCacheInputPanel';
import LRUCacheVisualizer from './components/lrucache/LRUCacheVisualizer';
import LRUCacheSimulator from './components/lrucache/LRUCacheSimulator';
import LRUCacheCodeEditor from './components/lrucache/LRUCacheCodeEditor';
import LRUCacheExplanation from './components/lrucache/LRUCacheExplanation';

import MergeTwoListsExplanation from './components/mergetwolists/MergeTwoListsExplanation';
import MergeTwoListsInputPanel from './components/mergetwolists/MergeTwoListsInputPanel';
import MergeTwoListsVisualizer from './components/mergetwolists/MergeTwoListsVisualizer';
import MergeTwoListsSimulator from './components/mergetwolists/MergeTwoListsSimulator';
import MergeTwoListsCodeEditor from './components/mergetwolists/MergeTwoListsCodeEditor';

import LinkedListCycleExplanation from './components/linkedlistcycle/LinkedListCycleExplanation';
import LinkedListCycleInputPanel from './components/linkedlistcycle/LinkedListCycleInputPanel';
import LinkedListCycleVisualizer from './components/linkedlistcycle/LinkedListCycleVisualizer';
import LinkedListCycleSimulator from './components/linkedlistcycle/LinkedListCycleSimulator';
import LinkedListCycleCodeEditor from './components/linkedlistcycle/LinkedListCycleCodeEditor';

import ReverseLinkedListExplanation from './components/reverselinkedlist/ReverseLinkedListExplanation';
import ReverseLinkedListInputPanel from './components/reverselinkedlist/ReverseLinkedListInputPanel';
import ReverseLinkedListVisualizer from './components/reverselinkedlist/ReverseLinkedListVisualizer';
import ReverseLinkedListSimulator from './components/reverselinkedlist/ReverseLinkedListSimulator';
import ReverseLinkedListCodeEditor from './components/reverselinkedlist/ReverseLinkedListCodeEditor';

import AddTwoNumbersExplanation from './components/addtwonumbers/AddTwoNumbersExplanation';
import AddTwoNumbersInputPanel from './components/addtwonumbers/AddTwoNumbersInputPanel';
import AddTwoNumbersVisualizer from './components/addtwonumbers/AddTwoNumbersVisualizer';
import AddTwoNumbersSimulator from './components/addtwonumbers/AddTwoNumbersSimulator';
import AddTwoNumbersCodeEditor from './components/addtwonumbers/AddTwoNumbersCodeEditor';

import RemoveNthExplanation from './components/removenth/RemoveNthExplanation';
import RemoveNthInputPanel from './components/removenth/RemoveNthInputPanel';
import RemoveNthVisualizer from './components/removenth/RemoveNthVisualizer';
import RemoveNthSimulator from './components/removenth/RemoveNthSimulator';
import RemoveNthCodeEditor from './components/removenth/RemoveNthCodeEditor';

import OddEvenExplanation from './components/oddeven/OddEvenExplanation';
import OddEvenInputPanel from './components/oddeven/OddEvenInputPanel';
import OddEvenVisualizer from './components/oddeven/OddEvenVisualizer';
import OddEvenSimulator from './components/oddeven/OddEvenSimulator';
import OddEvenCodeEditor from './components/oddeven/OddEvenCodeEditor';

import SubsetsExplanation from './components/subsets/SubsetsExplanation';
import SubsetsInputPanel from './components/subsets/SubsetsInputPanel';
import SubsetsVisualizer from './components/subsets/SubsetsVisualizer';
import SubsetsSimulator from './components/subsets/SubsetsSimulator';
import SubsetsCodeEditor from './components/subsets/SubsetsCodeEditor';

import LetterCombinationsExplanation from './components/lettercombinations/LetterCombinationsExplanation';
import LetterCombinationsInputPanel from './components/lettercombinations/LetterCombinationsInputPanel';
import LetterCombinationsVisualizer from './components/lettercombinations/LetterCombinationsVisualizer';
import LetterCombinationsSimulator from './components/lettercombinations/LetterCombinationsSimulator';
import LetterCombinationsCodeEditor from './components/lettercombinations/LetterCombinationsCodeEditor';

import CombinationSumExplanation from './components/combinationsum/CombinationSumExplanation';
import CombinationSumInputPanel from './components/combinationsum/CombinationSumInputPanel';
import CombinationSumVisualizer from './components/combinationsum/CombinationSumVisualizer';
import CombinationSumSimulator from './components/combinationsum/CombinationSumSimulator';
import CombinationSumCodeEditor from './components/combinationsum/CombinationSumCodeEditor';

import PalindromePartitionExplanation from './components/palindromepartition/PalindromePartitionExplanation';
import PalindromePartitionInputPanel from './components/palindromepartition/PalindromePartitionInputPanel';
import PalindromePartitionVisualizer from './components/palindromepartition/PalindromePartitionVisualizer';
import PalindromePartitionSimulator from './components/palindromepartition/PalindromePartitionSimulator';
import PalindromePartitionCodeEditor from './components/palindromepartition/PalindromePartitionCodeEditor';

import SymmetricTreeExplanation from './components/symmetrictree/SymmetricTreeExplanation';
import SymmetricTreeInputPanel from './components/symmetrictree/SymmetricTreeInputPanel';
import SymmetricTreeVisualizer from './components/symmetrictree/SymmetricTreeVisualizer';
import SymmetricTreeSimulator from './components/symmetrictree/SymmetricTreeSimulator';
import SymmetricTreeCodeEditor from './components/symmetrictree/SymmetricTreeCodeEditor';

type Tab = 'visualize' | 'simulate' | 'code' | 'learn';

function App() {
  const { t } = useLanguage();
  const [activeProblem, setActiveProblem] = useState<ProblemId>('container-water');
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const [showProblemMenu, setShowProblemMenu] = useState(false);
  const [problemSearch, setProblemSearch] = useState('');
  const problemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [heights, setHeights] = useState([1, 8, 6, 2, 5, 4, 8, 3, 7]);
  const [mountainArr, setMountainArr] = useState([0, 3, 2, 1]);
  const [boatsPeople, setBoatsPeople] = useState([3, 2, 2, 1]);
  const [boatsLimit, setBoatsLimit] = useState(3);
  const [moveZeroesNums, setMoveZeroesNums] = useState([0, 1, 0, 3, 12]);
  const [longestSubstring, setLongestSubstring] = useState('abcabcbb');
  const [findPositionNums, setFindPositionNums] = useState([5, 7, 7, 8, 8, 10]);
  const [findPositionTarget, setFindPositionTarget] = useState(8);
  const [badVersionTotal, setBadVersionTotal] = useState(10);
  const [badVersionFirst, setBadVersionFirst] = useState(7);
  const [missingNumberNums, setMissingNumberNums] = useState([3, 0, 1]);
  const [countPrimesN, setCountPrimesN] = useState(10);
  const [singleNumberNums, setSingleNumberNums] = useState([4, 1, 2, 1, 2]);
  const [robotMoves, setRobotMoves] = useState('UDLR');
  const [addBinaryA, setAddBinaryA] = useState('1010');
  const [addBinaryB, setAddBinaryB] = useState('1011');
  const [twoSumNums, setTwoSumNums] = useState([2, 7, 11, 15]);
  const [twoSumTarget, setTwoSumTarget] = useState(9);
  const [containsDuplicateNums, setContainsDuplicateNums] = useState([1, 2, 3, 1]);
  const [majorityNums, setMajorityNums] = useState([2, 2, 1, 1, 1, 2, 2]);
  
  // New States
  const [fourSumA, setFourSumA] = useState([1, 2]);
  const [fourSumB, setFourSumB] = useState([-2, -1]);
  const [fourSumC, setFourSumC] = useState([-1, 2]);
  const [fourSumD, setFourSumD] = useState([0, 2]);
  const [minWindowS, setMinWindowS] = useState('ADOBECODEBANC');
  const [minWindowT, setMinWindowT] = useState('ABC');
  const [groupAnagramsStrs, setGroupAnagramsStrs] = useState(["eat", "tea", "tan", "ate", "nat", "bat"]);
  const [reverseList, setReverseList] = useState([1, 2, 3, 4, 5]);
  const [addTwoL1, setAddTwoL1] = useState([2, 4, 3]);
  const [addTwoL2, setAddTwoL2] = useState([5, 6, 4]);
  const [removeNthList, setRemoveNthList] = useState([1, 2, 3, 4, 5]);
  const [removeNthN, setRemoveNthN] = useState(2);
  const [oddEvenList, setOddEvenList] = useState([1, 2, 3, 4, 5, 6]);
  const [subsetsNums, setSubsetsNums] = useState([1, 2, 3]);
  const [letterCombinationsDigits, setLetterCombinationsDigits] = useState('23');
  const [combinationSumCandidates, setCombinationSumCandidates] = useState([2, 3, 6, 7]);
  const [combinationSumTarget, setCombinationSumTarget] = useState(7);
  const [palindromePartitionString, setPalindromePartitionString] = useState('aab');
  const [symmetricTreeNodes, setSymmetricTreeNodes] = useState<(number | null)[]>([1, 2, 2, 3, 4, 4, 3]);
  
  // LRU Cache State
  const [lruCapacity, setLruCapacity] = useState(3);
  const [lruOperations, setLruOperations] = useState<{ type: 'put' | 'get'; key: number; value?: number }[]>([]);
  const [lruCacheState, setLruCacheState] = useState<{ key: number; value: number; timestamp: number }[]>([]);
  const [lruLastOp, setLruLastOp] = useState<{ type: 'put' | 'get'; key: number; value?: number; result?: number | null } | undefined>(undefined);

  // Merge Two Lists State
  const [mergeTwoListsState, setMergeTwoListsState] = useState({
    list1: [1, 2, 4],
    list2: [1, 3, 4]
  });

  // Linked List Cycle State
  const [linkedListCycleState, setLinkedListCycleState] = useState({
    list: [3, 2, 0, -4],
    pos: 1
  });

  const handleLruOperation = (op: { type: 'put' | 'get'; key: number; value?: number }) => {
    const newCache = [...lruCacheState];
    let result: number | null = null;

    if (op.type === 'get') {
      const idx = newCache.findIndex(item => item.key === op.key);
      if (idx !== -1) {
        const item = newCache[idx];
        newCache.splice(idx, 1);
        newCache.push({ ...item, timestamp: Date.now() }); // Move to MRU
        result = item.value;
      } else {
        result = -1;
      }
    } else if (op.type === 'put') {
      const idx = newCache.findIndex(item => item.key === op.key);
      if (idx !== -1) {
        newCache.splice(idx, 1);
      } else if (newCache.length >= lruCapacity) {
        newCache.shift(); // Remove LRU
      }
      newCache.push({ key: op.key, value: op.value!, timestamp: Date.now() });
    }

    setLruCacheState(newCache);
    setLruLastOp({ ...op, result });
  };

  const handleLruReset = () => {
    setLruCacheState([]);
    setLruOperations([]);
    setLruLastOp(undefined);
  };

  const filteredProblems = Object.values(PROBLEMS).filter((problem) => {
    if (!problemSearch.trim()) return true;
    const q = problemSearch.toLowerCase();
    return (
      problem.title.toLowerCase().includes(q) ||
      problem.description.toLowerCase().includes(q) ||
      problem.topics.some((topic) => topic.toLowerCase().includes(q))
    );
  });

  const tabs = [
    { id: 'learn' as Tab, name: t.learn, icon: BookOpen, color: 'blue' },
    { id: 'visualize' as Tab, name: t.visualize, icon: Droplet, color: 'cyan' },
    { id: 'simulate' as Tab, name: t.simulate, icon: Play, color: 'green' },
    { id: 'code' as Tab, name: t.practice, icon: Code2, color: 'orange' },
  ];

  const currentProblem = PROBLEMS[activeProblem];

  const problemIcons = {
    'container-water': Droplet,
    'mountain-array': Mountain,
    'boats-people': Anchor,
    'move-zeroes': MoveRight,
    'longest-substring': Type,
    'find-position': Search,
    'first-bad-version': Bug,
    'missing-number': Hash,
    'count-primes': Calculator,
    'single-number': Cpu,
    'robot-return': Bot,
    'add-binary': PlusCircle,
    'two-sum': Plus,
    'contains-duplicate': Copy,
    'majority-element': Crown,
    'four-sum-ii': Layers,
    'min-window-substring': ScanEye,
    'group-anagrams': Braces,
    'lru-cache': Repeat,
    'merge-two-lists': GitMerge,
    'linked-list-cycle': RefreshCw,
    'reverse-linked-list': RotateCw,
    'add-two-numbers': Plus,
    'remove-nth-node': Scissors,
    'odd-even-linked-list': Shuffle,
    'subsets': Grid,
    'letter-combinations': Phone,
    'combination-sum': Target,
    'palindrome-partition': Scissors,
    'symmetric-tree': Binary,
  };

  const ProblemIcon = problemIcons[activeProblem];

  const handleProblemChange = (problemId: ProblemId) => {
    setActiveProblem(problemId);
    setActiveTab('learn');
    setShowProblemMenu(false);
  };

  // Auto-scroll to active problem when menu opens
  useEffect(() => {
    if (showProblemMenu && problemRefs.current[activeProblem]) {
      setTimeout(() => {
        problemRefs.current[activeProblem]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [showProblemMenu, activeProblem]);

  const calculateOptimalArea = () => {
    let left = 0;
    let right = heights.length - 1;
    let maxArea = 0;

    while (left < right) {
      const currentArea = Math.min(heights[left], heights[right]) * (right - left);
      maxArea = Math.max(maxArea, currentArea);
      if (heights[left] < heights[right]) {
        left++;
      } else {
        right--;
      }
    }
    return maxArea;
  };

  const checkValidMountain = () => {
    if (mountainArr.length < 3) return false;
    let i = 0;
    while (i + 1 < mountainArr.length && mountainArr[i] < mountainArr[i + 1]) i++;
    if (i === 0 || i === mountainArr.length - 1) return false;
    while (i + 1 < mountainArr.length && mountainArr[i] > mountainArr[i + 1]) i++;
    return i === mountainArr.length - 1;
  };

  const calculateMinBoats = () => {
    const sorted = [...boatsPeople].sort((a, b) => a - b);
    let left = 0;
    let right = sorted.length - 1;
    let boats = 0;
    while (left <= right) {
      if (sorted[left] + sorted[right] <= boatsLimit) {
        left++;
      }
      right--;
      boats++;
    }
    return boats;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-xl shadow-lg">
                <ProblemIcon className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {currentProblem.title}
                </h1>
                <p className="text-slate-600 mt-1">
                  {t.platformSubtitle}
                </p>
              </div>
            </div>

            <div className="relative flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => setShowProblemMenu(!showProblemMenu)}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Menu size={20} />
                {t.switchProblem}
              </button>

              {showProblemMenu && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fadeIn"
                    onClick={() => setShowProblemMenu(false)}
                  />
                  
                  <div className="fixed right-6 top-24 w-[32rem] max-w-[92vw] bg-white rounded-2xl shadow-2xl border-2 border-slate-200 z-50 overflow-hidden animate-slideDown">
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b-2 border-slate-200 p-4 z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-md">
                          <Search size={20} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Pilih Problem
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          autoFocus
                          value={problemSearch}
                          onChange={(e) => setProblemSearch(e.target.value)}
                          placeholder={t.searchPlaceholder}
                          className="flex-1 text-sm px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                        />
                        {problemSearch && (
                          <button
                            onClick={() => setProblemSearch('')}
                            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                          >
                            {t.clear}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-3 max-h-[28rem] overflow-y-auto custom-scrollbar-purple">
                      {filteredProblems.length === 0 && (
                        <div className="text-center text-sm text-slate-500 py-8">
                          <div className="mb-2">🔍</div>
                          {t.noMatchingProblems}
                        </div>
                      )}
                      {filteredProblems.map((problem) => {
                        const Icon = problemIcons[problem.id];
                        const isActive = problem.id === activeProblem;
                        return (
                          <button
                            key={problem.id}
                            ref={(el) => (problemRefs.current[problem.id] = el)}
                            onClick={() => handleProblemChange(problem.id)}
                            className={`w-full flex items-start gap-4 p-4 mb-2 rounded-xl transition-all duration-300 text-left group ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.02] ring-4 ring-blue-100'
                                : 'bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.01]'
                            }`}
                          >
                            <div
                              className={`p-3 rounded-xl transition-all duration-300 ${
                                isActive 
                                  ? 'bg-white/20 shadow-lg' 
                                  : 'bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-purple-100'
                              }`}
                            >
                              <Icon
                                className={isActive ? 'text-white' : 'text-slate-700 group-hover:text-blue-600'}
                                size={24}
                              />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <div className={`font-bold text-base mb-1 ${isActive ? 'text-white' : 'text-slate-800 group-hover:text-blue-700'}`}>
                                {problem.title}
                              </div>
                              <div className={`text-xs mb-2 line-clamp-2 ${isActive ? 'text-white/90' : 'text-slate-600 group-hover:text-slate-700'}`}>
                                {problem.description}
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                    isActive
                                      ? 'bg-white/20 text-white'
                                      : problem.difficulty === 'Easy'
                                      ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                                      : problem.difficulty === 'Medium'
                                      ? 'bg-orange-100 text-orange-700 group-hover:bg-orange-200'
                                      : 'bg-red-100 text-red-700 group-hover:bg-red-200'
                                }`}
                              >
                                {problem.difficulty}
                              </span>
                              <span className={`text-xs truncate ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                                {problem.topics.join(', ')}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${
                    isActive
                      ? 'text-blue-700 bg-slate-50'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  {tab.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Input Panel - shown for all tabs except learn */}
        {activeTab !== 'learn' && activeProblem === 'container-water' && (
          <div className="mb-8">
            <InputPanel heights={heights} onHeightsChange={setHeights} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'mountain-array' && (
          <div className="mb-8">
            <MountainInputPanel arr={mountainArr} onArrChange={setMountainArr} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'boats-people' && (
          <div className="mb-8">
            <BoatsInputPanel
              people={boatsPeople}
              limit={boatsLimit}
              onPeopleChange={setBoatsPeople}
              onLimitChange={setBoatsLimit}
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'move-zeroes' && (
          <div className="mb-8">
            <MoveZeroesInputPanel nums={moveZeroesNums} onNumsChange={setMoveZeroesNums} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'longest-substring' && (
          <div className="mb-8">
            <LongestSubstringInputPanel str={longestSubstring} onStrChange={setLongestSubstring} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'find-position' && (
          <div className="mb-8">
            <FindPositionInputPanel
              nums={findPositionNums}
              target={findPositionTarget}
              onNumsChange={setFindPositionNums}
              onTargetChange={setFindPositionTarget}
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'first-bad-version' && (
          <div className="mb-8">
            <FirstBadVersionInputPanel
              totalVersions={badVersionTotal}
              firstBadVersion={badVersionFirst}
              onTotalVersionsChange={setBadVersionTotal}
              onFirstBadVersionChange={setBadVersionFirst}
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'missing-number' && (
          <div className="mb-8">
            <MissingNumberInputPanel
              nums={missingNumberNums}
              setNums={setMissingNumberNums}
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'count-primes' && (
          <div className="mb-8">
            <CountPrimesInputPanel
              n={countPrimesN}
              setN={setCountPrimesN}
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'single-number' && (
          <div className="mb-8">
            <SingleNumberInputPanel nums={singleNumberNums} setNums={setSingleNumberNums} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'robot-return' && (
          <div className="mb-8">
            <RobotReturnInputPanel moves={robotMoves} setMoves={setRobotMoves} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'add-binary' && (
          <div className="mb-8">
            <AddBinaryInputPanel a={addBinaryA} b={addBinaryB} setA={setAddBinaryA} setB={setAddBinaryB} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'two-sum' && (
          <div className="mb-8">
            <TwoSumInputPanel nums={twoSumNums} target={twoSumTarget} setNums={setTwoSumNums} setTarget={setTwoSumTarget} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'contains-duplicate' && (
          <div className="mb-8">
            <ContainsDuplicateInputPanel nums={containsDuplicateNums} setNums={setContainsDuplicateNums} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'majority-element' && (
          <div className="mb-8">
            <MajorityElementInputPanel nums={majorityNums} setNums={setMajorityNums} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'four-sum-ii' && (
          <div className="mb-8">
            <FourSumTwoInputPanel
              a={fourSumA}
              b={fourSumB}
              c={fourSumC}
              d={fourSumD}
              setA={setFourSumA}
              setB={setFourSumB}
              setC={setFourSumC}
              setD={setFourSumD}
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'min-window-substring' && (
          <div className="mb-8">
            <MinWindowInputPanel s={minWindowS} t={minWindowT} setS={setMinWindowS} setT={setMinWindowT} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'group-anagrams' && (
          <div className="mb-8">
            <GroupAnagramsInputPanel strs={groupAnagramsStrs} setStrs={setGroupAnagramsStrs} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'reverse-linked-list' && (
          <div className="mb-8">
            <ReverseLinkedListInputPanel list={reverseList} setList={setReverseList} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'add-two-numbers' && (
          <div className="mb-8">
            <AddTwoNumbersInputPanel l1={addTwoL1} l2={addTwoL2} setL1={setAddTwoL1} setL2={setAddTwoL2} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'remove-nth-node' && (
          <div className="mb-8">
            <RemoveNthInputPanel list={removeNthList} n={removeNthN} setList={setRemoveNthList} setN={setRemoveNthN} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'odd-even-linked-list' && (
          <div className="mb-8">
            <OddEvenInputPanel list={oddEvenList} setList={setOddEvenList} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'lru-cache' && (
          <div className="mb-8">
            <LRUCacheInputPanel
              capacity={lruCapacity}
              setCapacity={setLruCapacity}
              operations={lruOperations}
              setOperations={setLruOperations}
              onRunOperation={handleLruOperation}
              onReset={handleLruReset}
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'merge-two-lists' && (
          <div className="mb-8">
            <MergeTwoListsInputPanel 
              setList1={(l) => setMergeTwoListsState(prev => ({ ...prev, list1: l }))}
              setList2={(l) => setMergeTwoListsState(prev => ({ ...prev, list2: l }))}
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'linked-list-cycle' && (
          <div className="mb-8">
            <LinkedListCycleInputPanel setProblemState={setLinkedListCycleState} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'subsets' && (
          <div className="mb-8">
            <SubsetsInputPanel nums={subsetsNums} setNums={setSubsetsNums} />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'letter-combinations' && (
          <div className="mb-8">
            <LetterCombinationsInputPanel 
              digits={letterCombinationsDigits} 
              setDigits={setLetterCombinationsDigits} 
            />
          </div>
        )}
        {activeTab !== 'learn' && activeProblem === 'combination-sum' && (
          <div className="mb-8">
            <CombinationSumInputPanel 
              candidates={combinationSumCandidates}
              target={combinationSumTarget}
              setCandidates={setCombinationSumCandidates}
              setTarget={setCombinationSumTarget}
            />
          </div>
        )}

        {activeTab !== 'learn' && activeProblem === 'palindrome-partition' && (
          <div className="mb-8">
            <PalindromePartitionInputPanel 
              onStringChange={setPalindromePartitionString}
            />
          </div>
        )}

        {activeTab !== 'learn' && activeProblem === 'symmetric-tree' && (
          <div className="mb-8">
            <SymmetricTreeInputPanel 
              onNodesChange={setSymmetricTreeNodes}
            />
          </div>
        )}

        {/* Container With Most Water Content */}
        {activeProblem === 'container-water' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <ProblemExplanation />
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-blue-100">
                        Explore the other tabs to visualize, simulate, and code your solution!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    View the container with maximum water capacity. Optimal area:{' '}
                    <span className="font-bold text-green-600 text-xl">
                      {calculateOptimalArea()}
                    </span>
                  </p>
                  <ContainerVisualizer heights={heights} />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch how the two-pointer algorithm finds the maximum area step-by-step
                  </p>
                </div>
                <AlgorithmSimulator heights={heights} />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement the maxArea function and run the test cases.
                  </p>
                </div>
                <CodeEditor />
              </div>
            )}
          </>
        )}

        {/* Valid Mountain Array Content */}
        {activeProblem === 'mountain-array' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <MountainExplanation />
                <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-green-100">
                        Start visualizing mountain arrays and understand the validation algorithm!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Check if the array forms a valid mountain:{' '}
                    <span
                      className={`font-bold text-xl ${
                        checkValidMountain() ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {checkValidMountain() ? 'Valid' : 'Invalid'}
                    </span>
                  </p>
                  <MountainVisualizer arr={mountainArr} isValid={checkValidMountain()} />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch the validation algorithm check each condition step-by-step
                  </p>
                </div>
                <MountainSimulator arr={mountainArr} />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement the validMountainArray function and run the test cases.
                  </p>
                </div>
                <MountainCodeEditor />
              </div>
            )}
          </>
        )}

        {/* Boats to Save People Content */}
        {activeProblem === 'boats-people' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <BoatsExplanation />
                <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-cyan-100">
                        See how greedy two-pointer algorithm optimizes boat allocation!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-cyan-700 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Minimum boats needed:{' '}
                    <span className="font-bold text-cyan-600 text-xl">
                      {calculateMinBoats()}
                    </span>
                  </p>
                  <BoatsVisualizer
                    people={boatsPeople}
                    limit={boatsLimit}
                    boats={[]}
                  />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch how the algorithm pairs people optimally to minimize boats
                  </p>
                </div>
                <BoatsSimulator people={boatsPeople} limit={boatsLimit} />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement the numRescueBoats function and run the test cases.
                  </p>
                </div>
                <BoatsCodeEditor />
              </div>
            )}
          </>
        )}

        {/* Move Zeroes Content */}
        {activeProblem === 'move-zeroes' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <MoveZeroesExplanation />
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-blue-100">
                        Master the two-pointer technique with in-place array modification!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    See how zeros are moved to the end while maintaining relative order
                  </p>
                  <MoveZeroesVisualizer nums={moveZeroesNums} />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch the two-pointer algorithm move elements step-by-step
                  </p>
                </div>
                <MoveZeroesSimulator nums={moveZeroesNums} />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement the moveZeroes function and run the test cases.
                  </p>
                </div>
                <MoveZeroesCodeEditor />
              </div>
            )}
          </>
        )}

        {/* Longest Substring Content */}
        {activeProblem === 'longest-substring' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <LongestSubstringExplanation />
                <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-purple-100">
                        Master the sliding window technique for substring problems!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    See the longest substring without repeating characters highlighted
                  </p>
                  <LongestSubstringVisualizer str={longestSubstring} />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch the sliding window algorithm find the longest unique substring
                  </p>
                </div>
                <LongestSubstringSimulator str={longestSubstring} />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement the lengthOfLongestSubstring function and run the test cases.
                  </p>
                </div>
                <LongestSubstringCodeEditor />
              </div>
            )}
          </>
        )}

        {/* Find Position Content */}
        {activeProblem === 'find-position' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <FindPositionExplanation />
                <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-indigo-100">
                        Master binary search to find boundaries in O(log n) time!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    See the first and last positions of the target value highlighted
                  </p>
                  <FindPositionVisualizer nums={findPositionNums} target={findPositionTarget} />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch two binary searches find the first and last positions
                  </p>
                </div>
                <FindPositionSimulator nums={findPositionNums} target={findPositionTarget} />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement the searchRange function and run the test cases.
                  </p>
                </div>
                <FindPositionCodeEditor />
              </div>
            )}
          </>
        )}

        {/* First Bad Version Content */}
        {activeProblem === 'first-bad-version' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <FirstBadVersionExplanation />
                <div className="mt-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-orange-100">
                        Minimize API calls with binary search optimization!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-orange-700 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    See how binary search finds the first bad version efficiently
                  </p>
                  <FirstBadVersionVisualizer 
                    totalVersions={badVersionTotal}
                    firstBadVersion={badVersionFirst}
                  />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch binary search narrow down the first bad version step-by-step
                  </p>
                </div>
                <FirstBadVersionSimulator
                  totalVersions={badVersionTotal}
                  firstBadVersion={badVersionFirst}
                />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement the solution function and run the test cases.
                  </p>
                </div>
                <FirstBadVersionCodeEditor />
              </div>
            )}
          </>
        )}

        {/* Missing Number Content */}
        {activeProblem === 'missing-number' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <MissingNumberExplanation />
                <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-purple-100">
                        Find the missing number using math or XOR!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    See which number is missing from the range
                  </p>
                  <MissingNumberVisualizer nums={missingNumberNums} />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch both Math and XOR approaches find the missing number
                  </p>
                </div>
                <MissingNumberSimulator nums={missingNumberNums} />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement the solution using Math or XOR approach.
                  </p>
                </div>
                <MissingNumberCodeEditor nums={missingNumberNums} />
              </div>
            )}
          </>
        )}

        {/* Count Primes Content */}
        {activeProblem === 'count-primes' && (
          <>
            {activeTab === 'learn' && (
              <div>
                <CountPrimesExplanation />
                <div className="mt-8 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Lightbulb size={40} />
                    <div>
                      <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                      <p className="text-orange-100">
                        Use Sieve of Eratosthenes to count primes efficiently!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab('visualize')}
                      className="bg-white text-orange-700 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-md"
                    >
                      Start Visualizing
                    </button>
                    <button
                      onClick={() => setActiveTab('simulate')}
                      className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors shadow-md"
                    >
                      Watch Simulation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visualize' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Static Visualization
                  </h2>
                  <p className="text-slate-600 mb-6">
                    See all prime numbers and how Sieve marks composites
                  </p>
                  <CountPrimesVisualizer n={countPrimesN} />
                </div>
              </div>
            )}

            {activeTab === 'simulate' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Algorithm Simulation
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Watch Sieve of Eratosthenes mark composite numbers step-by-step
                  </p>
                </div>
                <CountPrimesSimulator n={countPrimesN} />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Code Your Solution
                  </h2>
                  <p className="text-slate-600">
                    Implement Sieve of Eratosthenes or brute force approach.
                  </p>
                </div>
                <CountPrimesCodeEditor n={countPrimesN} />
              </div>
            )}
          </>
        )}

          {/* Single Number Content */}
          {activeProblem === 'single-number' && (
            <>
              {activeTab === 'learn' && (
                <div>
                  <SingleNumberExplanation />
                  <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <Lightbulb size={40} />
                      <div>
                        <h3 className="text-2xl font-bold">Siap latihan?</h3>
                        <p className="text-indigo-100">Temukan angka tunggal menggunakan XOR secara efisien.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setActiveTab('visualize')}
                        className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md"
                      >
                        Mulai Visualisasi
                      </button>
                      <button
                        onClick={() => setActiveTab('simulate')}
                        className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors shadow-md"
                      >
                        Lihat Simulasi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <SingleNumberVisualizer nums={singleNumberNums} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <SingleNumberSimulator nums={singleNumberNums} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Code Your Solution</h2>
                    <p className="text-slate-600">Implementasikan fungsi singleNumber menggunakan XOR.</p>
                  </div>
                  <SingleNumberCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Robot Return to Origin Content */}
          {activeProblem === 'robot-return' && (
            <>
              {activeTab === 'learn' && (
                <div>
                  <RobotReturnExplanation />
                  <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <Lightbulb size={40} />
                      <div>
                        <h3 className="text-2xl font-bold">Siap latihan?</h3>
                        <p className="text-cyan-100">Lihat bagaimana pergerakan U/D/L/R mempengaruhi posisi akhir.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setActiveTab('visualize')}
                        className="bg-white text-cyan-700 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors shadow-md"
                      >
                        Mulai Visualisasi
                      </button>
                      <button
                        onClick={() => setActiveTab('simulate')}
                        className="bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-800 transition-colors shadow-md"
                      >
                        Lihat Simulasi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <RobotReturnVisualizer moves={robotMoves} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <RobotReturnSimulator moves={robotMoves} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Code Your Solution</h2>
                    <p className="text-slate-600">Tulis fungsi judgeCircle untuk mengevaluasi pergerakan robot.</p>
                  </div>
                  <RobotReturnCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Add Binary Content */}
          {activeProblem === 'add-binary' && (
            <>
              {activeTab === 'learn' && (
                <div>
                  <AddBinaryExplanation />
                  <div className="mt-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-8 text-white shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <Lightbulb size={40} />
                      <div>
                        <h3 className="text-2xl font-bold">Siap latihan?</h3>
                        <p className="text-orange-100">Latih carry dan penjumlahan digit demi digit pada bilangan biner.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setActiveTab('visualize')}
                        className="bg-white text-orange-700 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-md"
                      >
                        Mulai Visualisasi
                      </button>
                      <button
                        onClick={() => setActiveTab('simulate')}
                        className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors shadow-md"
                      >
                        Lihat Simulasi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <AddBinaryVisualizer a={addBinaryA} b={addBinaryB} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <AddBinarySimulator a={addBinaryA} b={addBinaryB} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Code Your Solution</h2>
                    <p className="text-slate-600">Implementasikan penjumlahan biner tanpa konversi ke desimal.</p>
                  </div>
                  <AddBinaryCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Two Sum Content */}
          {/* Four Sum II Content */}
          {activeProblem === 'four-sum-ii' && (
            <>
              {activeTab === 'learn' && <FourSumTwoExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <FourSumTwoVisualizer a={fourSumA} b={fourSumB} c={fourSumC} d={fourSumD} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <FourSumTwoSimulator a={fourSumA} b={fourSumB} c={fourSumC} d={fourSumD} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Hash Map 4-Sum</h2>
                    <p className="text-slate-600">
                      Implementasikan solusi <span className="font-semibold text-indigo-600">O(n²)</span> dengan hash map untuk menghitung
                      jumlah tuple yang menghasilkan nilai nol.
                    </p>
                  </div>
                  <FourSumTwoCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Minimum Window Substring Content */}
          {activeProblem === 'min-window-substring' && (
            <>
              {activeTab === 'learn' && <MinWindowExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <MinWindowVisualizer s={minWindowS} t={minWindowT} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <MinWindowSimulator s={minWindowS} t={minWindowT} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Code Your Solution</h2>
                    <p className="text-slate-600">
                      Implementasikan algoritma sliding window untuk menemukan substring terkecil yang
                      mengandung semua karakter <span className="font-semibold text-indigo-600">T</span> di dalam <span className="font-semibold text-emerald-600">S</span>.
                    </p>
                  </div>
                                   <MinWindowCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Group Anagrams Content */}
          {activeProblem === 'group-anagrams' && (
            <>
              {activeTab === 'learn' && <GroupAnagramsExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <GroupAnagramsVisualizer strs={groupAnagramsStrs} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <GroupAnagramsSimulator strs={groupAnagramsStrs} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Code Your Solution</h2>
                    <p className="text-slate-600">
                      Implementasikan fungsi untuk mengelompokkan string yang merupakan anagram satu sama lain.
                    </p>
                  </div>
                  <GroupAnagramsCodeEditor />
                </div>
              )}
            </>
          )}

          {/* LRU Cache Content */}
          {activeProblem === 'lru-cache' && (
            <>
              {activeTab === 'learn' && (
                <div>
                  <LRUCacheExplanation />
                  <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <Lightbulb size={40} />
                      <div>
                        <h3 className="text-2xl font-bold">Pahami mekanisme LRU Cache</h3>
                        <p className="text-indigo-100">Pelajari bagaimana setiap operasi mempengaruhi urutan penggunaan.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setActiveTab('visualize')}
                        className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md"
                      >
                        Lihat Visualisasi
                      </button>
                      <button
                        onClick={() => setActiveTab('simulate')}
                        className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors shadow-md"
                      >
                        Jalankan Simulasi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <LRUCacheVisualizer
                    capacity={lruCapacity}
                    cache={lruCacheState}
                    lastOperation={lruLastOp}
                  />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <LRUCacheSimulator capacity={lruCapacity} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Design LRU Cache</h2>
                    <p className="text-slate-600">
                      Bangun struktur data dengan operasi <span className="font-semibold">O(1)</span> untuk <code>get</code> dan <code>put</code>
                      menggunakan hash map dan doubly linked list.
                    </p>
                  </div>
                  <LRUCacheCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Merge Two Sorted Lists Content */}
          {activeProblem === 'merge-two-lists' && (
            <>
              {activeTab === 'learn' && <MergeTwoListsExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <MergeTwoListsVisualizer list1={mergeTwoListsState.list1} list2={mergeTwoListsState.list2} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <MergeTwoListsSimulator list1={mergeTwoListsState.list1} list2={mergeTwoListsState.list2} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Code Your Solution</h2>
                    <p className="text-slate-600">Gabungkan dua linked list terurut menjadi satu list terurut.</p>
                  </div>
                  <MergeTwoListsCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Linked List Cycle Content */}
          {activeProblem === 'linked-list-cycle' && (
            <>
              {activeTab === 'learn' && <LinkedListCycleExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <LinkedListCycleVisualizer problemState={linkedListCycleState} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <LinkedListCycleSimulator problemState={linkedListCycleState} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Code Your Solution</h2>
                    <p className="text-slate-600">Deteksi siklus pada linked list menggunakan dua pointer.</p>
                  </div>
                  <LinkedListCycleCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Reverse Linked List Content */}
          {activeProblem === 'reverse-linked-list' && (
            <>
              {activeTab === 'learn' && <ReverseLinkedListExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <ReverseLinkedListVisualizer list={reverseList} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <ReverseLinkedListSimulator list={reverseList} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Reverse Linked List</h2>
                    <p className="text-slate-600">
                      Balikkan singly linked list secara in-place dengan tiga pointer. Coba solusi referensi Go lalu kembangkan versimu.
                    </p>
                  </div>
                  <ReverseLinkedListCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Add Two Numbers Content */}
          {activeProblem === 'add-two-numbers' && (
            <>
              {activeTab === 'learn' && <AddTwoNumbersExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <AddTwoNumbersVisualizer l1={addTwoL1} l2={addTwoL2} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <AddTwoNumbersSimulator l1={addTwoL1} l2={addTwoL2} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Add Two Numbers</h2>
                    <p className="text-slate-600">
                      Kodekan penjumlahan dua bilangan (head = satuan) dan pastikan carry benar. Lihat referensi Go, lalu coba eksperimen versimu.
                    </p>
                  </div>
                  <AddTwoNumbersCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Remove Nth Node From End Content */}
          {activeProblem === 'remove-nth-node' && (
            <>
              {activeTab === 'learn' && <RemoveNthExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <RemoveNthVisualizer list={removeNthList} n={removeNthN} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <RemoveNthSimulator list={removeNthList} n={removeNthN} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Remove Nth Node</h2>
                    <p className="text-slate-600">
                      Latihan hapus node ke-n dari belakang dengan dummy dan dua pointer satu-pass. Coba variasi test case-mu sendiri.
                    </p>
                  </div>
                  <RemoveNthCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Odd Even Linked List Content */}
          {activeProblem === 'odd-even-linked-list' && (
            <>
              {activeTab === 'learn' && <OddEvenExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <OddEvenVisualizer list={oddEvenList} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <OddEvenSimulator list={oddEvenList} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Odd Even Linked List</h2>
                    <p className="text-slate-600">
                      Susun ulang node berdasarkan index ganjil lalu genap secara in-place. Gunakan dua pointer (odd, even) dan koneksi ulang ujung.
                    </p>
                  </div>
                  <OddEvenCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Subsets Content */}
          {activeProblem === 'subsets' && (
            <>
              {activeTab === 'learn' && <SubsetsExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <SubsetsVisualizer nums={subsetsNums} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <SubsetsSimulator nums={subsetsNums} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Subsets</h2>
                    <p className="text-slate-600">
                      Implementasikan solusi backtracking untuk menghasilkan semua subset.
                    </p>
                  </div>
                  <SubsetsCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Letter Combinations Content */}
          {activeProblem === 'letter-combinations' && (
            <>
              {activeTab === 'learn' && <LetterCombinationsExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <LetterCombinationsVisualizer digits={letterCombinationsDigits} />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <LetterCombinationsSimulator digits={letterCombinationsDigits} />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Letter Combinations</h2>
                    <p className="text-slate-600">
                      Implementasikan solusi backtracking untuk menghasilkan semua kombinasi huruf dari digit telepon.
                    </p>
                  </div>
                  <LetterCombinationsCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Combination Sum Content */}
          {activeProblem === 'combination-sum' && (
            <>
              {activeTab === 'learn' && <CombinationSumExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <CombinationSumVisualizer 
                    candidates={combinationSumCandidates} 
                    target={combinationSumTarget} 
                  />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <CombinationSumSimulator 
                    candidates={combinationSumCandidates} 
                    target={combinationSumTarget} 
                  />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Combination Sum</h2>
                    <p className="text-slate-600">
                      Implementasikan solusi backtracking dengan pruning untuk menemukan kombinasi yang jumlahnya sama dengan target.
                    </p>
                  </div>
                  <CombinationSumCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Palindrome Partition Content */}
          {activeProblem === 'palindrome-partition' && (
            <>
              {activeTab === 'learn' && <PalindromePartitionExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <PalindromePartitionVisualizer 
                    partitions={(() => {
                      const result: string[][] = [];
                      function isPalindrome(s: string): boolean {
                        let left = 0, right = s.length - 1;
                        while (left < right) {
                          if (s[left] !== s[right]) return false;
                          left++; right--;
                        }
                        return true;
                      }
                      function backtrack(start: number, current: string[]) {
                        if (start === palindromePartitionString.length) {
                          result.push([...current]);
                          return;
                        }
                        for (let end = start + 1; end <= palindromePartitionString.length; end++) {
                          const sub = palindromePartitionString.substring(start, end);
                          if (isPalindrome(sub)) {
                            current.push(sub);
                            backtrack(end, current);
                            current.pop();
                          }
                        }
                      }
                      backtrack(0, []);
                      return result;
                    })()}
                  />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <PalindromePartitionSimulator 
                    inputString={palindromePartitionString}
                  />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Palindrome Partitioning</h2>
                    <p className="text-slate-600">
                      Implementasikan solusi backtracking untuk menemukan semua partisi palindrome dari string.
                    </p>
                  </div>
                  <PalindromePartitionCodeEditor />
                </div>
              )}
            </>
          )}

          {/* Symmetric Tree Content */}
          {activeProblem === 'symmetric-tree' && (
            <>
              {activeTab === 'learn' && <SymmetricTreeExplanation />}

              {activeTab === 'visualize' && (
                <div className="space-y-6">
                  <SymmetricTreeVisualizer 
                    nodes={symmetricTreeNodes}
                  />
                </div>
              )}

              {activeTab === 'simulate' && (
                <div className="space-y-6">
                  <SymmetricTreeSimulator 
                    nodes={symmetricTreeNodes}
                  />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice: Symmetric Tree</h2>
                    <p className="text-slate-600">
                      Implementasikan solusi rekursif atau iteratif untuk cek apakah tree symmetric.
                    </p>
                  </div>
                  <SymmetricTreeCodeEditor />
                </div>
              )}
            </>
          )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-slate-600 text-sm">
            <p>
              Practice makes perfect. Master this problem and similar FAANG interview questions!
            </p>
            <p className="mt-2 text-slate-500">
              Problem difficulty:{' '}
              <span
                className={`font-semibold ${
                  currentProblem.difficulty === 'Easy'
                    ? 'text-green-600'
                    : currentProblem.difficulty === 'Medium'
                    ? 'text-orange-600'
                    : 'text-red-600'
                }`}
              >
                {currentProblem.difficulty}
              </span>{' '}
              | Topics: <span className="font-semibold">{currentProblem.topics.join(', ')}</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
