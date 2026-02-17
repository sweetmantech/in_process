export interface Email {
  address: string;
  email: string;
  artist_address: string | null;
}

export interface EmailsResponse {
  emails: Email[];
  next_cursor: string | null;
}
