
  create table "public"."in_process_collection_admins" (
    "id" uuid not null default gen_random_uuid(),
    "collection" uuid not null,
    "artist_address" text not null,
    "granted_at" timestamp with time zone not null,
    "hidden" boolean not null default false
      );


alter table "public"."in_process_collection_admins" enable row level security;

CREATE UNIQUE INDEX in_process_collection_admins_pkey ON public.in_process_collection_admins USING btree (id);

alter table "public"."in_process_collection_admins" add constraint "in_process_collection_admins_pkey" PRIMARY KEY using index "in_process_collection_admins_pkey";

alter table "public"."in_process_collection_admins" add constraint "in_process_collection_admins_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_collection_admins" validate constraint "in_process_collection_admins_artist_address_fkey";

alter table "public"."in_process_collection_admins" add constraint "in_process_collection_admins_collection_fkey" FOREIGN KEY (collection) REFERENCES public.in_process_collections(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_collection_admins" validate constraint "in_process_collection_admins_collection_fkey";

CREATE UNIQUE INDEX in_process_collection_admins_collection_artist_address_unique ON public.in_process_collection_admins USING btree (collection, artist_address);
