create table "public"."in_process_artist_phones" (
  "id" uuid not null default gen_random_uuid(),
  "artist_address" text not null,
  "phone_number" text not null,
  "verified" boolean not null default false,
  "created_at" timestamp with time zone not null default now()
    );


alter table "public"."in_process_artist_phones" enable row level security;

CREATE UNIQUE INDEX in_process_artist_phones_pkey ON public.in_process_artist_phones USING btree (id);

alter table "public"."in_process_artist_phones" add constraint "in_process_artist_phones_pkey" PRIMARY KEY using index "in_process_artist_phones_pkey";

alter table "public"."in_process_artist_phones" add constraint "in_process_artist_phones_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_artist_phones" validate constraint "in_process_artist_phones_artist_address_fkey";


