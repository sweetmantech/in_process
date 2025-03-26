import {
  zoraCreator1155FactoryImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { encodeEventTopics } from "viem";

export const SETUP_NEW_CONTRACT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreator1155FactoryImplABI,
  eventName: "SetupNewContract",
})[0];

export const MINT_COMMENT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreatorFixedPriceSaleStrategyABI,
  eventName: "MintComment",
})[0];
