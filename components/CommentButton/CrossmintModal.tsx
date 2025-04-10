import { CHAIN_ID, CROSSMINT_COLLECTION_ID } from "@/lib/consts";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { CrossmintEmbeddedCheckout } from "@crossmint/client-sdk-react-ui";
import { Address, formatEther } from "viem";
import { useAccount } from "wagmi";

interface CrossmintModalProps {
  onClose: () => void;
}

export default function CrossmintModal({ onClose }: CrossmintModalProps) {
  const { comment, token, saleConfig } = useTokenProvider();
  const { address } = useAccount();
  const { email } = useUserProvider();
  const { data: sale } = saleConfig;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {sale && (
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator: CROSSMINT_COLLECTION_ID,
              callData: {
                quantity: 1,
                priceFixedSaleStrategy:
                  zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
                tokenContract: token.token.contract.address,
                tokenId: token.token.tokenId,
                comment,
                totalPrice: formatEther(BigInt(sale?.pricePerToken || 0)),
              },
            }}
            payment={{
              crypto: { enabled: false },
              fiat: { enabled: true },
            }}
            recipient={
              address
                ? { walletAddress: address as Address }
                : { email: email || "" }
            }
          />
        )}
      </div>
    </div>
  );
}
