import { createCreatorClient, CreatorClient } from "@/lib/protocolSdk";
import { getPublicClient } from "@/lib/viem/publicClient";

export const getCreatorClient = (chainId: number): CreatorClient => {
  const publicClient = getPublicClient(chainId);
  return createCreatorClient({ chainId, publicClient });
};
