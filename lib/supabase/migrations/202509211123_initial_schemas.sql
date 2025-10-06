create table in_process_artists (
  address text not null,
  username text null,
  bio text null,
  instagram_username text null,
  twitter_username text null,
  telegram_username text null,
  constraint in_process_artists_pkey primary key (address)
) TABLESPACE pg_default;

create unique INDEX IF not exists idx_in_process_artists_address on in_process_artists using btree (address) TABLESPACE pg_default;

create table in_process_tokens (
  id uuid not null default gen_random_uuid (),
  address text not null default ''::text,
  "tokenId" numeric not null,
  uri text not null default ''::text,
  "defaultAdmin" text not null default ''::text,
  "chainId" numeric not null,
  "createdAt" timestamp with time zone not null,
  hidden boolean not null default false,
  constraint in_process_tokens_pkey primary key (id),
  constraint in_process_tokens_address_chainid_unique unique (address, "chainId"),
  constraint fk_defaultadmin_artist foreign KEY ("defaultAdmin") references in_process_artists (address) on update CASCADE on delete RESTRICT
) TABLESPACE pg_default;

create index IF not exists idx_in_process_tokens_defaultadmin on in_process_tokens using btree ("defaultAdmin") TABLESPACE pg_default;

create table in_process_payments (
  id uuid not null default gen_random_uuid (),
  token uuid not null,
  buyer text null,
  amount numeric null,
  hash text null,
  block numeric null,
  constraint in_process_payments_pkey primary key (id),
  constraint in_process_payments_hash_buyer_token_unique unique (hash, buyer, token),
  constraint in_process_payments_buyer_fkey foreign KEY (buyer) references in_process_artists (address) on delete CASCADE,
  constraint in_process_payments_token_fkey foreign KEY (token) references in_process_tokens (id) on delete CASCADE
) TABLESPACE pg_default;
