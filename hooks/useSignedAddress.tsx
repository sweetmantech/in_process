import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount } from "wagmi";
import useConnectedWallet from "./useConnectedWallet";

const useSignedAddress = () => {
  const { context } = useFrameProvider();
  const { address } = useAccount();
  const { connectedWallet } = useConnectedWallet();

  return context ? address : connectedWallet;
};

export default useSignedAddress;
