-- Add unique constraint on phone_number
CREATE UNIQUE INDEX in_process_artist_phones_phone_number_unique 
ON public.in_process_artist_phones 
USING btree (phone_number);

alter table "public"."in_process_artist_phones" 
add constraint "in_process_artist_phones_phone_number_unique" 
UNIQUE using index "in_process_artist_phones_phone_number_unique";

