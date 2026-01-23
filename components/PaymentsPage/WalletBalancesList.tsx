"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WalletBalanceCard } from "./WalletBalanceCard";
import { useSocialSmartWalletsBalancesProvider } from "@/providers/SocialSmartWalletsBalancesProvider";

export function WalletBalancesList() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, balances } = useSocialSmartWalletsBalancesProvider();

  if (isLoading) {
    return <p className="text-xs font-spectral text-grey-secondary">Loading wallet balances...</p>;
  }

  if (balances.length === 0) {
    return <p className="text-xs font-spectral text-grey-secondary">No wallet balances found</p>;
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-archivo-medium text-xs text-grey-moss-900 hover:text-grey-moss-700 transition-colors"
      >
        <span>see more wallet details</span>
        <ChevronDown
          className={`h-3 w-3 text-grey-secondary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {balances.map((balance, index) => (
            <WalletBalanceCard key={index} balance={balance} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
