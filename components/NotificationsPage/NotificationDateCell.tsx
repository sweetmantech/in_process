import { TableCell } from "@/components/ui/table";
import type { InProcessPayment } from "@/types/payments";

interface NotificationDateCellProps {
  payment: InProcessPayment;
  className?: string;
}

const NotificationDateCell = ({ payment, className }: NotificationDateCellProps) => {
  const transferredAt = new Date(payment.transferred_at);

  return (
    <TableCell
      className={`whitespace-normal break-words text-sm text-neutral-600 dark:text-neutral-400 ${className || ""}`.trim()}
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
