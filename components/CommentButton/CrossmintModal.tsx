import { FIXED_PRICE_SALE_STRATEGY_ADDRESS, IS_TESTNET } from "@/lib/consts";
import { useTokenProvider } from "@/providers/TokenProvider";
import {
  CrossmintEmbeddedCheckout,
  useCrossmintCheckout,
} from "@crossmint/client-sdk-react-ui";
import { useEffect } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

interface CrossmintModalProps {
  onClose: () => void;
}

export default function CrossmintModal({ onClose }: CrossmintModalProps) {
  const { comment, token, refetch } = useTokenProvider();
  const { address } = useAccount();
  const { order } = useCrossmintCheckout();

  useEffect(() => {
    if (order?.phase === "completed") refetch();
    // eslint-disable-next-line
  }, [order]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {address && (
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator:
                "crossmint:4b386283-a16d-44a6-afcc-c44244643ecf",
              callData: {
                quantity: 1,
                priceFixedSaleStrategy: FIXED_PRICE_SALE_STRATEGY_ADDRESS,
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
            recipient={{
              walletAddress: address as Address,
            }}
          />
        )}
      </div>
    </div>
  );
}
