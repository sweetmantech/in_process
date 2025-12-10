alter table "public"."in_process_payments" add column "currency" text not null default '0x0000000000000000000000000000000000000000'::text;


