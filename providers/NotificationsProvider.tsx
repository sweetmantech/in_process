"use client";

import { createContext, useContext, useMemo } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { useUserProvider } from "@/providers/UserProvider";
import useMarkNotificationAsViewed from "@/hooks/useMarkNotificationAsViewed";

interface NotificationsContextValue {
  notifications: ReturnType<typeof useNotifications>;
  unviewedCount: number;
  artistWallet: string | undefined;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { artistWallet } = useUserProvider();

  const notifications = useNotifications(1, 100, true, artistWallet, undefined);
  const unviewedCount = notifications.data?.notifications?.filter((n) => !n.viewed).length || 0;

  useMarkNotificationAsViewed(artistWallet);

  const value = useMemo(
    () => ({
      notifications,
      unviewedCount,
      artistWallet,
    }),
    [notifications, unviewedCount, artistWallet]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotificationsProvider = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotificationsProvider must be used within a NotificationsProvider");
  }
  return context;
};

export default NotificationsProvider;
