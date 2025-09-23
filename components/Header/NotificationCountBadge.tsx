"use client";

import { useNotifications } from "@/hooks/useNotifications";
import useSignedAddress from "@/hooks/useSignedAddress";
import { Badge } from "@/components/ui/badge";

const NotificationCountBadge = () => {
  const signedAddress = useSignedAddress();

  const { data: unviewedData } = useNotifications(
    1,
    100, // Get up to 100 unviewed notifications for counting
    !!signedAddress, // Only fetch if user is connected
    signedAddress?.toLowerCase(),
    false // viewed = false (unviewed notifications)
  );

  const unviewedCount = unviewedData?.notifications?.length || 0;

  if (unviewedCount === 0) return null;

  return (
    <Badge
      variant="destructive"
      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
    >
      {unviewedCount > 99 ? "99+" : unviewedCount}
    </Badge>
  );
};

export default NotificationCountBadge;
