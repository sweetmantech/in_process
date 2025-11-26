
alter table "public"."in_process_collection_admins" drop constraint "in_process_collection_admins_artist_address_fkey";

alter table "public"."in_process_collection_admins" drop constraint "in_process_collection_admins_collection_fkey";

alter table "public"."in_process_moment_admins" drop constraint "in_process_moment_admins_artist_address_fkey";

alter table "public"."in_process_moment_admins" drop constraint "in_process_moment_admins_moment_fkey";

alter table "public"."in_process_collection_admins" drop constraint "in_process_collection_admins_pkey";

alter table "public"."in_process_moment_admins" drop constraint "in_process_moment_admins_pkey";

drop index if exists "public"."in_process_collection_admins_collection_artist_address_unique";

drop index if exists "public"."in_process_collection_admins_pkey";

drop index if exists "public"."in_process_moment_admins_moment_artist_address_unique";

drop index if exists "public"."in_process_moment_admins_pkey";

drop table "public"."in_process_collection_admins";

drop table "public"."in_process_moment_admins";


  create table "public"."in_process_admins" (
    "id" uuid not null default gen_random_uuid(),
    "collection" uuid not null,
    "token_id" numeric not null,
    "hidden" boolean not null default false,
    "granted_at" timestamp with time zone not null,
    "artist_address" text not null
      );


alter table "public"."in_process_admins" enable row level security;

CREATE UNIQUE INDEX in_process_admins_pkey ON public.in_process_admins USING btree (id);

alter table "public"."in_process_admins" add constraint "in_process_admins_pkey" PRIMARY KEY using index "in_process_admins_pkey";

alter table "public"."in_process_admins" add constraint "in_process_admins_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_admins" validate constraint "in_process_admins_artist_address_fkey";

alter table "public"."in_process_admins" add constraint "in_process_admins_collection_fkey" FOREIGN KEY (collection) REFERENCES public.in_process_collections(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_admins" validate constraint "in_process_admins_collection_fkey";

CREATE UNIQUE INDEX in_process_admins_collection_artist_address_token_id_unique ON public.in_process_admins USING btree (collection, artist_address, token_id);