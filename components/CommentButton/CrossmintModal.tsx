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
            // collectionLocator: "crossmint:4b386283-a16d-44a6-afcc-c44244643ecf",
            // callData: {
            //   to: address,
            //   quantity: "1",
            //   priceFixedSaleStrategy:
            //     "0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE",
            //   tokenContract: token.token.contract.address,
            //   tokenId: "1",
            //   comment,
            //   totalPrice: "0.000111000000000001"
            // },


            collectionLocator: "crossmint:061b834c-1b2f-4803-8236-5e931b8f6ef4",
            callData: {
              to: null,
              totalPrice: "0.000000111000000001",
              minter: FIXED_PRICE_SALE_STRATEGY_ADDRESS,
              tokenId: 1,
              quantity: 1,
              rewardsRecipients: [address],
              minterArguments: "0x00000000000000000000000051027631b9def86e088c33368ec4e3a4be0ad264000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"
            },
          }}
          payment={{
            crypto: { enabled: true },
            fiat: { enabled: true },
          }}
        />
      </div>
    </div>
  );
}
