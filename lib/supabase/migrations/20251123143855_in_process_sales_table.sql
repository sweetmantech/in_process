alter table "public"."in_process_moments" drop constraint "in_process_moments_collection_id_fkey";

alter table "public"."in_process_moments" drop constraint "in_process_moments_collection_id_token_id_unique";

drop index if exists "public"."in_process_moments_collection_id_token_id_unique";

alter table "public"."in_process_moments" drop column "collection_id";

alter table "public"."in_process_moments" add column "collection" uuid not null;

alter table "public"."in_process_moments" add constraint "in_process_moments_collection_fkey" FOREIGN KEY (collection) REFERENCES public.in_process_collections(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_moments" validate constraint "in_process_moments_collection_fkey";

CREATE UNIQUE INDEX in_process_moments_collection_token_id_unique ON public.in_process_moments USING btree (collection, token_id);

alter table "public"."in_process_moments" add constraint "in_process_moments_collection_token_id_unique" UNIQUE using index "in_process_moments_collection_token_id_unique";

create table "public"."in_process_sales" (
    "id" uuid not null default gen_random_uuid(),
    "token" uuid not null,
    "sale_start" numeric not null,
    "sale_end" numeric not null,
    "max_tokens_per_address" numeric not null,
    "price_per_token" numeric not null,
    "funds_recipient" text not null,
    "currency" text not null
);

alter table "public"."in_process_sales" enable row level security;

alter table "public"."in_process_sales" add constraint "chk_in_process_sales_sale_range" 
    check (sale_end >= sale_start);

CREATE UNIQUE INDEX in_process_sales_pkey ON public.in_process_sales USING btree (id);

alter table "public"."in_process_sales" add constraint "in_process_sales_pkey" PRIMARY KEY using index "in_process_sales_pkey";

alter table "public"."in_process_sales" add constraint "in_process_sales_token_fkey" FOREIGN KEY (token) REFERENCES public.in_process_tokens(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_sales" validate constraint "in_process_sales_token_fkey";

CREATE UNIQUE INDEX in_process_sales_token_unique ON public.in_process_sales USING btree (token);

alter table "public"."in_process_sales" add constraint "in_process_sales_token_unique" UNIQUE using index "in_process_sales_token_unique";

-- Create trigger function to convert funds_recipient and currency to lowercase
create or replace function "public"."lowercase_in_process_sales_fields"()
returns trigger as $$
begin
    new.funds_recipient := lower(new.funds_recipient);
    new.currency := lower(new.currency);
    return new;
end;
$$ language plpgsql;

-- Create trigger to automatically lowercase funds_recipient and currency on insert/update
create trigger "trg_lowercase_in_process_sales_fields"
    before insert or update on "public"."in_process_sales"
    for each row
    execute function "public"."lowercase_in_process_sales_fields"();