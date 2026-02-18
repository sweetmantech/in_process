export interface Artist {
  address: string;
  bio: string | null;
  farcaster_username: string | null;
  instagram_username: string | null;
  smart_wallet: string | null;
  telegram_username: string | null;
  twitter_username: string | null;
  username: string | null;
}

export interface ArtistsPagination {
  page: number;
  limit: number;
  total_pages: number;
  total?: number;
}

export interface ArtistsResponse {
  status: string;
  artists: Artist[];
  pagination: ArtistsPagination;
}
