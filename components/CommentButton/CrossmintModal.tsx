import { FIXED_PRICE_SALE_STRATEGY_ADDRESS } from "@/lib/consts";
import { useTokenProvider } from "@/providers/TokenProvider";
import { CrossmintEmbeddedCheckout } from "@crossmint/client-sdk-react-ui";
import { useAccount } from "wagmi";

interface CrossmintModalProps {
  onClose: () => void;
}

export default function CrossmintModal({ onClose }: CrossmintModalProps) {
  const { comment, token } = useTokenProvider();
  const { address } = useAccount();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <CrossmintEmbeddedCheckout
          lineItems={{
            collectionLocator: "crossmint:182067fa-1ea5-4761-b7de-718f31825f93",
            callData: {
              _to: null, // This will be automatically handled by Crossmint
              _quantity: "1",
              _priceFixedSaleStrategy: "0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE",
              _tokenContract: "0xE1D50c3545EcB99bC396c91Df0C83507B1083399",
              _tokenId: "1",
              _comment: ""
            },
          }}
          payment={{
            crypto: { enabled: true },
            fiat: { enabled: true }
          }}
        />
      </div>
    </div>
  );
}
