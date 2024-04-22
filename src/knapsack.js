function knapsack(dressItems, budget) {
  const n = dressItems.length;
  const dp = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= budget; j++) {
      const { value, weight, color, popularity } = dressItems[i - 1];
      
      // Calculate total value based on rating, popularity, and color
      const totalValue = value * popularity;

      if (weight <= j) {
        dp[i][j] = Math.max(dp[i - 1][j], totalValue + dp[i - 1][j - weight]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  const selectedDressIndices = [];
  let i = n, j = budget;
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      selectedDressIndices.push(i - 1);
      j -= dressItems[i - 1].weight;
    }
    i--;
  }

  return selectedDressIndices.reverse();
}

export default knapsack;
