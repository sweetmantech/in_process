import { Table, TableBody } from "@/components/ui/table";
import PaymentRow from "./PaymentRow";
import PaymentsTableHeader from "./PaymentsTableHeader";
import type { Payment } from "@/hooks/usePayments";

interface PaymentsTableContentsProps {
  payments: Payment[];
}

const PaymentsTableContents = ({ payments }: PaymentsTableContentsProps) => {
  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <PaymentsTableHeader />
        <TableBody>
          {payments.map((payment) => (
            <PaymentRow key={payment.id} payment={payment} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsTableContents;
