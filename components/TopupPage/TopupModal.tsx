import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { useTopupProvider } from "@/providers/TopupProvider";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { CHAIN_ID } from "@/lib/consts";

interface TopupModalProps {
  onClose: () => void;
}

export default function TopupModal({ onClose }: TopupModalProps) {
  const { smartWallet } = useSmartWalletProvider();
  const { currency, depositAmount } = useTopupProvider();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(smartWallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const currencyLabel = currency === "usdc" ? "USDC" : "ETH";
  const networkName = getViemNetwork(CHAIN_ID).name;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg relative max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-archivo-bold text-grey-moss-900 mb-2">
              Deposit {currencyLabel}
            </h2>
            <p className="text-sm text-grey-secondary font-archivo">
              Send {currencyLabel} directly to your smart wallet address
            </p>
          </div>

          <div className="p-4 bg-grey-moss-100 rounded-lg border border-grey-moss-200">
            <p className="text-xs text-grey-secondary mb-2 font-archivo-medium">WALLET ADDRESS</p>
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm font-spectral font-medium break-all text-grey-moss-900">
                {smartWallet}
              </code>
            </div>
          </div>

          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Address
              </>
            )}
          </Button>

          <div className="pt-4 border-t border-grey-moss-100 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-grey-secondary font-archivo">Network</span>
              <span className="font-archivo-medium text-grey-moss-900">{networkName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-grey-secondary font-archivo">Amount</span>
              <span className="font-archivo-medium text-grey-moss-900">
                {depositAmount} {currencyLabel}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-grey-secondary font-archivo">
              After sending {currencyLabel} to this address, your balance will update automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
