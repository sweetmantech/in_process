alter table "public"."in_process_token_admins" drop constraint "in_process_token_admins_token_id_artist_address_unique";

alter table "public"."in_process_token_admins" drop constraint "in_process_token_admins_token_id_fkey";

drop index if exists "public"."in_process_token_admins_token_id_artist_address_unique";

alter table "public"."in_process_token_admins" drop column "created_at";

alter table "public"."in_process_token_admins" drop column "token_id";

alter table "public"."in_process_token_admins" add column "createdAt" timestamp with time zone;

alter table "public"."in_process_token_admins" add column "token" uuid default gen_random_uuid();

alter table "public"."in_process_token_admins" add constraint "in_process_token_admins_token_fkey" FOREIGN KEY (token) REFERENCES public.in_process_tokens(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_token_admins" validate constraint "in_process_token_admins_token_fkey";

alter table "public"."in_process_token_admins" add constraint "in_process_token_admins_token_artist_address_unique" UNIQUE (token, artist_address);

