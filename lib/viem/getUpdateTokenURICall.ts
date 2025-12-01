import { encodeFunctionData } from "viem";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Moment } from "@/types/moment";

const getUpdateTokenURICall = (moment: Moment, newMetadataUri: string) => {
  return {
    to: moment.collectionAddress,
    data: encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "updateTokenURI",
      args: [BigInt(moment.tokenId), newMetadataUri],
    }),
  };
};

export default getUpdateTokenURICall;
