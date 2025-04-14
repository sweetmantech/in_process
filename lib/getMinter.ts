import { erc20MinterAddress } from "@zoralabs/protocol-deployments";
import { CHAIN_ID } from "./consts";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "./protocolSdk/constants";

const getMinter = (saleType: string) => {
  switch (saleType) {
    case "ZoraErc20Mint":
      return erc20MinterAddress[CHAIN_ID];
    case "ZoraFixedPriceMint":
      return zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID];
    default:
      return zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID];
  }
};

export default getMinter;
