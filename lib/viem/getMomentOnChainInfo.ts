import { getPublicClient } from "@/lib/viem/publicClient";
import {
  erc20MinterAddresses,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "@/lib/protocolSdk/constants";
import {
  erc20MinterABI,
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { MomentType, Moment } from "@/types/moment";

const getMomentOnChainInfo = async (moment: Moment) => {
  const { collectionAddress, tokenId, chainId } = moment;
  const publicClient: any = getPublicClient(chainId);
  const erc20SaleConfigCall = {
    address: erc20MinterAddresses[chainId as keyof typeof erc20MinterAddresses],
    abi: erc20MinterABI,
    functionName: "sale",
    args: [collectionAddress, tokenId],
  };
  const fixedSaleConfigCall = {
    address:
      zoraCreatorFixedPriceSaleStrategyAddress[
        chainId as keyof typeof zoraCreatorFixedPriceSaleStrategyAddress
      ],
    abi: zoraCreatorFixedPriceSaleStrategyABI,
    functionName: "sale",
    args: [collectionAddress, tokenId],
  };
  const uriCall = {
    address: collectionAddress,
    abi: zoraCreator1155ImplABI,
    functionName: "uri",
    args: [tokenId],
  };
  const ownerCall = {
    address: collectionAddress,
    abi: zoraCreator1155ImplABI,
    functionName: "owner",
    args: [],
  };

  const infoCalls = await publicClient.multicall({
    contracts: [erc20SaleConfigCall, fixedSaleConfigCall, uriCall, ownerCall],
  });

  const saleConfig =
    infoCalls[0]?.result?.saleEnd > BigInt(0)
      ? {
          ...infoCalls[0]?.result,
          type: MomentType.Erc20Mint,
        }
      : {
          ...infoCalls[1]?.result,
          type: MomentType.FixedPriceMint,
        };

  return {
    saleConfig,
    tokenUri: infoCalls[2].result,
    owner: infoCalls[3].result,
  };
};

export default getMomentOnChainInfo;
