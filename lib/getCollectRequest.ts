import { SaleConfig } from "@/hooks/useTokenInfo";
import { TokenInfo } from "@/types/token";
import {
  erc20MinterABI,
  zoraCreator1155ImplABI,
} from "@zoralabs/protocol-deployments";
import { Address, encodeAbiParameters, parseAbiParameters } from "viem";
import { CHAIN, CHAIN_ID, USDC_ADDRESS } from "./consts";
import { MintType } from "@/types/zora";
import {
  erc20MinterAddresses,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "./protocolSdk/constants";

const getCollectRequest = (
  token: TokenInfo,
  sale: SaleConfig | undefined,
  account: Address,
  comment: string,
  mintAmount: number = 1
) => {
  if (!sale) return null;

  const minterArguments = encodeAbiParameters(
    parseAbiParameters("address, string"),
    [account as Address, comment]
  );

  if (sale.type === MintType.ZoraErc20Mint)
    return {
      address: erc20MinterAddresses[CHAIN_ID],
      account: account,
      abi: erc20MinterABI,
      functionName: "mint",
      args: [
        account,
        mintAmount,
        token.tokenContractAddress,
        token.tokenId,
        sale.pricePerToken * BigInt(mintAmount),
        USDC_ADDRESS,
        account,
        comment,
      ],
      chain: CHAIN,
    };
  return {
    address: token.tokenContractAddress,
    account: account as Address,
    abi: zoraCreator1155ImplABI as any,
    functionName: "mint",
    args: [
      zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
      BigInt(token.tokenId),
      BigInt(mintAmount),
      [],
      minterArguments,
    ],
    chain: CHAIN,
    value: sale.pricePerToken * BigInt(mintAmount),
  };
};

export default getCollectRequest;
