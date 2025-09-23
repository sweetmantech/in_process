import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Notification } from "@/hooks/useNotifications";
// Import NotificationRow component
import NotificationRow from "./NotificationRow";

interface NotificationsTableContentsProps {
  notifications: Notification[];
}

const NotificationsTableContents = ({
  notifications,
}: NotificationsTableContentsProps) => {
  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Notification</TableHead>
            <TableHead className="w-1/3">Moment</TableHead>
            <TableHead className="w-1/3">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotificationsTableContents;
