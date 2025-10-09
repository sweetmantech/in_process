import fetchExternalWallets from "@/lib/fetchExternalWallets";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useExternalWallets(address?: Address) {
  return useQuery({
    queryKey: ["external_wallets", address],
    queryFn: () => fetchExternalWallets(address as Address),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(address),
    refetchOnMount: true,
  });
}
