import { publicClient } from "./publicClient";
import { COLLECTION_ADDRESS } from "../consts";
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
  timestamp: number;
};

export async function getMintCommentEvents(
  tokenId?: bigint
): Promise<MintCommentEvent[]> {
  try {
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

    const blocks = await Promise.all(
      logs.map((log) =>
        publicClient.getBlock({
          blockNumber: log.blockNumber!,
        })
      )
    );

    return logs.map((log, index) => ({
      tokenId: log.args.tokenId!,
      sender: log.args.sender!,
      comment: log.args.comment!,
      blockNumber: log.blockNumber!,
      transactionHash: log.transactionHash,
      timestamp: Number(blocks[index].timestamp) * 1000,
    }));
  } catch (error) {
    console.error("Error fetching MintComment events:", error);
    return [];
  }
}
