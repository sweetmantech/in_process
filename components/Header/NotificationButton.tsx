"use client";

import { BellIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import useSignedAddress from "@/hooks/useSignedAddress";
import { Badge } from "@/components/ui/badge";

const NotificationButton = () => {
  const router = useRouter();
  const signedAddress = useSignedAddress();

  // Fetch unviewed notifications for the connected user
  const { data: unviewedData } = useNotifications(
    1,
    100, // Get up to 100 unviewed notifications for counting
    !!signedAddress, // Only fetch if user is connected
    signedAddress?.toLowerCase(),
    false // viewed = false (unviewed notifications)
  );

  const unviewedCount = unviewedData?.notifications?.length || 0;

  return (
    <button
      onClick={() => router.push("/notifications")}
      type="button"
      className="relative p-2 rounded-md hover:bg-grey-moss-200/50 transition-colors"
      aria-label="View notifications"
    >
      <BellIcon className="w-5 h-5 text-grey-moss-300" />
      {unviewedCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
        >
          {unviewedCount > 99 ? "99+" : unviewedCount}
        </Badge>
      )}
    </button>
  );
};

export default NotificationButton;
