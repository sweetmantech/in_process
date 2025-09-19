import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import truncateAddress from "@/lib/truncateAddress";
import type { Payment, PaymentWithType } from "@/hooks/usePayments";
import { useBlock } from "@/hooks/useBlock";
import PaymentsTableMomentCell from "./PaymentsTableMomentCell";

interface PaymentRowProps {
  payment: Payment | PaymentWithType;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
  const txUrl = `https://basescan.org/tx/${payment.hash}`;
  const { data: blockTime } = useBlock(payment.block, payment.token.chainId);

  // Check if this is a combined payment with type information
  const isCombinedPayment = "type" in payment;
  const isEarning = isCombinedPayment && payment.type === "earning";
  const isExpense = isCombinedPayment && payment.type === "expense";

  return (
    <TableRow className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <TableCell className="font-medium">
        <div className="flex flex-col">
          {isCombinedPayment ? (
            <div className="flex items-center gap-2">
              <Badge
                variant={isEarning ? "default" : "secondary"}
                className={`text-xs ${
                  isEarning
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {isEarning ? "Earning" : "Expense"}
              </Badge>
              <span className="text-sm font-archivo-medium">
                {isEarning
                  ? payment.buyer.username ||
                    truncateAddress(payment.buyer.address)
                  : payment.token.defaultAdmin
                    ? truncateAddress(payment.token.defaultAdmin)
                    : "Unknown"}
              </span>
            </div>
          ) : (
            <span className="text-sm font-archivo-medium">
              {payment.buyer.username || truncateAddress(payment.buyer.address)}
            </span>
          )}
          <span className="text-xs text-neutral-500">
            {isCombinedPayment && isExpense
              ? payment.token.defaultAdmin || "Unknown"
              : truncateAddress(payment.buyer.address)}
          </span>
        </div>
      </TableCell>

      <PaymentsTableMomentCell payment={payment} />

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

      <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex flex-col">
          <span>
            {blockTime ? blockTime.toLocaleString() : `Block #${payment.block}`}
          </span>
          <span className="text-xs text-neutral-500">
            Block #{payment.block}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <a
          href={txUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-mono"
        >
          {truncateAddress(payment.hash)}
        </a>
      </TableCell>
    </TableRow>
  );
};

export default PaymentRow;
