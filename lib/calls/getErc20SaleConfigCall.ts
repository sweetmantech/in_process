import { erc20MinterABI } from "@zoralabs/protocol-deployments";
import { erc20MinterAddresses } from "../protocolSdk/constants";
import { Address } from "viem";

const getERC20SaleConfigCall = (
  tokenContract: Address,
  tokenId: string,
  chainId: number,
) => ({
  address: erc20MinterAddresses[chainId as keyof typeof erc20MinterAddresses],
  abi: erc20MinterABI,
  functionName: "sale",
  args: [tokenContract, tokenId],
});
export default getERC20SaleConfigCall;
