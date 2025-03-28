import { zoraCreator1155FactoryImplABI } from "@zoralabs/protocol-deployments";
import { encodeEventTopics } from "viem";

export const SETUP_NEW_CONTRACT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreator1155FactoryImplABI,
  eventName: "SetupNewContract",
})[0];
