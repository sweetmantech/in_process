"use client";

import { BellIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const NotificationButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/notifications")}
      type="button"
      className="p-2 rounded-md hover:bg-grey-moss-200/50 transition-colors"
      aria-label="View notifications"
    >
      <BellIcon className="w-5 h-5 text-grey-moss-300" />
    </button>
  );
};

export default NotificationButton;
