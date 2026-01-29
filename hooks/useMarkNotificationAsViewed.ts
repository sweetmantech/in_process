import { useEffect } from "react";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import { markNotificationsAsViewed } from "@/lib/notifications/markNotificationsAsViewed";

const useMarkNotificationAsViewed = () => {
  const { privyWallet } = useConnectedWallet();

  useEffect(() => {
    if (privyWallet?.address) {
      const timer = setTimeout(() => {
        markNotificationsAsViewed(privyWallet.address.toLowerCase()).catch((error) => {
          console.error("Failed to mark notifications as viewed:", error);
        });
      }, 10000); // 10 second delay

      return () => clearTimeout(timer);
    }
  }, [privyWallet]);
};

export default useMarkNotificationAsViewed;
