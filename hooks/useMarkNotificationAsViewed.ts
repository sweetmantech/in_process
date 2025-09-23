import { useEffect } from "react";
import useSignedAddress from "@/hooks/useSignedAddress";
import { markNotificationsAsViewed } from "@/lib/notifications/markNotificationsAsViewed";

const useMarkNotificationAsViewed = () => {
  const signedAddress = useSignedAddress();

  useEffect(() => {
    if (signedAddress) {
      markNotificationsAsViewed(signedAddress.toLowerCase()).catch((error) => {
        console.error("Failed to mark notifications as viewed:", error);
      });
    }
  }, [signedAddress]);
};

export default useMarkNotificationAsViewed;
