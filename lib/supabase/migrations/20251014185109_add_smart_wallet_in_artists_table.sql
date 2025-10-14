alter table "public"."in_process_artists" add column "smart_wallet" text;

CREATE INDEX in_process_artists_smart_wallet_idx ON public.in_process_artists USING btree (smart_wallet);

CREATE UNIQUE INDEX in_process_artists_smart_wallet_key ON public.in_process_artists USING btree (smart_wallet);

alter table "public"."in_process_artists" add constraint "in_process_artists_smart_wallet_key" UNIQUE using index "in_process_artists_smart_wallet_key";


