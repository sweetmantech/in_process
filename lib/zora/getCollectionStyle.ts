import { Address, ContractFunctionExecutionError } from "viem";
import { getPublicClient } from "../viem/publicClient";
import { JSON_EXTENSION_REGISTRY } from "../consts";
import { jsonExtensionRegistryABI } from "../abis/jsonExtensionRegistryABI";
import fetchIpfs from "../ipfs/fetchIpfs";
import { CollectionStyle } from "@/types/zora";

export async function getCollectionStyle(
  chainId: number,
  collectionAddress: Address,
): Promise<CollectionStyle | null> {
  try {
    const client = getPublicClient(chainId);

    const jsonExtension = await client
      .readContract({
        address: JSON_EXTENSION_REGISTRY,
        abi: jsonExtensionRegistryABI,
        functionName: "getJSONExtension",
        args: [collectionAddress],
      })
      .catch((error) => {
        if (error instanceof ContractFunctionExecutionError) {
          console.log(
            "No JSON extension found for collection:",
            collectionAddress,
          );
          return null;
        }
        throw error;
      });

    if (!jsonExtension) return null;
    const style = await fetchIpfs(jsonExtension);
    return style;
  } catch (error) {
    console.error("Error fetching collection style:", error);
    return null;
  }
}

export default getCollectionStyle;
