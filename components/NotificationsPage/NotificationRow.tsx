import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Notification } from "@/hooks/useNotifications";
import MomentCell from "./MomentCell";
import NotificationDateCell from "./NotificationDateCell";

interface NotificationRowProps {
  notification: Notification;
}

const NotificationRow = ({ notification }: NotificationRowProps) => {
  return (
    <TableRow className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <TableCell className="font-medium w-1/3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-archivo-medium">
            {notification.artist.username || "Unknown"} was paid ${notification.payment.amount} by{" "}
            {notification.payment.buyer.username || "Unknown"}
          </span>
          {!notification.viewed && (
            <div className="flex justify-start">
              <Badge
                variant="secondary"
                className="text-xs w-fit bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                New
              </Badge>
            </div>
          )}
        </div>
      </TableCell>
      <MomentCell token={notification.payment.token} className="w-1/3" />
      <NotificationDateCell payment={notification.payment} className="w-1/3" />
    </TableRow>
  );
};

export default NotificationRow;
