alter table "public"."in_process_payments" drop column "block";

alter table "public"."in_process_payments" add column "transferred_at" timestamp with time zone not null;


