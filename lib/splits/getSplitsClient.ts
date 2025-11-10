import { SplitV2Client } from "@0xsplits/splits-sdk";
import { PublicClient } from "viem";

export const getSplitsClient = ({
  chainId,
  publicClient,
}: {
  chainId: number;
  publicClient: PublicClient;
}): SplitV2Client => {
  return new SplitV2Client({
    chainId,
    publicClient,
  });
};
