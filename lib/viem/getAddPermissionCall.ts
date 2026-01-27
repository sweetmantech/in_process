import { Address } from "viem";
import { PERMISSION_BIT_ADMIN } from "../consts";
import { encodeFunctionData } from "viem";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Moment } from "@/types/moment";

const getAddPermissionCall = (moment: Moment, account: Address) => {
  return {
    to: moment.collectionAddress,
    data: encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "addPermission",
      args: [BigInt(moment.tokenId), account, BigInt(PERMISSION_BIT_ADMIN)],
    }),
  };
};

export default getAddPermissionCall;
