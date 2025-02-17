import { FIXED_PRICE_SALE_STRATEGY_ADDRESS } from "@/lib/consts";
import { useTokenProvider } from "@/providers/TokenProvider";
import { CrossmintPayButton_DEPRECATED, CrossmintEmbeddedCheckout } from "@crossmint/client-sdk-react-ui";
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
            collectionLocator: "crossmint:f83e9991-d62a-4de8-a03f-7dad0d6c6fa8",
            callData: {
              totalPrice: "0.000111000000000001",
              minter: FIXED_PRICE_SALE_STRATEGY_ADDRESS,
              tokenId: 1,
              quantity: 1,
              rewardsRecipients: [address],
              minterArguments: "0x00000000000000000000000051027631b9def86e088c33368ec4e3a4be0ad264000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"
            },
          }}
          payment={{
            crypto: {
              enabled: true, // Enable crypto payments
            },
            fiat: {
              enabled: true, // Enable fiat payments
            },
          }}
          // mintConfig={{
          //   totalPrice: "0.000111000000000001",
          //   minter: FIXED_PRICE_SALE_STRATEGY_ADDRESS,
          //   tokenId: 1,
          //   quantity: 1,
          //   rewardsRecipients: [address],
          //   minterArguments: "0x00000000000000000000000051027631b9def86e088c33368ec4e3a4be0ad264000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"
          // }}
          // projectId=""
          // collectionId="f83e9991-d62a-4de8-a03f-7dad0d6c6fa8"
          // environment="staging"
          // paymentMethod="fiat"
        />
      </div>
    </div>
  );
}
