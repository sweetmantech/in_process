import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationsTableErrorProps {
  error: Error;
}

const NotificationsTableError = ({ error }: NotificationsTableErrorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400">
            Failed to load notifications: {error.message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTableError;
