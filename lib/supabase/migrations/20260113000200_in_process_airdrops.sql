  create table "public"."in_process_airdrops" (
    "id" uuid not null default gen_random_uuid(),
    "artist_address" text not null,
    "amount" numeric not null,
    "updated_at" timestamp with time zone not null,
    "moment" uuid not null
      );


alter table "public"."in_process_airdrops" enable row level security;

CREATE UNIQUE INDEX in_process_airdrops_pkey ON public.in_process_airdrops USING btree (id);

alter table "public"."in_process_airdrops" add constraint "in_process_airdrops_pkey" PRIMARY KEY using index "in_process_airdrops_pkey";

alter table "public"."in_process_airdrops" add constraint "in_process_airdrops_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_airdrops" validate constraint "in_process_airdrops_artist_address_fkey";

alter table "public"."in_process_airdrops" add constraint "in_process_airdrops_moment_fkey" FOREIGN KEY (moment) REFERENCES public.in_process_moments(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_airdrops" validate constraint "in_process_airdrops_moment_fkey";

CREATE INDEX in_process_airdrops_moment_artist_address_idx ON public.in_process_airdrops USING btree (moment, artist_address);


