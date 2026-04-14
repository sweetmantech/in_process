"use client";

import TabButton from "@/components/MomentManagePage/TabButton";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";
const PaymentsTabs = () => {
  const { paymentsTab, setPaymentsTab } = usePaymentsProvider();

  return (
    <section className="w-full pb-2">
      <div className="flex gap-1 md:gap-4">
        <TabButton
          label="Income"
          active={paymentsTab === "income"}
          onClick={() => setPaymentsTab("income")}
        />
        <TabButton
          label="Expenses"
          active={paymentsTab === "expense"}
          onClick={() => setPaymentsTab("expense")}
        />
      </div>
    </section>
  );
};

export default PaymentsTabs;
