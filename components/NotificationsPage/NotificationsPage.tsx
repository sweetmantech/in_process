"use client";

import { useEffect } from "react";
import NotificationsTable from "@/components/NotificationsPage/NotificationsTable";
import useSignedAddress from "@/hooks/useSignedAddress";
import { markNotificationsAsViewed } from "@/lib/notifications/markNotificationsAsViewed";

const NotificationsPage = () => {
  const signedAddress = useSignedAddress();

  // Mark all notifications as viewed when user visits the page
  useEffect(() => {
    if (signedAddress) {
      markNotificationsAsViewed(signedAddress.toLowerCase()).catch((error) => {
        console.error("Failed to mark notifications as viewed:", error);
      });
    }
  }, [signedAddress]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-archivo-medium mb-2">
            Notifications
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {signedAddress
              ? "Your notifications on In Process"
              : "View all notifications on In Process"}
          </p>
        </div>

        <NotificationsTable limit={50} artist={signedAddress?.toLowerCase()} />
      </div>
    </div>
  );
};

export default NotificationsPage;
