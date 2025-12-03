import { TableCell } from "@/components/ui/table";
import type { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";

interface NotificationDateCellProps {
  payment: InProcessPayment;
  className?: string;
}

const NotificationDateCell = ({ payment, className }: NotificationDateCellProps) => {
  const transferredAt = new Date(payment.transferred_at);

  return (
    <TableCell
      className={`text-sm text-neutral-600 dark:text-neutral-400 whitespace-normal break-words ${className || ""}`.trim()}
    >
      <div className="flex flex-col">
        <span>{transferredAt.toLocaleString()}</span>
        <a
          href={`https://basescan.org/tx/${payment.transaction_hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 underline"
        >
          See Transaction Details
        </a>
      </div>
    </TableCell>
  );
};

export default NotificationDateCell;
