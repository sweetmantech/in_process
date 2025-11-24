
  create table "public"."in_process_moment_comments" (
    "id" uuid not null default gen_random_uuid(),
    "comment" text,
    "token" uuid not null,
    "artist_address" text not null default ''::text,
    "commented_at" timestamp with time zone not null default now()
      );


alter table "public"."in_process_moment_comments" enable row level security;

alter table "public"."in_process_collections" add column "updated_at" timestamp with time zone not null;

alter table "public"."in_process_moment_admins" drop column "created_at";

alter table "public"."in_process_moment_admins" add column "granted_at" timestamp with time zone not null default now();

alter table "public"."in_process_moments" add column "updated_at" timestamp with time zone not null;

CREATE UNIQUE INDEX in_process_moment_comments_pkey ON public.in_process_moment_comments USING btree (id);

alter table "public"."in_process_moment_comments" add constraint "in_process_moment_comments_pkey" PRIMARY KEY using index "in_process_moment_comments_pkey";

alter table "public"."in_process_moment_comments" add constraint "in_process_moment_comments_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_moment_comments" validate constraint "in_process_moment_comments_artist_address_fkey";