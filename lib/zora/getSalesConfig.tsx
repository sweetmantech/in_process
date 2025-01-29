import { FixedPriceParamsType, TimedSaleParamsType } from "@/lib/protocolSdk";
import { maxUint64 } from "viem";

const getSalesConfig = (saleStrategy: string) => {
  const timedSaleConfig = {
    type: "timed",
    erc20Name: "CC0 Music",
    erc20Symbol: "CC0",
  } as TimedSaleParamsType;
  const fixedPriceSaleConfig = {
    type: "fixedPrice",
    pricePerToken: BigInt(1),
    saleEnd: maxUint64,
  } as FixedPriceParamsType;
  return saleStrategy === "ZoraTimedSaleStrategy"
    ? timedSaleConfig
    : fixedPriceSaleConfig;
};

export default getSalesConfig;
