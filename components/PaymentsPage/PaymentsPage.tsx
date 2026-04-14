"use client";

import PaymentsTable from "@/components/PaymentsPage/PaymentsTable";
import PaymentsTabs from "@/components/PaymentsPage/PaymentsTabs";
import { useUserProvider } from "@/providers/UserProvider";
import { WithdrawModal } from "@/components/PaymentsPage/WithdrawModal";
import SocialSmartWalletsBalancesProvider from "@/providers/SocialSmartWalletsBalancesProvider";
import PaymentsPageSkeleton from "./PaymentsPageSkeleton";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { PaymentsProvider } from "@/providers/PaymentsProvider";

const PaymentsPage = () => {
  const { artistWallet, artistWalletLoaded } = useUserProvider();

  if (!artistWalletLoaded) return <PaymentsPageSkeleton />;
  if (!artistWallet) return <SignToInProcess />;

  return (
    <PaymentsProvider>
      <main className="flex flex-col gap-4 font-archivo">
        <div className="flex justify-end">
          <SocialSmartWalletsBalancesProvider>
            <WithdrawModal />
          </SocialSmartWalletsBalancesProvider>
        </div>
        <PaymentsTabs />
        <PaymentsTable />
      </main>
    </PaymentsProvider>
  );
};

export default PaymentsPage;
