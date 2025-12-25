-- Drop the previous unique constraint on artist_address and phone_number combination
alter table "public"."in_process_artist_phones" 
drop constraint if exists "in_process_artist_phones_artist_address_phone_number_unique";

drop index if exists "public"."in_process_artist_phones_artist_address_phone_number_unique";

-- Add unique constraint on phone_number
CREATE UNIQUE INDEX in_process_artist_phones_phone_number_unique 
ON public.in_process_artist_phones 
USING btree (phone_number);

alter table "public"."in_process_artist_phones" 
add constraint "in_process_artist_phones_phone_number_unique" 
UNIQUE using index "in_process_artist_phones_phone_number_unique";

