import { Address } from "viem";
import { useState } from "react";
import getTokenInfo from "@/lib/viem/getTokenInfo";
import { useEffect } from "react";

export type SaleConfig = {
  saleStart: string;
  saleEnd: string;
  maxTokensPerAddress: string;
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

  useEffect(() => {
    const init = async () => {
      const tokenInfo = await getTokenInfo(tokenContract, tokenId, chainId);
      setSaleConfig(tokenInfo.saleConfig);
      setTokenUri(tokenInfo.tokenUri);
      setIsLoading(false);
    };
    init();
  }, [tokenContract, tokenId]);

  return {
    saleConfig,
    tokenUri,
    isLoading,
  };
};

export default useTokenInfo;
