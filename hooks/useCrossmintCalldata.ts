import { useMemo } from "react";
import { MintType } from "@/types/zora";
import {
  erc20MinterAddresses,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "@/lib/protocolSdk/constants";
import {
  CHAIN_ID,
  ERC20_CROSSMINT_COLLECTION_ID,
  FIXED_PRICE_CROSSMINT_COLLECTION_ID,
} from "@/lib/consts";
import { useAccount } from "wagmi";
import { useTokenProvider } from "@/providers/TokenProvider";
import { Address, formatEther, formatUnits } from "viem";

const useCrossmintCalldata = () => {
  const { comment, token, saleConfig, mintCount } = useTokenProvider();
  const { address } = useAccount();

  const collectionLocator = useMemo(() => {
    if (!saleConfig) return;
    return saleConfig.type === MintType.ZoraErc20Mint
      ? ERC20_CROSSMINT_COLLECTION_ID
      : FIXED_PRICE_CROSSMINT_COLLECTION_ID;
  }, [saleConfig]);

  const callData = useMemo(() => {
    if (!saleConfig) return;
    if (saleConfig.type === MintType.ZoraErc20Mint)
      return {
        quantity: mintCount,
        erc20Minter: erc20MinterAddresses[CHAIN_ID],
        tokenContract: token.tokenContractAddress,
        tokenId: token.tokenId,
        comment,
        mintReferral: address as Address,
        totalPrice: formatUnits(saleConfig.pricePerToken * BigInt(mintCount), 6),
      };
    return {
      quantity: mintCount,
      priceFixedSaleStrategy:
        zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
      tokenContract: token.tokenContractAddress,
      tokenId: token.tokenId,
      comment,
      totalPrice: formatEther(saleConfig.pricePerToken * BigInt(mintCount)),
    };
  }, [saleConfig]);

  return {
    callData,
    collectionLocator,
  };
};

export default useCrossmintCalldata;
