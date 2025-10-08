create table "public"."in_process_artist_smart_wallets" (
    "smart_wallet_address" text not null,
    "artist_address" text not null,
    "external_wallet" text,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."in_process_artist_smart_wallets" enable row level security;

CREATE UNIQUE INDEX in_process_artist_smart_wallets_pkey ON public.in_process_artist_smart_wallets USING btree (smart_wallet_address);

alter table "public"."in_process_artist_smart_wallets" add constraint "in_process_artist_smart_wallets_pkey" PRIMARY KEY using index "in_process_artist_smart_wallets_pkey";

alter table "public"."in_process_artist_smart_wallets" add constraint "in_process_artist_smart_wallets_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES in_process_artists(address) ON UPDATE CASCADE not valid;

alter table "public"."in_process_artist_smart_wallets" validate constraint "in_process_artist_smart_wallets_artist_address_fkey";

grant delete on table "public"."in_process_artist_smart_wallets" to "anon";

grant insert on table "public"."in_process_artist_smart_wallets" to "anon";

grant references on table "public"."in_process_artist_smart_wallets" to "anon";

grant select on table "public"."in_process_artist_smart_wallets" to "anon";

grant trigger on table "public"."in_process_artist_smart_wallets" to "anon";

grant truncate on table "public"."in_process_artist_smart_wallets" to "anon";

grant update on table "public"."in_process_artist_smart_wallets" to "anon";

grant delete on table "public"."in_process_artist_smart_wallets" to "authenticated";

grant insert on table "public"."in_process_artist_smart_wallets" to "authenticated";

grant references on table "public"."in_process_artist_smart_wallets" to "authenticated";

grant select on table "public"."in_process_artist_smart_wallets" to "authenticated";

grant trigger on table "public"."in_process_artist_smart_wallets" to "authenticated";

grant truncate on table "public"."in_process_artist_smart_wallets" to "authenticated";

grant update on table "public"."in_process_artist_smart_wallets" to "authenticated";

grant delete on table "public"."in_process_artist_smart_wallets" to "service_role";

grant insert on table "public"."in_process_artist_smart_wallets" to "service_role";

grant references on table "public"."in_process_artist_smart_wallets" to "service_role";

grant select on table "public"."in_process_artist_smart_wallets" to "service_role";

grant trigger on table "public"."in_process_artist_smart_wallets" to "service_role";

grant truncate on table "public"."in_process_artist_smart_wallets" to "service_role";

grant update on table "public"."in_process_artist_smart_wallets" to "service_role";


