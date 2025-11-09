export const calculateTotalPercentage = (splits: { percentage: number }[]): number => {
  return splits.reduce((sum, split) => sum + (split.percentage || 0), 0);
};
