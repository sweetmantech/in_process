alter table "public"."in_process_artist_smart_wallets" drop constraint "in_process_artist_smart_wallets_artist_address_fkey";

alter table "public"."in_process_artist_smart_wallets" drop constraint "in_process_artist_smart_wallets_pkey";

drop index if exists "public"."in_process_artist_smart_wallets_pkey";

drop table "public"."in_process_artist_smart_wallets";

create table "public"."in_process_artist_social_wallets" (
    "social_wallet" text not null,
    "artist_address" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."in_process_artist_social_wallets" enable row level security;

CREATE UNIQUE INDEX in_process_artist_social_wallets_pkey ON public.in_process_artist_social_wallets USING btree (social_wallet);

alter table "public"."in_process_artist_social_wallets" add constraint "in_process_artist_social_wallets_pkey" PRIMARY KEY using index "in_process_artist_social_wallets_pkey";

alter table "public"."in_process_artist_social_wallets" add constraint "in_process_artist_social_wallets_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_artist_social_wallets" validate constraint "in_process_artist_social_wallets_artist_address_fkey";