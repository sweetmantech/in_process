export const calculateTotalPercentage = (splits: { percentAllocation: number }[]): number => {
  return splits.reduce((sum, split) => sum + (split.percentAllocation || 0), 0);
};
