import { Address, getAddress } from "viem";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import { getMomentApi } from "@/lib/moment/getMomentApi";
import { Moment } from "@/types/moment";

const useTokenInfo = (moment: Moment) => {
  const { artistWallet } = useUserProvider();

  const query = useQuery({
    queryKey: ["tokenInfo", moment.collectionAddress, moment.tokenId, moment.chainId],
    queryFn: () => getMomentApi(moment),
    enabled: Boolean(moment.collectionAddress && moment.tokenId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  const saleConfig = query.data?.saleConfig ?? null;
  const metadata = query.data?.metadata ?? null;
  const owner = query.data?.owner ?? null;
  const tokenUri = query.data?.uri ?? null;
  const tokenAdmins = query.data?.momentAdmins ?? null;

  const isSetSale = useMemo(() => {
    return saleConfig ? BigInt(saleConfig.saleEnd) > BigInt(0) : false;
  }, [saleConfig]);

  const isOwner = useMemo(() => {
    return Boolean(artistWallet && owner && getAddress(artistWallet) === getAddress(owner));
  }, [artistWallet, owner]);

  return {
    saleConfig: saleConfig
      ? {
          ...saleConfig,
          pricePerToken: BigInt(saleConfig.pricePerToken),
          saleStart: BigInt(saleConfig.saleStart),
          saleEnd: BigInt(saleConfig.saleEnd),
          maxTokensPerAddress: BigInt(saleConfig.maxTokensPerAddress),
        }
      : null,
    metadata,
    tokenUri,
    tokenAdmins,
    isLoading: query.isLoading,
    isSetSale,
    fetchTokenInfo: query.refetch,
    owner,
    isOwner,
  };
};

export default useTokenInfo;
