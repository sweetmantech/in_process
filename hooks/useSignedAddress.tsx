import { useFrameProvider } from "@/providers/FrameProvider";
import { Address } from "viem";
import { useAccount } from "wagmi";
import useConnectedWallet from "./useConnectedWallet";

const useSignedAddress = () => {
  const { context } = useFrameProvider();
  const { address } = useAccount();
  const { connectedWallet } = useConnectedWallet();

  return context ? (address as Address) : (connectedWallet as Address);
};

export default useSignedAddress;
