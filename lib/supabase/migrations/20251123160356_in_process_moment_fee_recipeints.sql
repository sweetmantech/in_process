
  create table "public"."in_process_moment_fee_recipients" (
    "id" uuid not null default gen_random_uuid(),
    "moment" uuid not null,
    "artist_address" text not null,
    "percent_allocation" numeric not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."in_process_moment_fee_recipients" enable row level security;

alter table "public"."in_process_moment_admins" alter column "created_at" set default now();

alter table "public"."in_process_sales" add column "created_at" timestamp with time zone not null default now();

CREATE UNIQUE INDEX in_process_moment_fee_recipients_pkey ON public.in_process_moment_fee_recipients USING btree (id);

alter table "public"."in_process_moment_fee_recipients" add constraint "in_process_moment_fee_recipients_pkey" PRIMARY KEY using index "in_process_moment_fee_recipients_pkey";

alter table "public"."in_process_moment_fee_recipients" add constraint "in_process_moment_fee_recipients_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."in_process_moment_fee_recipients" validate constraint "in_process_moment_fee_recipients_artist_address_fkey";

alter table "public"."in_process_moment_fee_recipients" add constraint "in_process_moment_fee_recipients_moment_fkey" FOREIGN KEY (moment) REFERENCES public.in_process_moments(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_moment_fee_recipients" validate constraint "in_process_moment_fee_recipients_moment_fkey";

CREATE UNIQUE INDEX in_process_moment_fee_recipients_moment_artist_address_unique ON public.in_process_moment_fee_recipients USING btree (moment, artist_address);

alter table "public"."in_process_collections" drop constraint "in_process_collections_default_admin_fkey";

alter table "public"."in_process_moment_admins" drop constraint "in_process_moment_admins_artist_address_fkey";

alter table "public"."in_process_collections" add constraint "in_process_collections_default_admin_fkey" FOREIGN KEY (default_admin) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."in_process_collections" validate constraint "in_process_collections_default_admin_fkey";

alter table "public"."in_process_moment_admins" add constraint "in_process_moment_admins_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."in_process_moment_admins" validate constraint "in_process_moment_admins_artist_address_fkey";
