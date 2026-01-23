"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useWithdraw } from "@/hooks/useWithdraw";
import { Currency } from "@/types/balances";

export function WithdrawForm() {
  const {
    recipientAddress,
    setRecipientAddress,
    withdrawAmount,
    setWithdrawAmount,
    currency,
    setCurrency,
    withdraw,
    isWithdrawing,
    setMax,
  } = useWithdraw();
  return (
    <div className="space-y-2">
      <div>
        <Label htmlFor="recipient-address" className="text-[10px] font-archivo-medium">
          Recipient Address
        </Label>
        <Input
          id="recipient-address"
          type="text"
          placeholder="0x..."
          className="font-spectral mt-0.5 h-7 text-xs px-2.5"
          onChange={(e) => setRecipientAddress(e.target.value)}
          value={recipientAddress}
        />
      </div>
      <div>
        <Label htmlFor="withdraw-amount" className="text-[10px] font-archivo-medium">
          Amount
        </Label>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="relative flex-1">
            <div className="flex overflow-hidden border border-grey-secondary">
              <Input
                id="withdraw-amount"
                type="number"
                inputMode="decimal"
                step={currency === "usdc" ? "0.001" : "0.0001"}
                className="flex-grow !rounded-[0px] !border-none bg-white !font-spectral h-7 text-xs px-2.5 [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onChange={(e) => setWithdrawAmount(e.target.value)}
                value={withdrawAmount}
              />
              <div className="bg-white">
                <div className="my-1 h-4 w-[1px] bg-grey-secondary" />
              </div>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value as Currency);
                }}
                className="flex h-7 min-w-[55px] cursor-pointer appearance-none items-center !rounded-[0px] !border-none bg-white px-1.5 py-0 text-[10px] text-center font-spectral focus:outline-none"
              >
                <option value="usdc">USDC</option>
                <option value="eth">ETH</option>
              </select>
            </div>
          </div>
          <Button
            type="button"
            onClick={setMax}
            className="h-7 px-2 text-[10px] font-spectral-italic text-grey-secondary hover:text-grey-moss-900 border border-grey-secondary rounded bg-white hover:bg-grey-eggshell transition-colors"
          >
            Max
          </Button>
        </div>
      </div>
      <Button
        className="flex w-full items-center justify-center gap-1.5 rounded-md bg-grey-moss-900 px-2.5 py-1 text-xs font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
        onClick={withdraw}
        disabled={!withdrawAmount || !recipientAddress || isWithdrawing}
      >
        {isWithdrawing ? "Withdrawing..." : "Withdraw"}
      </Button>
    </div>
  );
}
