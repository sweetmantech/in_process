import NotificationsTable from "@/components/NotificationsPage/NotificationsTable";

const NotificationsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-archivo-medium mb-2">
            Notifications
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            View all notifications on In Process
          </p>
        </div>

        <NotificationsTable limit={50} />
      </div>
    </div>
  );
};

export default NotificationsPage;
