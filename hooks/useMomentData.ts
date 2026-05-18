import { getAddress } from "viem";
import { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvider";
import { getMomentApi } from "@/lib/moment/getMomentApi";
import { Moment, MomentSaleConfig, Protocol } from "@/types/moment";
import useIsSoldOut from "./useIsSoldOut";

const COLLECT_PAGE_REGEX =
  /https?:\/\/[^/]+\/(collect|manage)\/(base|eth|bsep):(0x[0-9a-fA-F]{40})\/\d+/;

const useMomentData = (moment: Moment) => {
  const { collectionAddress, tokenId, chainId } = moment;
  const { artistWallet } = useUserProvider();
  const { isLoading: isCheckingSoldOut, data: isSoldOut } = useIsSoldOut(moment);
  const router = useRouter();

  const query = useQuery({
    queryKey: ["tokenInfo", collectionAddress, tokenId, chainId],
    queryFn: () => getMomentApi(moment),
    enabled: Boolean(collectionAddress && tokenId && chainId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 2,
  });

  const saleConfig = (query.data?.saleConfig as MomentSaleConfig) ?? null;
  const metadata = query.data?.metadata ?? null;
  const owner = query.data?.owner ?? null;
  const tokenUri = query.data?.uri ?? null;
  const momentAdmins = query.data?.momentAdmins ?? null;
  const protocol = query.data?.protocol ?? null;

  const isSetSale = useMemo(() => {
    return saleConfig ? BigInt(saleConfig.saleEnd) > BigInt(0) : false;
  }, [saleConfig]);

  const isOwner = useMemo(() => {
    return Boolean(artistWallet && owner && getAddress(artistWallet) === getAddress(owner));
  }, [artistWallet, owner]);

  const isSaleActive = useMemo(() => {
    if (!saleConfig) return false;
    const saleStartMs = saleConfig.saleStart * 1000;
    return saleStartMs < Date.now();
  }, [saleConfig]);

  const saleEndMs = useMemo(() => {
    return saleConfig?.saleEnd ? saleConfig.saleEnd * 1000 : 0;
  }, [saleConfig]);

  useEffect(() => {
    if (
      metadata?.content?.uri === "" &&
      metadata?.external_url &&
      COLLECT_PAGE_REGEX.test(metadata.external_url)
    ) {
      const targetPath = new URL(metadata.external_url, window.location.origin).pathname;
      if (targetPath !== window.location.pathname) {
        router.replace(metadata.external_url);
      }
    }
  }, [metadata, router]);

  return {
    saleConfig,
    protocol,
    metadata,
    tokenUri,
    momentAdmins,
    isLoading: query.isLoading || isCheckingSoldOut,
    isSetSale,
    fetchMomentData: query.refetch,
    owner,
    isOwner,
    isSaleActive,
    isSoldOut: isSoldOut || saleEndMs < Date.now() || protocol !== Protocol.InProcess,
  };
};

export default useMomentData;
