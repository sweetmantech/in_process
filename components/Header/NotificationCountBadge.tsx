"use client";

import { useNotifications } from "@/hooks/useNotifications";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import { Badge } from "@/components/ui/badge";

const NotificationCountBadge = () => {
  const { privyWallet } = useConnectedWallet();

  const { data: unviewedData } = useNotifications(
    1,
    100, // Get up to 100 unviewed notifications for counting
    !!privyWallet?.address, // Only fetch if user is connected
    privyWallet?.address?.toLowerCase(),
    false // viewed = false (unviewed notifications)
  );

  const unviewedCount = unviewedData?.notifications?.length || 0;

  if (unviewedCount === 0) return null;

  return (
    <Badge
      variant="destructive"
      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs font-bold"
    >
      {unviewedCount > 99 ? "99+" : unviewedCount}
    </Badge>
  );
};

export default NotificationCountBadge;
