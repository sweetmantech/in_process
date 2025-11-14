create table "public"."in_process_token_fee_recipients" (
    "id" uuid not null default gen_random_uuid(),
    "token" uuid not null,
     "artist_address" text not null,
    "percentAllocation" numeric,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."in_process_token_fee_recipients" enable row level security;

CREATE UNIQUE INDEX in_process_token_fee_recipients_pkey ON public.in_process_token_fee_recipients USING btree (id);

alter table "public"."in_process_token_fee_recipients" add constraint "in_process_token_fee_recipients_pkey" PRIMARY KEY using index "in_process_token_fee_recipients_pkey";

alter table "public"."in_process_token_fee_recipients" add constraint "in_process_token_fee_recipients_artist_address_fkey" FOREIGN KEY (artist_address) REFERENCES in_process_artists(address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_token_fee_recipients" validate constraint "in_process_token_fee_recipients_artist_address_fkey";

alter table "public"."in_process_token_fee_recipients" add constraint "in_process_token_fee_recipients_token_fkey" FOREIGN KEY (token) REFERENCES in_process_tokens(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_token_fee_recipients" validate constraint "in_process_token_fee_recipients_token_fkey";

alter table "public"."in_process_token_fee_recipients" add constraint "in_process_token_fee_recipients_token_artist_address_unique" UNIQUE (token, artist_address);


