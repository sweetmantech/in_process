import { MomentSaleConfig } from "@/types/moment";
import { erc20MinterABI, zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Address, encodeAbiParameters, encodeFunctionData, parseAbiParameters } from "viem";
import { CHAIN_ID, USDC_ADDRESS } from "../consts";
import { MomentType } from "@/types/moment";
import {
  erc20MinterAddresses,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "../protocolSdk/constants";

const getCollectCall = (
  contractAddress: Address,
  tokenId: number,
  sale: MomentSaleConfig,
  account: Address,
  comment: string,
  amount: number
) => {
  const minterArguments = encodeAbiParameters(parseAbiParameters("address, string"), [
    account,
    comment,
  ]);

  const totalPrice = BigInt(sale.pricePerToken) * BigInt(amount);
  if (sale.type === MomentType.Erc20Mint) {
    return {
      to: erc20MinterAddresses[CHAIN_ID],
      data: encodeFunctionData({
        abi: erc20MinterABI,
        functionName: "mint",
        args: [
          account,
          BigInt(amount),
          contractAddress,
          BigInt(tokenId),
          totalPrice,
          USDC_ADDRESS[CHAIN_ID],
          account,
          comment,
        ],
      }),
    };
  }

  return {
    to: contractAddress,
    data: encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "mint",
      args: [
        zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
        BigInt(tokenId),
        BigInt(amount),
        [],
        minterArguments,
      ],
    }),
    value: totalPrice,
  };
};

export default getCollectCall;
