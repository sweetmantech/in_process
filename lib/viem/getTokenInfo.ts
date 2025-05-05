import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";
import {
  erc20MinterAddresses,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "@/lib/protocolSdk/constants";
import {
  erc20MinterABI,
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { Address } from "viem";
import { MintType } from "@/types/zora";

const getTokenInfo = async (tokenContract: Address, tokenId: string) => {
  const publicClient: any = getPublicClient(CHAIN_ID);
  const erc20SaleConfigCall = {
    address: erc20MinterAddresses[CHAIN_ID],
    abi: erc20MinterABI,
    functionName: "sale",
    args: [tokenContract, tokenId],
  };
  const fixedSaleConfigCall = {
    address: zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
    abi: zoraCreatorFixedPriceSaleStrategyABI,
    functionName: "sale",
    args: [tokenContract, tokenId],
  };
  const uriCall = {
    address: tokenContract,
    abi: zoraCreator1155ImplABI,
    functionName: "uri",
    args: [tokenId],
  };
  const infoCalls = await publicClient.multicall({
    contracts: [erc20SaleConfigCall, fixedSaleConfigCall, uriCall],
  });

  const saleConfig =
    infoCalls[0]?.result?.saleEnd > BigInt(0)
      ? {
          ...infoCalls[0]?.result,
          type: MintType.ZoraErc20Mint,
        }
      : {
          ...infoCalls[1]?.result,
          type: MintType.ZoraFixedPriceMint,
        };

  return {
    saleConfig,
    tokenUri: infoCalls[2].result,
  };
};

export default getTokenInfo;
