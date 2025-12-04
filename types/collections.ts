export interface CollectionsResponse {
  status: "success" | "error";
  collections: Array<{
    id: number;
    address: string;
    chain_id: number;
    uri: string;
    name: string;
    created_at: string;
    default_admin: {
      username: string | null;
      address: string;
    };
  }>;
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
  message?: string;
}

export type CollectionItem = CollectionsResponse["collections"][number];
