import { TOPUP_CROSSMINT_COLLECTION_ID } from "@/lib/consts";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { useTopupProvider } from "@/providers/TopupProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { CrossmintEmbeddedCheckout } from "@crossmint/client-sdk-react-ui";
import { Address } from "viem";

interface TopupModalProps {
  onClose: () => void;
}

export default function TopupModal({ onClose }: TopupModalProps) {
  const { smartWallet } = useSmartWalletProvider();
  const { email } = useUserProvider();
  const { callData } = useTopupProvider();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator: TOPUP_CROSSMINT_COLLECTION_ID,
              callData,
            }}
            payment={{
              crypto: { enabled: false },
              fiat: { enabled: true },
            }}
            recipient={
              smartWallet ? { walletAddress: smartWallet as Address } : { email: email || "" }
            }
          />
        }
      </div>
    </div>
  );
}
