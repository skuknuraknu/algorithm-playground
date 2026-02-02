export interface ClimbStep {
  step: number;
  ways: number;
  prev1: number;
  prev2: number;
}

export interface ClimbResult {
  total: number;
  steps: ClimbStep[];
}

export function climbWithSteps(n: number): ClimbResult {
  if (n <= 0) return { total: 0, steps: [] };
  if (n === 1) return { total: 1, steps: [{ step: 1, ways: 1, prev1: 1, prev2: 0 }] };

  let prev2 = 1; // dp[1]
  let prev1 = 2; // dp[2]
  const steps: ClimbStep[] = [
    { step: 1, ways: 1, prev1: 1, prev2: 0 },
    { step: 2, ways: 2, prev1: 2, prev2: 1 },
  ];

  for (let i = 3; i <= n; i++) {
    const ways = prev1 + prev2;
    steps.push({ step: i, ways, prev1: prev1, prev2: prev2 });
    prev2 = prev1;
    prev1 = ways;
  }

  return { total: prev1, steps };
}
