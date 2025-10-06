import { Address, getAddress } from "viem";
import { useCallback, useMemo, useState } from "react";
import getTokenInfo from "@/lib/viem/getTokenInfo";
import { useEffect } from "react";
import { useUserProvider } from "@/providers/UserProvider";

export type SaleConfig = {
  saleStart: bigint;
  saleEnd: bigint;
  maxTokensPerAddress: bigint;
  pricePerToken: bigint;
  fundsRecipient: Address;
  type: string;
};

const useTokenInfo = (
  tokenContract: Address,
  tokenId: string,
  chainId: number,
) => {
  const [saleConfig, setSaleConfig] = useState<SaleConfig | null>(null);
  const [tokenUri, setTokenUri] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSetSale, setIsSetSale] = useState<boolean>(false);
  const [owner, setOwner] = useState<Address | null>(null);
  const { connectedAddress } = useUserProvider();

  const isOwner = useMemo(() => {
    return Boolean(
      connectedAddress &&
        owner &&
        getAddress(connectedAddress) === getAddress(owner),
    );
  }, [connectedAddress, owner]);

  const fetchTokenInfo = useCallback(async () => {
    const tokenInfo = await getTokenInfo(tokenContract, tokenId, chainId);
    setSaleConfig(tokenInfo.saleConfig);
    setOwner(tokenInfo.owner);
    setIsSetSale(BigInt(tokenInfo.saleConfig.saleEnd) > BigInt(0));
    setTokenUri(tokenInfo.tokenUri);
    setIsLoading(false);
  }, [tokenContract, tokenId]);

  useEffect(() => {
    fetchTokenInfo();
  }, [fetchTokenInfo]);

  return {
    saleConfig,
    tokenUri,
    isLoading,
    isSetSale,
    fetchTokenInfo,
    owner,
    isOwner,
  };
};

export default useTokenInfo;
