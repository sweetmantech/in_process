
  create table "public"."in_process_collections" (
    "id" uuid not null default gen_random_uuid(),
    "address" text not null,
    "chain_id" numeric not null,
    "uri" text not null,
    "default_admin" text not null,
    "payout_recipient" text not null,
    "created_at" timestamp with time zone not null
      );


alter table "public"."in_process_collections" enable row level security;

CREATE UNIQUE INDEX in_process_collections_address_chain_id_unique ON public.in_process_collections USING btree (address, chain_id);

CREATE UNIQUE INDEX in_process_collections_pkey ON public.in_process_collections USING btree (id);

alter table "public"."in_process_collections" add constraint "in_process_collections_pkey" PRIMARY KEY using index "in_process_collections_pkey";

alter table "public"."in_process_collections" add constraint "in_process_collections_address_chain_id_unique" UNIQUE using index "in_process_collections_address_chain_id_unique";

alter table "public"."in_process_collections" add constraint "in_process_collections_default_admin_fkey" FOREIGN KEY (default_admin) REFERENCES public.in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_collections" validate constraint "in_process_collections_default_admin_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.in_process_collections_lowercase()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.address := lower(new.address);
  new.default_admin := lower(new.default_admin);
  new.payout_recipient := lower(new.payout_recipient);
  return new;
end;
$function$
;

