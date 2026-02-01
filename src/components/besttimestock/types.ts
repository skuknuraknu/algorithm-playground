export interface StockStep {
  index: number;
  price: number;
  minPrice: number;
  minIndex: number;
  profitIfSell: number;
  bestProfit: number;
  bestBuy: number;
  bestSell: number;
}

export interface StockResult {
  profit: number;
  buyIndex: number | null;
  sellIndex: number | null;
  steps: StockStep[];
}

export function bestTimeStockWithSteps(prices: number[]): StockResult {
  if (prices.length === 0) return { profit: 0, buyIndex: null, sellIndex: null, steps: [] };

  let minPrice = prices[0];
  let minIndex = 0;
  let bestProfit = 0;
  let bestBuy = 0;
  let bestSell = 0;
  const steps: StockStep[] = [];

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    if (price < minPrice) {
      minPrice = price;
      minIndex = i;
    }

    const profitIfSell = price - minPrice;
    if (profitIfSell > bestProfit) {
      bestProfit = profitIfSell;
      bestBuy = minIndex;
      bestSell = i;
    }

    steps.push({
      index: i,
      price,
      minPrice,
      minIndex,
      profitIfSell,
      bestProfit,
      bestBuy,
      bestSell,
    });
  }

  return {
    profit: bestProfit,
    buyIndex: bestProfit > 0 ? bestBuy : null,
    sellIndex: bestProfit > 0 ? bestSell : null,
    steps,
  };
}
