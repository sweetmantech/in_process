import { Address, encodeAbiParameters, parseAbiParameters } from "viem";
import { IS_TESTNET } from "@/lib/consts";
import { z } from "zod";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";

import { mintCommentSchema } from "../coinbase/mintCommentSchema";
import { base, baseSepolia } from "viem/chains";

export type MintMomentInput = z.infer<typeof mintCommentSchema>;

export async function mintWithComment({ token, to, comment, amount }: MintMomentInput) {
  const minterArguments = encodeAbiParameters(parseAbiParameters("address, string"), [
    to as Address,
    comment,
  ]);
  return {
    parameters: {
      address: token.tokenContractAddress,
      abi: zoraCreator1155ImplABI,
      args: [
        zoraCreatorFixedPriceSaleStrategyAddress[IS_TESTNET ? baseSepolia.id : base.id],
        token.tokenId,
        amount,
        [],
        minterArguments,
      ],
    },
  };
}
