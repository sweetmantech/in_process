import { TableCell } from "@/components/ui/table";
import { useBlock } from "@/hooks/useBlock";
import type { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";
import { Skeleton } from "@/components/ui/skeleton";

interface NotificationDateCellProps {
  payment: InProcessPayment;
  className?: string;
}

const NotificationDateCell = ({
  payment,
  className,
}: NotificationDateCellProps) => {
  const { data: blockTime, isLoading } = useBlock(
    payment.block,
    payment.token.chainId
  );

  return (
    <TableCell
      className={`text-sm text-neutral-600 dark:text-neutral-400 whitespace-normal break-words ${className || ""}`.trim()}
    >
      <div className="flex flex-col">
        {isLoading ? (
          <Skeleton className="h-4 w-32 mb-1" />
        ) : (
          <span>{blockTime ? blockTime.toLocaleString() : ""}</span>
        )}
        <a
          href={`https://basescan.org/tx/${payment.hash}`}
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
