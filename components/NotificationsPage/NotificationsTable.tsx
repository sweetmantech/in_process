"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NotificationsTableLoading from "./NotificationsTableLoading";
import NotificationsTableError from "./NotificationsTableError";
import NoNotificationsFound from "./NoNotificationsFound";
import NotificationsTableContents from "./NotificationsTableContents";

interface NotificationsTableProps {
  limit?: number;
  artist?: string;
  viewed?: boolean;
}

const NotificationsTable = ({ limit = 20, artist, viewed }: NotificationsTableProps) => {
  const { data, isLoading, error } = useNotifications(1, limit, true, artist, viewed);

  if (isLoading) return <NotificationsTableLoading />;
  if (error) return <NotificationsTableError error={error} />;

  const notifications = data?.notifications || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Notifications</span>
          <Badge variant="outline">{notifications.length} notifications</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <NoNotificationsFound />
        ) : (
          <NotificationsTableContents notifications={notifications} />
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsTable;
