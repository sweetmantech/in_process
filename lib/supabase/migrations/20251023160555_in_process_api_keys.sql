create table "public"."in_process_api_keys" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "artist_address" text,
    "key_hash" text,
    "created_at" timestamp with time zone not null default now(),
    "last_used" timestamp without time zone
);


alter table "public"."in_process_api_keys" enable row level security;

CREATE UNIQUE INDEX in_process_api_keys_pkey ON public.in_process_api_keys USING btree (id);

alter table "public"."in_process_api_keys" add constraint "in_process_api_keys_pkey" PRIMARY KEY using index "in_process_api_keys_pkey";

alter table "public"."in_process_api_keys" add constraint "in_process_api_keys_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_api_keys" validate constraint "in_process_api_keys_artist_address_fkey";