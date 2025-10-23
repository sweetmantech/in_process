"use client";

import PaymentsTable from "@/components/PaymentsPage/PaymentsTable";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const Accounts = () => {
  const { artistWallet } = useUserProvider();
  return (
    <main className="flex flex-col gap-24 font-archivo">
      <PaymentsTable limit={50} address={artistWallet as Address} combined={true} />
    </main>
  );
};

export default Accounts;
