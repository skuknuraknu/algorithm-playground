// Problem-specific state management hooks
import { useState } from 'react';

export const useProblemStates = () => {
  // Container Water
  const [heights, setHeights] = useState([1, 8, 6, 2, 5, 4, 8, 3, 7]);

  // Mountain Array
  const [mountainArr, setMountainArr] = useState([0, 3, 2, 1]);

  // Boats to Save People
  const [boatsPeople, setBoatsPeople] = useState([3, 2, 2, 1]);
  const [boatsLimit, setBoatsLimit] = useState(3);

  // Move Zeroes
  const [moveZeroesNums, setMoveZeroesNums] = useState([0, 1, 0, 3, 12]);

  // Longest Substring
  const [longestSubstring, setLongestSubstring] = useState('abcabcbb');

  // Find Position
  const [findPositionNums, setFindPositionNums] = useState([5, 7, 7, 8, 8, 10]);
  const [findPositionTarget, setFindPositionTarget] = useState(8);

  // First Bad Version
  const [badVersionTotal, setBadVersionTotal] = useState(10);
  const [badVersionFirst, setBadVersionFirst] = useState(7);

  // Missing Number
  const [missingNumberNums, setMissingNumberNums] = useState([3, 0, 1]);

  // Count Primes
  const [countPrimesN, setCountPrimesN] = useState(10);

  // 4Sum II
  const [fourSumA, setFourSumA] = useState([1, 2]);
  const [fourSumB, setFourSumB] = useState([-2, -1]);
  const [fourSumC, setFourSumC] = useState([-1, 2]);
  const [fourSumD, setFourSumD] = useState([0, 2]);

  // Minimum Window Substring
  const [minWindowS, setMinWindowS] = useState('ADOBECODEBANC');
  const [minWindowT, setMinWindowT] = useState('ABC');

  return {
    heights,
    setHeights,
    mountainArr,
    setMountainArr,
    boatsPeople,
    setBoatsPeople,
    boatsLimit,
    setBoatsLimit,
    moveZeroesNums,
    setMoveZeroesNums,
    longestSubstring,
    setLongestSubstring,
    findPositionNums,
    setFindPositionNums,
    findPositionTarget,
    setFindPositionTarget,
    badVersionTotal,
    setBadVersionTotal,
    badVersionFirst,
    setBadVersionFirst,
    missingNumberNums,
    setMissingNumberNums,
    countPrimesN,
    setCountPrimesN,
    fourSumA,
    setFourSumA,
    fourSumB,
    setFourSumB,
    fourSumC,
    setFourSumC,
    fourSumD,
    setFourSumD,
    minWindowS,
    setMinWindowS,
    minWindowT,
    setMinWindowT,
  };
};
