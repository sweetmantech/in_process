alter table "public"."in_process_tokens" drop column "payoutRecipientNotDefaultAdmin";

alter table "public"."in_process_tokens" add column "payoutRecipient" text;
