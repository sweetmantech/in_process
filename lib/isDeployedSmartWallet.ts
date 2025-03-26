import { Address } from "viem";
import { getPublicClient } from "./viem/publicClient";
import { ERC1967_IMPLEMENTATION_SLOT, NULL_DATA } from "./consts";

const isDeployedSmartWallet = async (smartWalletAddress: Address) => {
  const publicClient = getPublicClient();
  const data = await publicClient.getStorageAt({
    address: smartWalletAddress,
    slot: ERC1967_IMPLEMENTATION_SLOT,
  });
  const isDeployed = data !== NULL_DATA;

  return isDeployed;
};

export default isDeployedSmartWallet;
