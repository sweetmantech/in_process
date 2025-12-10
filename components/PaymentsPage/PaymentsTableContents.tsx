import { Table, TableBody } from "@/components/ui/table";
import PaymentRow from "./PaymentRow";
import PaymentsTableHeader from "./PaymentsTableHeader";
import FetchMore from "@/components/FetchMore";
import type { Payment, PaymentWithType } from "@/types/payments";

interface PaymentsTableContentsProps {
  payments: (Payment | PaymentWithType)[];
  fetchMore: () => void;
  hasNextPage: boolean;
}

const PaymentsTableContents = ({
  payments,
  fetchMore,
  hasNextPage,
}: PaymentsTableContentsProps) => {
  return (
    <div className="overflow-auto rounded-md border">
      <Table>
        <PaymentsTableHeader />
        <TableBody>
          {payments.map((payment) => (
            <PaymentRow
              key={"type" in payment ? `${payment.type}-${payment.id}` : payment.id}
              payment={payment}
            />
          ))}
        </TableBody>
      </Table>
      {hasNextPage && <FetchMore fetchMore={fetchMore} />}
    </div>
  );
};

export default PaymentsTableContents;
