import useConnectedWallet from "@/hooks/useConnectedWallet";
import useCrossmintCalldata from "@/hooks/useCrossmintCalldata";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { CrossmintEmbeddedCheckout } from "@crossmint/client-sdk-react-ui";
import { Address } from "viem";
import { useAccount } from "wagmi";

interface CrossmintModalProps {
  onClose: () => void;
}

export default function CrossmintModal({ onClose }: CrossmintModalProps) {
  const { address } = useAccount();
  const { connectedWallet } = useConnectedWallet();
  const { email } = useUserProvider();
  const { callData, collectionLocator } = useCrossmintCalldata();
  const { context } = useFrameProvider();
  const signedAddress = context ? address : connectedWallet;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {collectionLocator && callData && (signedAddress || email) && (
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator,
              callData,
            }}
            payment={{
              crypto: { enabled: false },
              fiat: { enabled: true },
            }}
            recipient={
              signedAddress
                ? { walletAddress: signedAddress as Address }
                : { email: email || "" }
            }
          />
        )}
      </div>
    </div>
  );
}
