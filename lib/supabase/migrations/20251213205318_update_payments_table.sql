delete from "public"."in_process_payments";

alter table "public"."in_process_payments" drop constraint "in_process_payments_token_fkey";

alter table "public"."in_process_payments" drop constraint if exists "in_process_payments_hash_buyer_token_unique";

alter table "public"."in_process_payments" drop column "block";

alter table "public"."in_process_payments" drop column "hash";

alter table "public"."in_process_payments" drop column "token";

alter table "public"."in_process_payments" add column "moment" uuid not null;

alter table "public"."in_process_payments" add column "transaction_hash" text not null;

alter table "public"."in_process_payments" add column "transferred_at" timestamp with time zone not null;

alter table "public"."in_process_payments" alter column "amount" set not null;

alter table "public"."in_process_payments" alter column "buyer" set not null;

alter table "public"."in_process_payments" enable row level security;

alter table "public"."in_process_payments" add constraint "in_process_payments_moment_fkey" FOREIGN KEY (moment) REFERENCES public.in_process_moments(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_payments" validate constraint "in_process_payments_moment_fkey";

alter table "public"."in_process_payments" add constraint "in_process_payments_buyer_transaction_hash_moment_unique" unique (buyer, transaction_hash, moment);



