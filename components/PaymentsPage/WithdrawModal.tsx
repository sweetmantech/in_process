"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWithdraw } from "@/hooks/useWithdraw";
import { TotalBalances } from "./TotalBalances";
import { WalletBalancesList } from "./WalletBalancesList";
import { WithdrawForm } from "./WithdrawForm";

export function WithdrawModal() {
  const { isOpen, setIsOpen } = useWithdraw();

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

      <DialogContent className="max-w-md z-[9999999] max-h-[90vh] flex flex-col">
        <DialogHeader className="space-y-1 flex-shrink-0">
          <DialogTitle className="text-lg font-archivo-bold text-grey-moss-900">
            Withdraw from Smart Wallet
          </DialogTitle>
          <DialogDescription className="text-xs font-spectral-italic text-grey-secondary">
            Withdraw funds from all social smart wallets connected to your artist wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto flex-1 min-h-0">
          <TotalBalances />
          <WithdrawForm />
          <WalletBalancesList />
        </div>
      </DialogContent>
    </Dialog>
  );
}
