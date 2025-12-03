-- Remove block column and add transferred_at column to in_process_payments table
alter table "public"."in_process_payments" drop column if exists "block";

alter table "public"."in_process_payments" add column "transferred_at" timestamp with time zone null;

-- Add comment for documentation
comment on column "public"."in_process_payments"."transferred_at" is 'Timestamp when the payment was transferred';

