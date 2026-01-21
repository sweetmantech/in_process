import { Address } from "viem";
import { getPublicClient } from "../viem/publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { CHAIN_ID } from "../consts";

const getPermission = async (collection: Address, address: Address, chainId?: number) => {
  try {
    const publicClient = getPublicClient(chainId ?? CHAIN_ID);
    const permissionBit = await publicClient.readContract({
      address: collection,
      abi: zoraCreator1155ImplABI,
      functionName: "permissions",
      args: [BigInt(0), address],
    });

    return permissionBit;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getPermission;
