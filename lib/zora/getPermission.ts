import { Address } from "viem";
import { getPublicClient } from "../viem/publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

const getPermission = async (collection: Address, address: Address) => {
  try {
    const publicClient = getPublicClient();
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
