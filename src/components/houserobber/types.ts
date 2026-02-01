export interface RobStep {
  index: number;
  house: number;
  pick: number;
  skip: number;
  chosen: 'pick' | 'skip';
  best: number;
  pickPath: number[];
  skipPath: number[];
  bestPath: number[];
}

export interface RobResult {
  max: number;
  steps: RobStep[];
  chosenHouses: number[];
}

export function robWithSteps(houses: number[]): RobResult {
  if (!houses.length) {
    return { max: 0, steps: [], chosenHouses: [] };
  }

  let prev1 = 0; // dp[i-1]
  let prev2 = 0; // dp[i-2]
  let path1: number[] = [];
  let path2: number[] = [];
  const steps: RobStep[] = [];

  for (let i = 0; i < houses.length; i++) {
    const val = houses[i];
    const pick = val + prev2;
    const skip = prev1;
    const pickPath = [...path2, i];
    const skipPath = path1;

    const chosen = pick >= skip ? 'pick' : 'skip';
    const best = chosen === 'pick' ? pick : skip;
    const bestPath = chosen === 'pick' ? pickPath : skipPath;

    steps.push({
      index: i,
      house: val,
      pick,
      skip,
      chosen,
      best,
      pickPath,
      skipPath,
      bestPath,
    });

    // update rolling window
    prev2 = prev1;
    path2 = path1;
    prev1 = best;
    path1 = bestPath;
  }

  return { max: prev1, steps, chosenHouses: path1 };
}
