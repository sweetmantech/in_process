import { Address, encodeFunctionData } from "viem";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

const getUpdateTokenURICall = (
  tokenContractAddress: Address,
  tokenId: string,
  newMetadataUri: string
) => {
  return {
    to: tokenContractAddress,
    data: encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "updateTokenURI",
      args: [BigInt(tokenId), newMetadataUri],
    }),
  };
};

export default getUpdateTokenURICall;
