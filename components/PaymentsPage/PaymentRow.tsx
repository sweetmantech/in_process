import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Payment, PaymentWithType } from "@/hooks/usePayments";
import MomentCell from "@/components/NotificationsPage/MomentCell";
import NotificationDateCell from "@/components/NotificationsPage/NotificationDateCell";
import BuyerCell from "./BuyerCell";

interface PaymentRowProps {
  payment: Payment | PaymentWithType;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
  // Check if this is a combined payment with type information
  const isCombinedPayment = "type" in payment;
  const isEarning = isCombinedPayment && payment.type === "earning";

  return (
    <TableRow className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <BuyerCell payment={payment} />

      <MomentCell token={payment.token} />

      <TableCell>
        <Badge
          variant="secondary"
          className={`font-mono ${
            isCombinedPayment
              ? isEarning
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : ""
          }`}
        >
          {isCombinedPayment ? (isEarning ? "+" : "-") : ""}${payment.amount}
        </Badge>
      </TableCell>

      <NotificationDateCell payment={payment} />
    </TableRow>
  );
};

export default PaymentRow;
