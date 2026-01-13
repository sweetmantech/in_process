alter table "public"."in_process_airdrops" drop constraint "in_process_airdrops_artist_address_fkey";

drop index if exists "public"."in_process_airdrops_moment_artist_address_idx";

alter table "public"."in_process_airdrops" drop column "artist_address";

alter table "public"."in_process_airdrops" add column "recipient" text not null;

alter table "public"."in_process_airdrops" add constraint "in_process_airdrops_recipient_fkey" FOREIGN KEY (recipient) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_airdrops" validate constraint "in_process_airdrops_recipient_fkey";

alter table "public"."in_process_airdrops" 
  add constraint "in_process_airdrops_moment_recipient_unique" 
  unique (moment, recipient);

