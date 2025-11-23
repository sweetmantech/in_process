
  create table "public"."in_process_moments" (
    "id" uuid not null default gen_random_uuid(),
    "collection_id" uuid not null,
    "token_id" numeric not null,
    "uri" text not null,
    "max_supply" numeric not null,
    "created_at" timestamp with time zone not null
      );


alter table "public"."in_process_moments" enable row level security;

CREATE UNIQUE INDEX in_process_moments_pkey ON public.in_process_moments USING btree (id);

alter table "public"."in_process_moments" add constraint "in_process_moments_pkey" PRIMARY KEY using index "in_process_moments_pkey";

alter table "public"."in_process_moments" add constraint "in_process_moments_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES public.in_process_collections(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."in_process_moments" validate constraint "in_process_moments_collection_id_fkey";

CREATE UNIQUE INDEX in_process_moments_collection_id_token_id_unique ON public.in_process_moments USING btree (collection_id, token_id);

alter table "public"."in_process_moments" add constraint "in_process_moments_collection_id_token_id_unique" UNIQUE using index "in_process_moments_collection_id_token_id_unique";



