export interface CoinStep {
  coin: number;
  amount: number;
  prev: number;
  candidate: number;
  newVal: number;
  dpSnapshot: number[];
}

export interface CoinResult {
  minCoins: number;
  steps: CoinStep[];
  dp: number[];
}

export function coinChangeWithSteps(coins: number[], amount: number): CoinResult {
  if (amount < 0) return { minCoins: -1, steps: [], dp: [] };
  if (amount === 0) return { minCoins: 0, steps: [], dp: [0] };

  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  const steps: CoinStep[] = [];

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      const prev = dp[a];
      const candidate = dp[a - coin] + 1;
      const newVal = Math.min(prev, candidate);
      if (newVal !== dp[a]) {
        dp[a] = newVal;
      }
      steps.push({
        coin,
        amount: a,
        prev,
        candidate,
        newVal,
        dpSnapshot: [...dp],
      });
    }
  }

  return { minCoins: dp[amount] === Infinity ? -1 : dp[amount], steps, dp };
}
