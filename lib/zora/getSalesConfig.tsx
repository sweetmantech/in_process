import { TimedSaleParamsType } from "@/lib/protocolSdk";
import { maxUint64, parseEther, parseUnits } from "viem";
import { USDC_ADDRESS } from "../consts";
import { MintType } from "@/types/zora";

const getSalesConfig = (
  saleStrategy: string,
  price: string,
  saleStart: Date | undefined
) => {
  const timedSaleConfig = {
    type: "timed",
    erc20Name: "CC0 Music",
    erc20Symbol: "CC0",
  } as TimedSaleParamsType;
  const erc20MintSaleConfig = {
    type: "erc20Mint",
    pricePerToken: parseUnits(price, 6).toString(),
    saleStart: saleStart
      ? BigInt(Number(saleStart.getTime() / 1000).toFixed(0)).toString()
      : BigInt(0).toString(),
    saleEnd: maxUint64.toString(),
    currency: USDC_ADDRESS,
  };
  const fixedPriceSaleConfig = {
    type: "fixedPrice",
    pricePerToken: parseEther(price).toString(),
    saleStart: saleStart
      ? BigInt(Number(saleStart.getTime() / 1000).toFixed(0)).toString()
      : BigInt(0).toString(),
    saleEnd: maxUint64.toString(),
  };

  if (price === "0") return fixedPriceSaleConfig;

  switch (saleStrategy) {
    case MintType.ZoraFixedPriceMint:
      return fixedPriceSaleConfig;
    case MintType.ZoraTimedMint:
      return timedSaleConfig;
    case MintType.ZoraErc20Mint:
      return erc20MintSaleConfig;
    default:
      return erc20MintSaleConfig;
  }
};

export default getSalesConfig;
