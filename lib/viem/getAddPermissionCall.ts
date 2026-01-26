import { Address } from "viem";
import { PERMISSION_BIT_ADMIN } from "../consts";
import { encodeFunctionData } from "viem";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

const getAddPermissionCall = (collectionAddress: Address, tokenId: string, account: Address) => {
  return {
    to: collectionAddress,
    data: encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "addPermission",
      args: [BigInt(tokenId), account, BigInt(PERMISSION_BIT_ADMIN)],
    }),
  };
};

export default getAddPermissionCall;
