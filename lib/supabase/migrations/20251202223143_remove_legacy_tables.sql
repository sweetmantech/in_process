alter table "public"."in_process_token_admins" drop constraint "in_process_token_admins_artist_address_fkey";

alter table "public"."in_process_token_admins" drop constraint "in_process_token_admins_token_artist_address_unique";

alter table "public"."in_process_token_admins" drop constraint "in_process_token_admins_token_fkey";

alter table "public"."in_process_token_fee_recipients" drop constraint "in_process_token_fee_recipients_artist_address_fkey";

alter table "public"."in_process_token_fee_recipients" drop constraint "in_process_token_fee_recipients_token_artist_address_unique";

alter table "public"."in_process_token_fee_recipients" drop constraint "in_process_token_fee_recipients_token_fkey";

alter table "public"."in_process_tokens" drop constraint "fk_defaultadmin_artist";

alter table "public"."in_process_tokens" drop constraint "in_process_tokens_address_chainid_unique";

alter table "public"."in_process_token_admins" drop constraint "in_process_token_admins_pkey";

alter table "public"."in_process_token_fee_recipients" drop constraint "in_process_token_fee_recipients_pkey";

alter table "public"."in_process_tokens" drop constraint "in_process_tokens_pkey";

drop index if exists "public"."idx_in_process_tokens_createdat";

drop index if exists "public"."idx_in_process_tokens_defaultadmin";

drop index if exists "public"."idx_in_process_tokens_defaultadmin_createdat";

drop index if exists "public"."in_process_token_admins_pkey";

drop index if exists "public"."in_process_token_admins_token_artist_address_unique";

drop index if exists "public"."in_process_token_fee_recipients_pkey";

drop index if exists "public"."in_process_token_fee_recipients_token_artist_address_unique";

drop index if exists "public"."in_process_tokens_address_chainid_unique";

drop index if exists "public"."in_process_tokens_pkey";

drop table "public"."in_process_token_admins";

drop table "public"."in_process_token_fee_recipients";

drop table "public"."in_process_tokens";


