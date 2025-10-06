"use client";

import PaymentsTable from "@/components/PaymentsPage/PaymentsTable";
import useSignedAddress from "@/hooks/useSignedAddress";

const Accounts = () => {
  const signedAddress = useSignedAddress();
  return (
    <main className="flex flex-col gap-24 font-archivo">
      <PaymentsTable limit={50} address={signedAddress} combined={true} />
    </main>
  );
};

export default Accounts;
