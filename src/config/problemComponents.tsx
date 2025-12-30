import { ComponentType } from 'react';
import { ProblemId } from '../types/Problem';

// Container Water
import InputPanel from '../components/InputPanel';
import ContainerVisualizer from '../components/ContainerVisualizer';
import AlgorithmSimulator from '../components/AlgorithmSimulator';
import CodeEditor from '../components/CodeEditor';
import ProblemExplanation from '../components/ProblemExplanation';

// Mountain Array
import MountainInputPanel from '../components/mountain/MountainInputPanel';
import MountainVisualizer from '../components/mountain/MountainVisualizer';
import MountainSimulator from '../components/mountain/MountainSimulator';
import MountainCodeEditor from '../components/mountain/MountainCodeEditor';
import MountainExplanation from '../components/mountain/MountainExplanation';

// Boats
import BoatsInputPanel from '../components/boats/BoatsInputPanel';
import BoatsVisualizer from '../components/boats/BoatsVisualizer';
import BoatsSimulator from '../components/boats/BoatsSimulator';
import BoatsCodeEditor from '../components/boats/BoatsCodeEditor';
import BoatsExplanation from '../components/boats/BoatsExplanation';

// Move Zeroes
import MoveZeroesInputPanel from '../components/movezeroes/MoveZeroesInputPanel';
import MoveZeroesVisualizer from '../components/movezeroes/MoveZeroesVisualizer';
import MoveZeroesSimulator from '../components/movezeroes/MoveZeroesSimulator';
import MoveZeroesCodeEditor from '../components/movezeroes/MoveZeroesCodeEditor';
import MoveZeroesExplanation from '../components/movezeroes/MoveZeroesExplanation';

// Longest Substring
import LongestSubstringInputPanel from '../components/longestsubstring/LongestSubstringInputPanel';
import LongestSubstringVisualizer from '../components/longestsubstring/LongestSubstringVisualizer';
import LongestSubstringSimulator from '../components/longestsubstring/LongestSubstringSimulator';
import LongestSubstringCodeEditor from '../components/longestsubstring/LongestSubstringCodeEditor';
import LongestSubstringExplanation from '../components/longestsubstring/LongestSubstringExplanation';

// Find Position
import FindPositionInputPanel from '../components/findposition/FindPositionInputPanel';
import FindPositionVisualizer from '../components/findposition/FindPositionVisualizer';
import FindPositionSimulator from '../components/findposition/FindPositionSimulator';
import FindPositionCodeEditor from '../components/findposition/FindPositionCodeEditor';
import FindPositionExplanation from '../components/findposition/FindPositionExplanation';

// First Bad Version
import FirstBadVersionInputPanel from '../components/firstbadversion/FirstBadVersionInputPanel';
import FirstBadVersionVisualizer from '../components/firstbadversion/FirstBadVersionVisualizer';
import FirstBadVersionSimulator from '../components/firstbadversion/FirstBadVersionSimulator';
import FirstBadVersionCodeEditor from '../components/firstbadversion/FirstBadVersionCodeEditor';
import FirstBadVersionExplanation from '../components/firstbadversion/FirstBadVersionExplanation';

// Missing Number
import MissingNumberInputPanel from '../components/missingnumber/MissingNumberInputPanel';
import MissingNumberVisualizer from '../components/missingnumber/MissingNumberVisualizer';
import MissingNumberSimulator from '../components/missingnumber/MissingNumberSimulator';
import MissingNumberCodeEditor from '../components/missingnumber/MissingNumberCodeEditor';
import MissingNumberExplanation from '../components/missingnumber/MissingNumberExplanation';

// Count Primes
import CountPrimesInputPanel from '../components/countprimes/CountPrimesInputPanel';
import CountPrimesVisualizer from '../components/countprimes/CountPrimesVisualizer';
import CountPrimesSimulator from '../components/countprimes/CountPrimesSimulator';
import CountPrimesCodeEditor from '../components/countprimes/CountPrimesCodeEditor';
import CountPrimesExplanation from '../components/countprimes/CountPrimesExplanation';

// Single Number
import SingleNumberExplanation from '../components/singlenumber/SingleNumberExplanation';
import SingleNumberInputPanel from '../components/singlenumber/SingleNumberInputPanel';
import SingleNumberVisualizer from '../components/singlenumber/SingleNumberVisualizer';
import SingleNumberSimulator from '../components/singlenumber/SingleNumberSimulator';
import SingleNumberCodeEditor from '../components/singlenumber/SingleNumberCodeEditor';

// Robot Return to Origin
import RobotReturnExplanation from '../components/robotreturn/RobotReturnExplanation';
import RobotReturnInputPanel from '../components/robotreturn/RobotReturnInputPanel';
import RobotReturnVisualizer from '../components/robotreturn/RobotReturnVisualizer';
import RobotReturnSimulator from '../components/robotreturn/RobotReturnSimulator';
import RobotReturnCodeEditor from '../components/robotreturn/RobotReturnCodeEditor';

// Add Binary
import AddBinaryExplanation from '../components/addbinary/AddBinaryExplanation';
import AddBinaryInputPanel from '../components/addbinary/AddBinaryInputPanel';
import AddBinaryVisualizer from '../components/addbinary/AddBinaryVisualizer';
import AddBinarySimulator from '../components/addbinary/AddBinarySimulator';
import AddBinaryCodeEditor from '../components/addbinary/AddBinaryCodeEditor';

// Two Sum
import TwoSumExplanation from '../components/twosum/TwoSumExplanation';
import TwoSumInputPanel from '../components/twosum/TwoSumInputPanel';
import TwoSumVisualizer from '../components/twosum/TwoSumVisualizer';
import TwoSumSimulator from '../components/twosum/TwoSumSimulator';
import TwoSumCodeEditor from '../components/twosum/TwoSumCodeEditor';

// Contains Duplicate
import ContainsDuplicateExplanation from '../components/containsduplicate/ContainsDuplicateExplanation';
import ContainsDuplicateInputPanel from '../components/containsduplicate/ContainsDuplicateInputPanel';
import ContainsDuplicateVisualizer from '../components/containsduplicate/ContainsDuplicateVisualizer';
import ContainsDuplicateSimulator from '../components/containsduplicate/ContainsDuplicateSimulator';
import ContainsDuplicateCodeEditor from '../components/containsduplicate/ContainsDuplicateCodeEditor';

// Merge Two Lists
import MergeTwoListsExplanation from '../components/mergetwolists/MergeTwoListsExplanation';
import MergeTwoListsInputPanel from '../components/mergetwolists/MergeTwoListsInputPanel';
import MergeTwoListsVisualizer from '../components/mergetwolists/MergeTwoListsVisualizer';
import MergeTwoListsSimulator from '../components/mergetwolists/MergeTwoListsSimulator';
import MergeTwoListsCodeEditor from '../components/mergetwolists/MergeTwoListsCodeEditor';

// Linked List Cycle
import LinkedListCycleExplanation from '../components/linkedlistcycle/LinkedListCycleExplanation';
import LinkedListCycleInputPanel from '../components/linkedlistcycle/LinkedListCycleInputPanel';
import LinkedListCycleVisualizer from '../components/linkedlistcycle/LinkedListCycleVisualizer';
import LinkedListCycleSimulator from '../components/linkedlistcycle/LinkedListCycleSimulator';
import LinkedListCycleCodeEditor from '../components/linkedlistcycle/LinkedListCycleCodeEditor';

// Four Sum II
import FourSumTwoExplanation from '../components/foursumtwo/FourSumTwoExplanation';
import FourSumTwoInputPanel from '../components/foursumtwo/FourSumTwoInputPanel';
import FourSumTwoVisualizer from '../components/foursumtwo/FourSumTwoVisualizer';
import FourSumTwoSimulator from '../components/foursumtwo/FourSumTwoSimulator';
import FourSumTwoCodeEditor from '../components/foursumtwo/FourSumTwoCodeEditor';

// Minimum Window Substring
import MinWindowInputPanel from '../components/minwindow/MinWindowInputPanel';
import MinWindowVisualizer from '../components/minwindow/MinWindowVisualizer';
import MinWindowSimulator from '../components/minwindow/MinWindowSimulator';
import MinWindowCodeEditor from '../components/minwindow/MinWindowCodeEditor';
import MinWindowExplanation from '../components/minwindow/MinWindowExplanation';

// Majority Element
import MajorityElementExplanation from '../components/majorityelement/MajorityElementExplanation';
import MajorityElementInputPanel from '../components/majorityelement/MajorityElementInputPanel';
import MajorityElementVisualizer from '../components/majorityelement/MajorityElementVisualizer';
import MajorityElementSimulator from '../components/majorityelement/MajorityElementSimulator';
import MajorityElementCodeEditor from '../components/majorityelement/MajorityElementCodeEditor';

// Group Anagrams
import GroupAnagramsExplanation from '../components/groupanagrams/GroupAnagramsExplanation';
import GroupAnagramsInputPanel from '../components/groupanagrams/GroupAnagramsInputPanel';
import GroupAnagramsVisualizer from '../components/groupanagrams/GroupAnagramsVisualizer';
import GroupAnagramsSimulator from '../components/groupanagrams/GroupAnagramsSimulator';
import GroupAnagramsCodeEditor from '../components/groupanagrams/GroupAnagramsCodeEditor';

// LRU Cache
import LRUCacheExplanation from '../components/lrucache/LRUCacheExplanation';
import LRUCacheInputPanel from '../components/lrucache/LRUCacheInputPanel';
import LRUCacheVisualizer from '../components/lrucache/LRUCacheVisualizer';
import LRUCacheSimulator from '../components/lrucache/LRUCacheSimulator';
import LRUCacheCodeEditor from '../components/lrucache/LRUCacheCodeEditor';

// Reverse Linked List
import ReverseLinkedListExplanation from '../components/reverselinkedlist/ReverseLinkedListExplanation';
import ReverseLinkedListInputPanel from '../components/reverselinkedlist/ReverseLinkedListInputPanel';
import ReverseLinkedListVisualizer from '../components/reverselinkedlist/ReverseLinkedListVisualizer';
import ReverseLinkedListSimulator from '../components/reverselinkedlist/ReverseLinkedListSimulator';
import ReverseLinkedListCodeEditor from '../components/reverselinkedlist/ReverseLinkedListCodeEditor';

// Add Two Numbers
import AddTwoNumbersExplanation from '../components/addtwonumbers/AddTwoNumbersExplanation';
import AddTwoNumbersInputPanel from '../components/addtwonumbers/AddTwoNumbersInputPanel';
import AddTwoNumbersVisualizer from '../components/addtwonumbers/AddTwoNumbersVisualizer';
import AddTwoNumbersSimulator from '../components/addtwonumbers/AddTwoNumbersSimulator';
import AddTwoNumbersCodeEditor from '../components/addtwonumbers/AddTwoNumbersCodeEditor';

// Remove Nth Node From End
import RemoveNthExplanation from '../components/removenth/RemoveNthExplanation';
import RemoveNthInputPanel from '../components/removenth/RemoveNthInputPanel';
import RemoveNthVisualizer from '../components/removenth/RemoveNthVisualizer';
import RemoveNthSimulator from '../components/removenth/RemoveNthSimulator';
import RemoveNthCodeEditor from '../components/removenth/RemoveNthCodeEditor';

// Odd Even Linked List
import OddEvenExplanation from '../components/oddeven/OddEvenExplanation';
import OddEvenInputPanel from '../components/oddeven/OddEvenInputPanel';
import OddEvenVisualizer from '../components/oddeven/OddEvenVisualizer';
import OddEvenSimulator from '../components/oddeven/OddEvenSimulator';
import OddEvenCodeEditor from '../components/oddeven/OddEvenCodeEditor';

// Subsets
import SubsetsInputPanel from '../components/subsets/SubsetsInputPanel';
import SubsetsVisualizer from '../components/subsets/SubsetsVisualizer';
import SubsetsSimulator from '../components/subsets/SubsetsSimulator';
import SubsetsCodeEditor from '../components/subsets/SubsetsCodeEditor';
import SubsetsExplanation from '../components/subsets/SubsetsExplanation';

export interface ProblemComponents {
  Explanation: ComponentType;
  InputPanel: ComponentType<any>;
  Visualizer: ComponentType<any>;
  Simulator: ComponentType<any>;
  CodeEditor: ComponentType<any>;
}

// const ComingSoon = () => (
//   <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-600">
//     🚧 Coming soon
//   </div>
// );

export const PROBLEM_COMPONENTS: Record<ProblemId, ProblemComponents> = {
  'container-water': {
    Explanation: ProblemExplanation,
    InputPanel: InputPanel,
    Visualizer: ContainerVisualizer,
    Simulator: AlgorithmSimulator,
    CodeEditor: CodeEditor,
  },
  'mountain-array': {
    Explanation: MountainExplanation,
    InputPanel: MountainInputPanel,
    Visualizer: MountainVisualizer,
    Simulator: MountainSimulator,
    CodeEditor: MountainCodeEditor,
  },
  'boats-people': {
    Explanation: BoatsExplanation,
    InputPanel: BoatsInputPanel,
    Visualizer: BoatsVisualizer,
    Simulator: BoatsSimulator,
    CodeEditor: BoatsCodeEditor,
  },
  'move-zeroes': {
    Explanation: MoveZeroesExplanation,
    InputPanel: MoveZeroesInputPanel,
    Visualizer: MoveZeroesVisualizer,
    Simulator: MoveZeroesSimulator,
    CodeEditor: MoveZeroesCodeEditor,
  },
  'longest-substring': {
    Explanation: LongestSubstringExplanation,
    InputPanel: LongestSubstringInputPanel,
    Visualizer: LongestSubstringVisualizer,
    Simulator: LongestSubstringSimulator,
    CodeEditor: LongestSubstringCodeEditor,
  },
  'find-position': {
    Explanation: FindPositionExplanation,
    InputPanel: FindPositionInputPanel,
    Visualizer: FindPositionVisualizer,
    Simulator: FindPositionSimulator,
    CodeEditor: FindPositionCodeEditor,
  },
  'first-bad-version': {
    Explanation: FirstBadVersionExplanation,
    InputPanel: FirstBadVersionInputPanel,
    Visualizer: FirstBadVersionVisualizer,
    Simulator: FirstBadVersionSimulator,
    CodeEditor: FirstBadVersionCodeEditor,
  },
  'missing-number': {
    Explanation: MissingNumberExplanation,
    InputPanel: MissingNumberInputPanel,
    Visualizer: MissingNumberVisualizer,
    Simulator: MissingNumberSimulator,
    CodeEditor: MissingNumberCodeEditor,
  },
  'count-primes': {
    Explanation: CountPrimesExplanation,
    InputPanel: CountPrimesInputPanel,
    Visualizer: CountPrimesVisualizer,
    Simulator: CountPrimesSimulator,
    CodeEditor: CountPrimesCodeEditor,
  },
  'single-number': {
    Explanation: SingleNumberExplanation,
    InputPanel: SingleNumberInputPanel,
    Visualizer: SingleNumberVisualizer,
    Simulator: SingleNumberSimulator,
    CodeEditor: SingleNumberCodeEditor,
  },
  'robot-return': {
    Explanation: RobotReturnExplanation,
    InputPanel: RobotReturnInputPanel,
    Visualizer: RobotReturnVisualizer,
    Simulator: RobotReturnSimulator,
    CodeEditor: RobotReturnCodeEditor,
  },
  'add-binary': {
    Explanation: AddBinaryExplanation,
    InputPanel: AddBinaryInputPanel,
    Visualizer: AddBinaryVisualizer,
    Simulator: AddBinarySimulator,
    CodeEditor: AddBinaryCodeEditor,
  },
  'two-sum': {
    Explanation: TwoSumExplanation,
    InputPanel: TwoSumInputPanel,
    Visualizer: TwoSumVisualizer,
    Simulator: TwoSumSimulator,
    CodeEditor: TwoSumCodeEditor,
  },
  'contains-duplicate': {
    Explanation: ContainsDuplicateExplanation,
    InputPanel: ContainsDuplicateInputPanel,
    Visualizer: ContainsDuplicateVisualizer,
    Simulator: ContainsDuplicateSimulator,
    CodeEditor: ContainsDuplicateCodeEditor,
  },
  'merge-two-lists': {
    Explanation: MergeTwoListsExplanation,
    InputPanel: MergeTwoListsInputPanel,
    Visualizer: MergeTwoListsVisualizer,
    Simulator: MergeTwoListsSimulator,
    CodeEditor: MergeTwoListsCodeEditor,
  },
  'linked-list-cycle': {
    Explanation: LinkedListCycleExplanation,
    InputPanel: LinkedListCycleInputPanel,
    Visualizer: LinkedListCycleVisualizer,
    Simulator: LinkedListCycleSimulator,
    CodeEditor: LinkedListCycleCodeEditor,
  },
  'four-sum-ii': {
    Explanation: FourSumTwoExplanation,
    InputPanel: FourSumTwoInputPanel,
    Visualizer: FourSumTwoVisualizer,
    Simulator: FourSumTwoSimulator,
    CodeEditor: FourSumTwoCodeEditor,
  },
  'min-window-substring': {
    Explanation: MinWindowExplanation,
    InputPanel: MinWindowInputPanel,
    Visualizer: MinWindowVisualizer,
    Simulator: MinWindowSimulator,
    CodeEditor: MinWindowCodeEditor,
  },
  'majority-element': {
    Explanation: MajorityElementExplanation,
    InputPanel: MajorityElementInputPanel,
    Visualizer: MajorityElementVisualizer,
    Simulator: MajorityElementSimulator,
    CodeEditor: MajorityElementCodeEditor,
  },
  'group-anagrams': {
    Explanation: GroupAnagramsExplanation,
    InputPanel: GroupAnagramsInputPanel,
    Visualizer: GroupAnagramsVisualizer,
    Simulator: GroupAnagramsSimulator,
    CodeEditor: GroupAnagramsCodeEditor,
  },
  'lru-cache': {
    Explanation: LRUCacheExplanation,
    InputPanel: LRUCacheInputPanel,
    Visualizer: LRUCacheVisualizer,
    Simulator: LRUCacheSimulator,
    CodeEditor: LRUCacheCodeEditor,
  },
  'reverse-linked-list': {
    Explanation: ReverseLinkedListExplanation,
    InputPanel: ReverseLinkedListInputPanel,
    Visualizer: ReverseLinkedListVisualizer,
    Simulator: ReverseLinkedListSimulator,
    CodeEditor: ReverseLinkedListCodeEditor,
  },
  'add-two-numbers': {
    Explanation: AddTwoNumbersExplanation,
    InputPanel: AddTwoNumbersInputPanel,
    Visualizer: AddTwoNumbersVisualizer,
    Simulator: AddTwoNumbersSimulator,
    CodeEditor: AddTwoNumbersCodeEditor,
  },
  'remove-nth-node': {
    Explanation: RemoveNthExplanation,
    InputPanel: RemoveNthInputPanel,
    Visualizer: RemoveNthVisualizer,
    Simulator: RemoveNthSimulator,
    CodeEditor: RemoveNthCodeEditor,
  },
  'odd-even-linked-list': {
    Explanation: OddEvenExplanation,
    InputPanel: OddEvenInputPanel,
    Visualizer: OddEvenVisualizer,
    Simulator: OddEvenSimulator,
    CodeEditor: OddEvenCodeEditor,
  },
  subsets: {
    Explanation: SubsetsExplanation,
    InputPanel: SubsetsInputPanel,
    Visualizer: SubsetsVisualizer,
    Simulator: SubsetsSimulator,
    CodeEditor: SubsetsCodeEditor,
  },
};
