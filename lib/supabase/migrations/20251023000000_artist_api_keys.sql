-- Create artist API keys table
CREATE TABLE in_process_artist_api_keys (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  artist_address text NOT NULL,
  key_name text NOT NULL,
  api_key_hash text NOT NULL,
  api_key_prefix text NOT NULL, -- First 8 chars for identification
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  CONSTRAINT in_process_artist_api_keys_pkey PRIMARY KEY (id),
  CONSTRAINT fk_artist_api_key_artist FOREIGN KEY (artist_address) 
    REFERENCES in_process_artists (address) ON DELETE CASCADE
);


-- Create indexes for performance
CREATE INDEX idx_artist_api_keys_artist_address ON in_process_artist_api_keys (artist_address);
CREATE INDEX idx_artist_api_keys_hash ON in_process_artist_api_keys (api_key_hash);
CREATE INDEX idx_artist_api_keys_prefix ON in_process_artist_api_keys (api_key_prefix);

-- Create unique constraint on api_key_hash
CREATE UNIQUE INDEX idx_artist_api_keys_hash_unique ON in_process_artist_api_keys (api_key_hash);

-- Create unique constraint on artist_address (one API key per artist)
CREATE UNIQUE INDEX idx_artist_api_keys_artist_unique ON in_process_artist_api_keys (artist_address);

-- Add RLS policies
ALTER TABLE in_process_artist_api_keys ENABLE ROW LEVEL SECURITY;

-- Policy: Artists can only see their own API keys
CREATE POLICY "Artists can view own API keys" ON in_process_artist_api_keys
  FOR ALL USING (artist_address = current_setting('request.jwt.claims', true)::json->>'address');
