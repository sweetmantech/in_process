import { Address, encodeFunctionData } from "viem";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

const getUpdateContractMetadataCall = (
  tokenContractAddress: Address,
  newMetadataUri: string,
  contractName: string
) => {
  return {
    to: tokenContractAddress,
    data: encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "updateContractMetadata",
      args: [newMetadataUri, contractName],
    }),
  };
};

export default getUpdateContractMetadataCall;
