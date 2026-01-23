"use client";

import PaymentsTable from "@/components/PaymentsPage/PaymentsTable";
import { useUserProvider } from "@/providers/UserProvider";
import { WithdrawModal } from "@/components/PaymentsPage/WithdrawModal";
import SocialSmartWalletsBalancesProvider from "@/providers/SocialSmartWalletsBalancesProvider";

const PaymentsPage = () => {
  const { artistWallet } = useUserProvider();

  return (
    <main className="flex flex-col gap-4 font-archivo">
      <div className="flex justify-end">
        <SocialSmartWalletsBalancesProvider>
          <WithdrawModal />
        </SocialSmartWalletsBalancesProvider>
      </div>
      <PaymentsTable limit={50} address={artistWallet} combined={true} />
    </main>
  );
};

export default PaymentsPage;
