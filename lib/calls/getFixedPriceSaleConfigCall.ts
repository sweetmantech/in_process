import { Address } from "viem";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "../protocolSdk/constants";
import { zoraCreatorFixedPriceSaleStrategyABI } from "@zoralabs/protocol-deployments";

const getFixedPriceSaleConfigCall = (
  tokenContract: Address,
  tokenId: string,
  chainId: number,
) => ({
  address:
    zoraCreatorFixedPriceSaleStrategyAddress[
      chainId as keyof typeof zoraCreatorFixedPriceSaleStrategyAddress
    ],
  abi: zoraCreatorFixedPriceSaleStrategyABI,
  functionName: "sale",
  args: [tokenContract, tokenId],
});
export default getFixedPriceSaleConfigCall;
