type InProcessNotificationTransfer = {
  value: number | null;
  currency: string | null;
  transaction_hash: string;
  transferred_at: string;
  moment: {
    token_id: number;
    collection: { address: string };
    metadata: { image: string | null; name: string | null } | null;
  };
  collector: { username: string | null };
};

export type InProcessNotification = {
  id: string;
  viewed: boolean;
  transfer: InProcessNotificationTransfer;
  artist: { username: string | null };
};

interface NotificationsPagination {
  page: number;
  limit: number;
  total_count: number;
  total_pages: number;
}

export interface NotificationsResponse {
  status: "success" | "error";
  notifications: InProcessNotification[];
  pagination: NotificationsPagination;
  message?: string;
}
