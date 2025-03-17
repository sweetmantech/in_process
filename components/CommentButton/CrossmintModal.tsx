import {
  zoraCreatorFixedPriceSaleStrategyAddress,
  IS_TESTNET,
  CHAIN_ID,
} from "@/lib/consts";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { CrossmintEmbeddedCheckout } from "@crossmint/client-sdk-react-ui";
import { Address } from "viem";
import { useAccount } from "wagmi";

interface CrossmintModalProps {
  onClose: () => void;
}

export default function CrossmintModal({ onClose }: CrossmintModalProps) {
  const { comment, token } = useTokenProvider();
  const { address } = useAccount();
  const { email } = useUserProvider();

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
            collectionLocator: "crossmint:4b386283-a16d-44a6-afcc-c44244643ecf",
            callData: {
              quantity: 1,
              priceFixedSaleStrategy:
                zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
              tokenContract: token.token.contract.address,
              tokenId: token.token.tokenId,
              comment,
              totalPrice: IS_TESTNET
                ? "0.000000111000000001"
                : "0.000111000000000001",
            },
          }}
          payment={{
            crypto: { enabled: true },
            fiat: { enabled: true },
          }}
          recipient={
            address
              ? { walletAddress: address as Address }
              : { email: email || "" }
          }
        />
      </div>
    </div>
  );
}
