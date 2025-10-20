"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useTopupProvider } from "@/providers/TopupProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

const TopupModal = dynamic(() => import("./TopupModal"), {
  loading: () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg font-archivo">Loading topup options...</div>
    </div>
  ),
  ssr: false,
});

export function Deposit() {
  const [isOpenTopupModal, setIsOpenTopupModal] = useState<boolean>(false);
  const { setDepositAmount, depositAmount, isDepositing, setIsDepositing } = useTopupProvider();
  const { fetchSmartWallet } = useSmartWalletProvider();

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-archivo-bold text-grey-moss-900">Deposit USDC</CardTitle>
          <CardDescription className="font-spectral-italic text-grey-secondary">
            Enter the amount you want to deposit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount" className="font-archivo-medium">
              Amount
            </Label>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <div className="flex overflow-hidden border border-grey-secondary">
                  <Input
                    id="deposit-amount"
                    type="number"
                    inputMode="decimal"
                    min="0.111"
                    step="0.001"
                    className="flex-grow !font-spectral !rounded-[0px] !border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    onChange={(e) => setDepositAmount(e.target.value)}
                    value={depositAmount}
                  />
                  <div className="bg-white">
                    <div className="w-[1px] h-6 bg-grey-secondary my-2" />
                  </div>
                  <p className="bg-white px-3 font-spectral !rounded-[0px] !border-none min-w-[70px] text-center appearance-none cursor-pointer h-auto py-0 flex items-center">
                    USDC
                  </p>
                </div>
              </div>
              <Button
                className="px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
                onClick={() => setIsOpenTopupModal(true)}
                disabled={isDepositing || Number(depositAmount) < 0.11}
              >
                Deposit
              </Button>
            </div>
          </div>
          <p className="text-xs text-grey-secondary font-archivo">Minimum deposit: 0.11 USDC</p>
        </CardContent>
      </Card>
      {isOpenTopupModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <TopupModal
            onClose={() => {
              setIsOpenTopupModal(false);
              setIsDepositing(false);
              setDepositAmount("0.111");
              fetchSmartWallet();
            }}
          />
        </Suspense>
      )}
    </>
  );
}
