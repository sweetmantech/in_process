import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { InProcessNotification } from "@/types/notification";
// Import NotificationRow component
import NotificationRow from "./NotificationRow";

interface NotificationsTableContentsProps {
  notifications: InProcessNotification[];
}

const NotificationsTableContents = ({ notifications }: NotificationsTableContentsProps) => {
  return (
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[640px] md:min-w-0">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Notification</TableHead>
            <TableHead className="w-1/3">Moment</TableHead>
            <TableHead className="w-1/3">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <NotificationRow key={notification.id} notification={notification} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotificationsTableContents;
