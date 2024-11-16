import { publicClient } from "./publicClient";
import { COLLECTION_ADDRESS } from "../consts";
import { parseAbiItem } from "viem";
import {
  zoraTimedSaleStrategyABI,
  zoraTimedSaleStrategyAddress,
} from "@zoralabs/protocol-deployments";
import { baseSepolia } from "viem/chains";

export type MintCommentEvent = {
  tokenId: bigint;
  sender: string;
  comment: string;
  blockNumber: bigint;
  transactionHash: string;
};

export async function getMintCommentEvents(
  tokenId?: bigint
): Promise<MintCommentEvent[]> {
  try {
    console.log("publicClient", publicClient);
    console.log(zoraTimedSaleStrategyAddress[baseSepolia.id]);
    const logs = await publicClient.getContractEvents({
      abi: zoraTimedSaleStrategyABI,
      eventName: "MintComment",
      address: zoraTimedSaleStrategyAddress[baseSepolia.id],
      fromBlock: "earliest",
      args: {
        tokenId: tokenId,
        collection: COLLECTION_ADDRESS,
      },
    });
    console.log("LOGS", logs);

    return logs.map((log) => ({
      tokenId: log.args.tokenId!,
      sender: log.args.sender!,
      comment: log.args.comment!,
      blockNumber: log.blockNumber!,
      transactionHash: log.transactionHash,
    }));
  } catch (error) {
    console.error("Error fetching MintComment events:", error);
    return [];
  }
}
