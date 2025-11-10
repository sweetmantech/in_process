create table "public"."in_process_token_admins" (
    "id" uuid not null default gen_random_uuid(),
    "token_id" uuid,
    "artist_address" text,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."in_process_token_admins" enable row level security;

CREATE UNIQUE INDEX in_process_token_admins_pkey ON public.in_process_token_admins USING btree (id);

alter table "public"."in_process_token_admins" add constraint "in_process_token_admins_pkey" PRIMARY KEY using index "in_process_token_admins_pkey";

alter table "public"."in_process_token_admins" add constraint "in_process_token_admins_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_token_admins" validate constraint "in_process_token_admins_artist_address_fkey";

alter table "public"."in_process_token_admins" add constraint "in_process_token_admins_token_id_fkey" FOREIGN KEY (token_id) REFERENCES in_process_tokens(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_token_admins" validate constraint "in_process_token_admins_token_id_fkey";

