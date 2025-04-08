import {
  zoraCreator1155FactoryImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
  zoraCreator1155ImplABI,
} from "@zoralabs/protocol-deployments";
import { encodeEventTopics } from "viem";

export const SETUP_NEW_CONTRACT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreator1155FactoryImplABI,
  eventName: "SetupNewContract",
})[0];

export const SETUP_NEW_TOKEN_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreator1155ImplABI,
  eventName: "SetupNewToken",
})[0];

export const MINT_COMMENT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreatorFixedPriceSaleStrategyABI,
  eventName: "MintComment",
})[0];
