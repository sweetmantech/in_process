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
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";

const useCrossmintCalldata = () => {
  const { token, saleConfig } = useTokenProvider();
  const { amountToCollect, comment } = useMomentCollectProvider();
  const { address } = useAccount();

  const collectionLocator = useMemo(() => {
    if (!saleConfig) return;
    return saleConfig.type === MintType.Erc20Mint
      ? ERC20_CROSSMINT_COLLECTION_ID
      : FIXED_PRICE_CROSSMINT_COLLECTION_ID;
  }, [saleConfig]);

  const callData = useMemo(() => {
    if (!saleConfig) return;
    if (saleConfig.type === MintType.Erc20Mint)
      return {
        quantity: amountToCollect,
        erc20Minter: erc20MinterAddresses[CHAIN_ID],
        tokenContract: token.tokenContractAddress,
        tokenId: token.tokenId,
        comment,
        mintReferral: address as Address,
        totalPrice: formatUnits(saleConfig.pricePerToken * BigInt(amountToCollect), 6),
      };
    return {
      quantity: amountToCollect,
      priceFixedSaleStrategy: zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
      tokenContract: token.tokenContractAddress,
      tokenId: token.tokenId,
      comment,
      totalPrice: formatEther(saleConfig.pricePerToken * BigInt(amountToCollect)),
    };
  }, [saleConfig]);

  return {
    callData,
    collectionLocator,
  };
};

export default useCrossmintCalldata;
