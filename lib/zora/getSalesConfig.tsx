import { FixedPriceParamsType, TimedSaleParamsType } from "@/lib/protocolSdk";

const getSalesConfig = (saleStrategy: string) => {
  const timedSaleConfig = {
    type: "timed",
    erc20Name: "CC0 Music",
    erc20Symbol: "CC0",
  } as TimedSaleParamsType;
  const fixedPriceSaleConfig = {
    type: "fixedPrice",
    pricePerToken: BigInt(1),
  } as FixedPriceParamsType;
  return saleStrategy === "ZoraTimedSaleStrategy"
    ? timedSaleConfig
    : fixedPriceSaleConfig;
};

export default getSalesConfig;
