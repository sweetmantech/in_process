import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Payment, PaymentWithType } from "@/types/payments";
import MomentCell from "@/components/NotificationsPage/MomentCell";
import NotificationDateCell from "@/components/NotificationsPage/NotificationDateCell";
import BuyerCell from "./BuyerCell";
import usePaymentAmount from "@/hooks/usePaymentAmount";
import { usePaymentType } from "@/hooks/usePaymentType";

interface PaymentRowProps {
  payment: Payment | PaymentWithType;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
  const { isExpense } = usePaymentType(payment);
  const amount = usePaymentAmount(payment);
  return (
    <TableRow className="border border-transparent hover:border-b-grey-moss-200">
      <BuyerCell payment={payment} />
      <MomentCell moment={payment.moment} />
      <TableCell>
        <Badge
          variant="secondary"
          className={`font-mono ${
            isExpense
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {isExpense ? "+" : "-"}
          {amount}
        </Badge>
      </TableCell>
      <NotificationDateCell payment={payment} />
    </TableRow>
  );
};

export default PaymentRow;
