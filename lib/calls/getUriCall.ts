import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Address } from "viem";

const getUriCall = (tokenContract: Address, tokenId: string) => ({
  address: tokenContract,
  abi: zoraCreator1155ImplABI,
  functionName: "uri",
  args: [tokenId],
});

export default getUriCall;
