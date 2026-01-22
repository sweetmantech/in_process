"use client";

import PaymentsTable from "@/components/PaymentsPage/PaymentsTable";
import { useUserProvider } from "@/providers/UserProvider";
import { WithdrawModal } from "@/components/PaymentsPage/WithdrawModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SocialWalletBalanceProvider from "@/providers/SocialWalletBalanceProvider";

const Payments = () => {
  const { artistWallet } = useUserProvider();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <SocialWalletBalanceProvider>
      <main className="flex flex-col gap-4 font-archivo">
        <div className="flex justify-end">
          <Button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
          >
            Withdraw
          </Button>
        </div>
        <PaymentsTable limit={50} address={artistWallet} combined={true} />
        <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
      </main>
    </SocialWalletBalanceProvider>
  );
};

export default Payments;
