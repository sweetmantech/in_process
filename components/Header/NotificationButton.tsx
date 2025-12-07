"use client";

import { BellIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import NotificationCountBadge from "./NotificationCountBadge";

const NotificationButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/notifications")}
      type="button"
      className="relative rounded-md p-2 transition-colors hover:bg-grey-moss-200/50"
      aria-label="View notifications"
    >
      <BellIcon className="h-5 w-5 text-grey-moss-300" />
      <NotificationCountBadge />
    </button>
  );
};

export default NotificationButton;
