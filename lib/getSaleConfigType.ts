const getSaleConfigType = (value: "erc20Mint" | "timed" | "fixedPrice") => {
  if (value === "erc20Mint") return "ZoraErc20MintSaleStrategy";
  if (value === "timed") return "ZoraTimedSaleStrategy";
  return "ZoraFixedPriceSaleStrategy";
};

export default getSaleConfigType;
