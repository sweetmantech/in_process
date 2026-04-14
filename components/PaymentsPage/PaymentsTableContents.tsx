"use client";

import { Table, TableBody } from "@/components/ui/table";
import PaymentRow from "./PaymentRow";
import PaymentsTableHeader from "./PaymentsTableHeader";
import FetchMore from "@/components/FetchMore";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";

const PaymentsTableContents = () => {
  const { payments, fetchMore, hasNextPage, paymentsTab } = usePaymentsProvider();

  return (
    <div className="overflow-auto rounded-md border">
      <Table>
        <PaymentsTableHeader counterpartyLabel={paymentsTab === "income" ? "Buyer" : "Seller"} />
        <TableBody>
          {payments.map((payment) => (
            <PaymentRow key={String(payment.id)} payment={payment} />
          ))}
        </TableBody>
      </Table>
      {hasNextPage && <FetchMore fetchMore={fetchMore} />}
    </div>
  );
};

export default PaymentsTableContents;
