
  create table "public"."in_process_moment_admins" (
    "id" uuid not null default gen_random_uuid(),
    "moment" uuid not null,
    "artist_address" text not null,
    "hidden" boolean not null default false,
    "created_at" timestamp with time zone not null
      );


alter table "public"."in_process_moment_admins" enable row level security;

CREATE UNIQUE INDEX in_process_moment_admins_pkey ON public.in_process_moment_admins USING btree (id);

alter table "public"."in_process_moment_admins" add constraint "in_process_moment_admins_pkey" PRIMARY KEY using index "in_process_moment_admins_pkey";

alter table "public"."in_process_moment_admins" add constraint "in_process_moment_admins_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_moment_admins" validate constraint "in_process_moment_admins_artist_address_fkey";

alter table "public"."in_process_moment_admins" add constraint "in_process_moment_admins_moment_fkey" FOREIGN KEY (moment) REFERENCES public.in_process_moments(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_moment_admins" validate constraint "in_process_moment_admins_moment_fkey";

CREATE UNIQUE INDEX in_process_moment_admins_moment_artist_address_unique ON public.in_process_moment_admins USING btree (moment, artist_address);
