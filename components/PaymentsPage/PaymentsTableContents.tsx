import { Table, TableBody } from "@/components/ui/table";
import PaymentRow from "./PaymentRow";
import PaymentsTableHeader from "./PaymentsTableHeader";
import type { Payment, PaymentWithType } from "@/hooks/usePayments";

interface PaymentsTableContentsProps {
  payments: (Payment | PaymentWithType)[];
}

const PaymentsTableContents = ({ payments }: PaymentsTableContentsProps) => {
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
    </div>
  );
};

export default PaymentsTableContents;
