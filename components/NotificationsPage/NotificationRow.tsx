import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import MomentCell from "./MomentCell";
import NotificationDateCell from "./NotificationDateCell";
import { InProcessNotification } from "@/types/notification";

interface NotificationRowProps {
  notification: InProcessNotification;
}

const NotificationRow = ({ notification }: NotificationRowProps) => {
  const { transfer, artist, viewed } = notification;

  return (
    <TableRow className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
      <TableCell className="w-1/3 font-medium">
        <div className="flex flex-col gap-2">
          <span className="font-archivo-medium text-sm">
            {artist.username || "Unknown"} was paid ${transfer.value ?? 0} by{" "}
            {transfer.collector.username || "Unknown"}
          </span>
          {!viewed && (
            <div className="flex justify-start">
              <Badge
                variant="secondary"
                className="w-fit bg-green-100 text-xs text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                New
              </Badge>
            </div>
          )}
        </div>
      </TableCell>
      <MomentCell moment={transfer.moment} className="w-1/3" />
      <NotificationDateCell payment={transfer} className="w-1/3" />
    </TableRow>
  );
};

export default NotificationRow;
