"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Fragment, useState } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import useWithdraw from "@/hooks/useWithdraw";
import { Address, isAddress } from "viem";
import { toast } from "sonner";
import { useSocialWalletBalanceProvider } from "@/providers/SocialWalletBalanceProvider";

type WithdrawCurrency = "usdc" | "eth";

export function Withdraw() {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [currency, setCurrency] = useState<WithdrawCurrency>("usdc");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const { connectedAddress } = useUserProvider();
  const { withdraw, isWithdrawing } = useWithdraw();
  const { getSocialWalletBalances } = useSocialWalletBalanceProvider();

  if (!connectedAddress) return <Fragment />;

  const handleWithdraw = async () => {
    if (!recipientAddress) {
      toast.error("Please enter a recipient address");
      return;
    }

    if (!isAddress(recipientAddress)) {
      toast.error("Please enter a valid recipient address");
      return;
    }

    await withdraw({
      currency,
      withdrawAmount,
      recipientAddress: recipientAddress as Address,
    });
    getSocialWalletBalances();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="font-archivo-bold text-grey-moss-900">Withdraw</CardTitle>
        <CardDescription className="font-spectral-italic text-grey-secondary">
          Enter the amount you want to withdraw
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="recipient-address" className="font-archivo-medium">
            Recipient Address
          </Label>
          <Input
            id="recipient-address"
            type="text"
            placeholder="0x..."
            className="font-spectral"
            onChange={(e) => setRecipientAddress(e.target.value)}
            value={recipientAddress}
          />
        </div>
        <div>
          <Label htmlFor="amount" className="font-archivo-medium">
            Amount
          </Label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="flex overflow-hidden border border-grey-secondary">
                <Input
                  id="withdraw-amount"
                  type="number"
                  inputMode="decimal"
                  step={currency === "usdc" ? "0.001" : "0.0001"}
                  className="flex-grow !rounded-[0px] !border-none bg-white !font-spectral [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  value={withdrawAmount}
                />
                <div className="bg-white">
                  <div className="my-2 h-6 w-[1px] bg-grey-secondary" />
                </div>
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value as WithdrawCurrency);
                  }}
                  className="flex h-auto min-w-[70px] cursor-pointer appearance-none items-center !rounded-[0px] !border-none bg-white px-3 py-0 text-center font-spectral focus:outline-none"
                >
                  <option value="usdc">USDC</option>
                  <option value="eth">ETH</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
          onClick={handleWithdraw}
          disabled={isWithdrawing}
        >
          {isWithdrawing ? "Withdrawing..." : "Withdraw"}
        </Button>
      </CardContent>
    </Card>
  );
}