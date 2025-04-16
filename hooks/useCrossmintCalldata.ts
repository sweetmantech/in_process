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
  const { comment, token, saleConfig } = useTokenProvider();
  const { address } = useAccount();
  const { data: sale } = saleConfig;

  const collectionLocator = useMemo(() => {
    if (!sale) return;
    return sale.type === MintType.ZoraErc20Mint
      ? ERC20_CROSSMINT_COLLECTION_ID
      : FIXED_PRICE_CROSSMINT_COLLECTION_ID;
  }, [sale]);

  const callData = useMemo(() => {
    if (!sale) return;
    if (sale.type === MintType.ZoraErc20Mint)
      return {
        quantity: 1,
        erc20Minter: erc20MinterAddresses[CHAIN_ID],
        tokenContract: token.token.contract.address,
        tokenId: token.token.tokenId,
        comment,
        mintReferral: address as Address,
        totalPrice: formatUnits(BigInt(sale?.pricePerToken || 0), 6),
      };
    return {
      quantity: 1,
      priceFixedSaleStrategy:
        zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
      tokenContract: token.token.contract.address,
      tokenId: token.token.tokenId,
      comment,
      totalPrice: formatEther(BigInt(sale?.pricePerToken || 0)),
    };
  }, []);

  return {
    callData,
    collectionLocator,
  };
};

export default useCrossmintCalldata;
