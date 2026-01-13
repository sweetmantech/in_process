import { useQuery } from "@tanstack/react-query";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMemo } from "react";
import { getAirdropsApi } from "@/lib/moment/getAirdropsApi";
import { AirdropRecipient } from "@/types/airdrop";

const useAirdropRecipients = () => {
  const { moment } = useMomentProvider();
  const { collectionAddress, tokenId, chainId } = moment;

  const query = useQuery({
    queryKey: ["airdrop-recipients", collectionAddress, tokenId, chainId],
    queryFn: () => getAirdropsApi(moment),
    enabled: Boolean(collectionAddress && tokenId && chainId),
    staleTime: 60_000,
  });

  const recipients = useMemo(() => {
    if (!query.data) return [];

    // Get unique recipients by address
    const uniqueRecipients = new Map<string, AirdropRecipient>();

    query.data.forEach((airdrop) => {
      const address = airdrop.recipient.address.toLowerCase();
      if (!uniqueRecipients.has(address)) {
        uniqueRecipients.set(address, {
          address: airdrop.recipient.address,
          username: airdrop.recipient.username || null,
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
