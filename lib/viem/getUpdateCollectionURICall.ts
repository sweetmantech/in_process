import { encodeFunctionData } from "viem";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Address } from "viem";

interface Collection {
  address: Address;
  chainId: number;
}

const getUpdateCollectionURICall = (
  collection: Collection,
  newContractUri: string,
  newCollectionName: string
) => {
  return {
    to: collection.address,
    data: encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "updateContractMetadata",
      args: [newContractUri, newCollectionName],
    }),
  };
};

export default getUpdateCollectionURICall;
