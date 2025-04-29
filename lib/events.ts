import {
  erc20MinterABI,
  zoraCreator1155FactoryImplABI,
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
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

export const PURCHASED_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreator1155ImplABI,
  eventName: "Purchased",
})[0];

export const ERC20_MINT_COMMENT_EVENT_SIGNATURE = encodeEventTopics({
  abi: erc20MinterABI,
  eventName: "MintComment",
})[0];
