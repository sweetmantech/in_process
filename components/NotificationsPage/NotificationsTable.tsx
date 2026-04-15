"use client";

import { useNotificationsProvider } from "@/providers/NotificationsProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NotificationsTableLoading from "./NotificationsTableLoading";
import NotificationsTableError from "./NotificationsTableError";
import NoNotificationsFound from "./NoNotificationsFound";
import NotificationsTableContents from "./NotificationsTableContents";

const NotificationsTable = () => {
  const {
    notifications: { data, isLoading, error },
  } = useNotificationsProvider();

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
