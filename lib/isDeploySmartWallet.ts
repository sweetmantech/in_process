import { Address } from "viem";
import { getPublicClient } from "./viem/publicClient";

const ERC1967_IMPLEMENTATION_SLOT =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const NULL_DATA =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const isDeployedSmartWallet = async (
  smartWalletAddress: Address,
  chainId: number,
) => {
  const publicClient = getPublicClient(chainId);
  const data = await publicClient.getStorageAt({
    address: smartWalletAddress,
    slot: ERC1967_IMPLEMENTATION_SLOT,
  });
  const isDeployed = data !== NULL_DATA;
  return isDeployed;
};

export default isDeployedSmartWallet;
