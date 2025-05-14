import { Address } from "viem";
import { useState } from "react";
import getTokenInfo from "@/lib/viem/getTokenInfo";
import { useEffect } from "react";

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

  useEffect(() => {
    const init = async () => {
      const tokenInfo = await getTokenInfo(tokenContract, tokenId, chainId);
      setSaleConfig(tokenInfo.saleConfig);
      setIsSetSale(BigInt(tokenInfo.saleConfig.saleEnd) > BigInt(0));
      setTokenUri(tokenInfo.tokenUri);
      setIsLoading(false);
    };
    init();
  }, [tokenContract, tokenId]);

  return {
    saleConfig,
    tokenUri,
    isLoading,
    isSetSale,
  };
};

export default useTokenInfo;
