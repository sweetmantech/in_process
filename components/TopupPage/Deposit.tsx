"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTopupProvider } from "@/providers/TopupProvider";
import { DepositCurrency } from "@/hooks/useTopup";

export function Deposit() {
  const {
    setDepositAmount,
    depositAmount,
    isDepositing,
    currency,
    setCurrency,
    hasExternalWallet,
    connectDisconnect,
    deposit,
  } = useTopupProvider();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="font-archivo-bold text-grey-moss-900">Deposit</CardTitle>
        <CardDescription className="font-spectral-italic text-grey-secondary">
          Enter the amount you want to deposit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="amount" className="font-archivo-medium">
            Amount
          </Label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="flex overflow-hidden border border-grey-secondary">
                <Input
                  id="deposit-amount"
                  type="number"
                  inputMode="decimal"
                  step={currency === "usdc" ? "0.001" : "0.0001"}
                  className="flex-grow !rounded-[0px] !border-none bg-white !font-spectral [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  onChange={(e) => setDepositAmount(e.target.value)}
                  value={depositAmount}
                />
                <div className="bg-white">
                  <div className="my-2 h-6 w-[1px] bg-grey-secondary" />
                </div>
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value as DepositCurrency);
                  }}
                  className="flex h-auto min-w-[70px] cursor-pointer appearance-none items-center !rounded-[0px] !border-none bg-white px-3 py-0 text-center font-spectral focus:outline-none"
                >
                  <option value="usdc">USDC</option>
                  <option value="eth">ETH</option>
                </select>
              </div>
            </div>
            <Button
              className="flex items-center gap-2 rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
              onClick={connectDisconnect}
            >
              {hasExternalWallet ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </div>
        {hasExternalWallet && (
          <Button
            className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
            onClick={deposit}
            disabled={isDepositing}
          >
            {isDepositing ? "Depositing..." : "Deposit"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
