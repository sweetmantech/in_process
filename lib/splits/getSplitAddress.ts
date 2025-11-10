import { CreateSplitV2Config } from "@0xsplits/splits-sdk";
import { Address } from "viem";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";

export const getSplitAddress = async (
  splitConfig: CreateSplitV2Config
): Promise<{ splitAddress: Address; splitExists: boolean }> => {
  const publicClient = getPublicClient(CHAIN_ID);
  const splitsClient = getSplitsClient({
    chainId: CHAIN_ID,
    publicClient,
  });

  const { splitAddress } = await splitsClient.predictDeterministicAddress(splitConfig);
  const { deployed } = await splitsClient.isDeployed(splitConfig);

  return { splitAddress, splitExists: deployed };
};
