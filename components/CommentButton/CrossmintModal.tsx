import { useTokenProvider } from "@/providers/TokenProvider";
import { CrossmintEmbeddedCheckout  } from "@crossmint/client-sdk-react-ui";

interface CrossmintModalProps {
  onClose: () => void;
}

export default function CrossmintModal({ onClose }: CrossmintModalProps) {
  const { comment, token } = useTokenProvider();
  
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
            collectionLocator: `crossmint:781d9202-0f92-4dab-94f7-9b68cabe9dec`,
            callData: {
              totalPrice: "0.000111000000000001",
              _priceFixedSaleStrategy: "0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE",
              _quantity: 1,
              _to: "0x51027631B9DEF86e088C33368eC4E3A4BE0aD264",
              _target: "0xc8f78a0b645215ec6a5d79a1038843ae7a95c9f7",
              _tokenId: 1
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
        />
      </div>
    </div>
  );
}
