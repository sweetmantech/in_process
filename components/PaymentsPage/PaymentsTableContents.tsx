import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaymentRow from "./PaymentRow";
import type { Payment } from "@/hooks/usePayments";

interface PaymentsTableContentsProps {
  payments: Payment[];
}

const PaymentsTableContents = ({ payments }: PaymentsTableContentsProps) => {
  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Buyer</TableHead>
            <TableHead>Moment</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Transaction</TableHead>
          </TableRow>
        </TableHeader>
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
