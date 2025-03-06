import { FixedPriceParamsType, TimedSaleParamsType } from "@/lib/protocolSdk";
import { maxUint64, parseEther } from "viem";

const getSalesConfig = (saleStrategy: string, price: string) => {
  const timedSaleConfig = {
    type: "timed",
    erc20Name: "CC0 Music",
    erc20Symbol: "CC0",
  } as TimedSaleParamsType;
  const fixedPriceSaleConfig = {
    type: "fixedPrice",
    pricePerToken: parseEther(price),
    saleEnd: maxUint64,
  } as FixedPriceParamsType;
  return saleStrategy === "ZoraTimedSaleStrategy"
    ? timedSaleConfig
    : fixedPriceSaleConfig;
};

export default getSalesConfig;
