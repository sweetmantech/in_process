import { zoraCreatorFixedPriceSaleStrategyABI } from "@zoralabs/protocol-deployments";
import { encodeEventTopics } from "viem";

const mintCommentEventTopics = (args: any = undefined) => {
  const event: any = {
    abi: zoraCreatorFixedPriceSaleStrategyABI,
    eventName: "MintComment",
  };
  if (args) event.args = args;

  return encodeEventTopics(event)[0];
};

export default mintCommentEventTopics;
