const getSaleConfigType = (value: string) => {
  if (value.includes("usdc")) return "ZoraErc20MintSaleStrategy";
  if (value.includes("timed")) return "ZoraTimedSaleStrategy";
  return "ZoraFixedPriceSaleStrategy";
};

export default getSaleConfigType;
