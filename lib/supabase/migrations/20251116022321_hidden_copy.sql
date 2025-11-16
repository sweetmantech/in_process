-- Migrate hidden field from in_process_tokens to in_process_token_admins
-- For all tokens where hidden = true, update the corresponding admin record
-- where artist_address matches the token's defaultAdmin

UPDATE in_process_token_admins
SET hidden = true
FROM in_process_tokens
WHERE in_process_token_admins.token = in_process_tokens.id
  AND in_process_token_admins.artist_address = in_process_tokens."defaultAdmin"
  AND in_process_tokens.hidden = true;

