import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAirdropsApi } from "@/lib/airdrop/getAirdropsApi";
import { AirdropRecipient } from "@/types/airdrop";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const useAirdropRecipients = () => {
  const { artistWallet } = useUserProvider();

  const query = useQuery({
    queryKey: ["airdrop-recipients", artistWallet],
    queryFn: () => getAirdropsApi(artistWallet as Address),
    enabled: Boolean(artistWallet),
    staleTime: 60_000,
  });

  const recipients = useMemo(() => {
    const transfers = query.data?.transfers;
    if (!Array.isArray(transfers)) return [];

    // Get unique recipients by address
    const uniqueRecipients = new Map<string, AirdropRecipient>();

    transfers.forEach((airdrop) => {
      const rawAddress = airdrop?.collector?.address;
      if (typeof rawAddress !== "string" || rawAddress.length === 0) return;
      const address = rawAddress.toLowerCase();
      if (!uniqueRecipients.has(address)) {
        uniqueRecipients.set(address, {
          address: rawAddress,
          username: airdrop?.collector?.username || null,
        });
      }
    });

    return Array.from(uniqueRecipients.values());
  }, [query.data]);

  return {
    recipients,
    isLoading: query.isLoading || query.isPending,
    error: query.error instanceof Error ? query.error : null,
  };
};

export default useAirdropRecipients;
