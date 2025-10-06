import { useEffect } from "react";
import useSignedAddress from "@/hooks/useSignedAddress";
import { markNotificationsAsViewed } from "@/lib/notifications/markNotificationsAsViewed";

const useMarkNotificationAsViewed = () => {
  const signedAddress = useSignedAddress();

  useEffect(() => {
    if (signedAddress) {
      const timer = setTimeout(() => {
        markNotificationsAsViewed(signedAddress.toLowerCase()).catch(
          (error) => {
            console.error("Failed to mark notifications as viewed:", error);
          },
        );
      }, 10000); // 10 second delay

      return () => clearTimeout(timer);
    }
  }, [signedAddress]);
};

export default useMarkNotificationAsViewed;
