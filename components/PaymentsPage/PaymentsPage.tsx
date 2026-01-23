"use client";

import PaymentsTable from "@/components/PaymentsPage/PaymentsTable";
import { useUserProvider } from "@/providers/UserProvider";
import { WithdrawModal } from "@/components/PaymentsPage/WithdrawModal";
import SocialSmartWalletsBalancesProvider from "@/providers/SocialSmartWalletsBalancesProvider";

const PaymentsPage = () => {
  const { artistWallet } = useUserProvider();

  return (
    <SocialSmartWalletsBalancesProvider>
      <main className="flex flex-col gap-4 font-archivo">
        <div className="flex justify-end">
          <WithdrawModal />
        </div>
        <PaymentsTable limit={50} address={artistWallet} combined={true} />
      </main>
    </SocialSmartWalletsBalancesProvider>
  );
};

export default PaymentsPage;
