"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSocialWalletBalanceProvider } from "@/providers/SocialWalletBalanceProvider";
import { useWithdraw, type WithdrawCurrency } from "@/hooks/useWithdraw";

export function WithdrawModal() {
  const {
    smartWallet,
    smartWalletIsLoading: isLoading,
    smartWalletBalance: usdcBalance,
    smartWalletEthBalance: ethBalance,
  } = useSocialWalletBalanceProvider();

  const {
    withdrawAmount,
    setWithdrawAmount,
    currency,
    setCurrency,
    recipientAddress,
    setRecipientAddress,
    isOpen,
    setIsOpen,
    withdraw,
    isWithdrawing,
  } = useWithdraw();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
        >
          Withdraw
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-archivo-bold text-grey-moss-900">
            Withdraw from Smart Wallet
          </DialogTitle>
          <DialogDescription className="font-spectral-italic text-grey-secondary">
            Withdraw funds from your smart wallet connected to your social wallet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Balance Display */}
          <div className="space-y-3">
            <h3 className="font-archivo-medium text-grey-moss-900">Current Balances</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-sm font-spectral-italic text-grey-secondary">ETH Balance</p>
                    <p className="text-lg font-archivo-bold text-grey-moss-900">
                      {isLoading ? "Loading..." : `${ethBalance} ETH`}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-sm font-spectral-italic text-grey-secondary">USDC Balance</p>
                    <p className="text-lg font-archivo-bold text-grey-moss-900">
                      {isLoading ? "Loading..." : `${usdcBalance} USDC`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            {smartWallet && (
              <p className="text-xs font-spectral text-grey-secondary">
                Smart Wallet: {smartWallet}
              </p>
            )}
          </div>

          {/* Withdraw Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient-address" className="font-archivo-medium">
                Recipient Address
              </Label>
              <Input
                id="recipient-address"
                type="text"
                placeholder="0x..."
                className="font-spectral mt-1"
                onChange={(e) => setRecipientAddress(e.target.value)}
                value={recipientAddress}
              />
            </div>
            <div>
              <Label htmlFor="withdraw-amount" className="font-archivo-medium">
                Amount
              </Label>
              <div className="flex items-center gap-2 mt-1">
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
              onClick={withdraw}
              disabled={!withdrawAmount || !recipientAddress || isWithdrawing}
            >
              {isWithdrawing ? "Withdrawing..." : "Withdraw"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
