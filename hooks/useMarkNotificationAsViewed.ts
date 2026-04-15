import { useEffect } from "react";
import { markNotificationsAsViewed } from "@/lib/notifications/markNotificationsAsViewed";
import { useUserProvider } from "@/providers/UserProvider";

const useMarkNotificationAsViewed = () => {
  const { artistWallet } = useUserProvider();

  useEffect(() => {
    if (!artistWallet) return;
    const timer = setTimeout(() => {
      markNotificationsAsViewed(artistWallet).catch((error) => {
        console.error("Failed to mark notifications as viewed:", error);
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, [artistWallet]);
};

export default useMarkNotificationAsViewed;
