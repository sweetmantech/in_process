import { TableCell, TableRow } from "@/components/ui/table";
import type { Notification } from "@/hooks/useNotifications";
import { useBlock } from "@/hooks/useBlock";
import MomentCell from "./MomentCell";

interface NotificationRowProps {
  notification: Notification;
}

const NotificationRow = ({ notification }: NotificationRowProps) => {
  const { data: blockTime } = useBlock(
    notification.payment.block?.toString(),
    notification.payment.token.chainId
  );

  return (
    <TableRow className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <TableCell className="font-medium w-1/3">
        <div className="flex flex-col">
          <span className="text-sm font-archivo-medium">
            You got paid ${notification.payment.amount}
          </span>
          <span className="text-xs text-neutral-500">
            {notification.viewed ? "Viewed" : "New"}
          </span>
        </div>
      </TableCell>

      <MomentCell token={notification.payment.token} className="w-1/3" />

      <TableCell className="text-sm text-neutral-600 dark:text-neutral-400 w-1/3">
        <div className="flex flex-col">
          <span>
            {blockTime
              ? blockTime.toLocaleString()
              : `Block #${notification.payment.block}`}
          </span>
          <span className="text-xs text-neutral-500">
            Block #{notification.payment.block}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NotificationRow;
