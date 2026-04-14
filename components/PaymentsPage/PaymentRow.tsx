"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { PaymentTransferRow } from "@/types/payments";
import MomentCell from "@/components/NotificationsPage/MomentCell";
import NotificationDateCell from "@/components/NotificationsPage/NotificationDateCell";
import BuyerCell from "./BuyerCell";
import { getPaymentAmount } from "@/lib/payments/getPaymentAmount";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";
import { useUserProvider } from "@/providers/UserProvider";

interface PaymentRowProps {
  payment: PaymentTransferRow;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
  const { isExpense, paymentsTab } = usePaymentsProvider();
  const { artistWallet } = useUserProvider();
  const amount = getPaymentAmount(payment, artistWallet, paymentsTab);
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
