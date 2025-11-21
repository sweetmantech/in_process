import { Address } from "viem";

export const getMomentApi = async (tokenContract: Address, tokenId: string, chainId: number) => {
  const params = new URLSearchParams({
    tokenContract,
    tokenId,
    chainId: String(chainId),
  });
  const res = await fetch(`/api/moment?${params.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Failed to fetch moment info" }));
    throw new Error(error.error || "Failed to fetch moment info");
  }
  return res.json();
};
