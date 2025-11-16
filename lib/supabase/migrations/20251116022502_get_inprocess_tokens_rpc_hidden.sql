set check_function_bodies = off;

DO $$
DECLARE
  r record;
BEGIN
  FOR r IN 
    SELECT pg_get_function_identity_arguments(oid) as args
    FROM pg_proc
    WHERE proname = 'get_in_process_tokens'
      AND pronamespace = 'public'::regnamespace
  LOOP
    EXECUTE format('DROP FUNCTION IF EXISTS public.get_in_process_tokens(%s) CASCADE', r.args);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.get_in_process_tokens(p_artist text DEFAULT NULL::text, p_limit integer DEFAULT 20, p_page integer DEFAULT 1, p_latest boolean DEFAULT true, p_chainid numeric DEFAULT NULL::numeric, p_addresses text[] DEFAULT NULL::text[], p_tokenids integer[] DEFAULT NULL::integer[], p_hidden boolean DEFAULT NULL::boolean, p_type text DEFAULT NULL::text)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
  capped_limit int := LEAST(p_limit, 100);
  offset_val int := (p_page - 1) * capped_limit;
  v_chain_id numeric := p_chainId;
  v_moments json;
  v_total_count int;
  v_total_pages int;
BEGIN
  -- Get filtered count (for pagination calculation)
  WITH filtered_tokens AS (
    SELECT DISTINCT
      t.id
    FROM in_process_tokens t
    INNER JOIN in_process_artists a ON t."defaultAdmin" = a.address
    LEFT JOIN in_process_token_admins ta_default ON t.id = ta_default.token AND ta_default.artist_address = t."defaultAdmin"
    LEFT JOIN in_process_token_admins ta_artist ON t.id = ta_artist.token AND ta_artist.artist_address = p_artist
    WHERE
      (
        (p_artist IS NULL AND a.username != '')
        OR
        -- Case 2: artist_address & type = "mutual" -> artist != defaultAdmin AND artist in tokenAdmins
        (
          p_artist IS NOT NULL
          AND p_type = 'mutual'
          AND t."defaultAdmin" != p_artist
          AND EXISTS (
            SELECT 1 FROM in_process_token_admins ta2
            WHERE ta2.token = t.id AND ta2.artist_address = p_artist
          )
        )
        OR
        -- Case 3: artist_address & type = "artist" -> artist == defaultAdmin
        (
          p_artist IS NOT NULL
          AND p_type = 'artist'
          AND t."defaultAdmin" = p_artist
        )
        OR
        -- Case 4: artist_address & type = "timeline" -> return both (mutual OR artist owned)
        (
          p_artist IS NOT NULL
          AND p_type = 'timeline'
          AND (
            -- Mutual: artist != defaultAdmin AND artist in tokenAdmins
            (
              t."defaultAdmin" != p_artist
              AND EXISTS (
                SELECT 1 FROM in_process_token_admins ta3
                WHERE ta3.token = t.id AND ta3.artist_address = p_artist
              )
            )
            OR
            -- Artist owned: artist == defaultAdmin
            t."defaultAdmin" = p_artist
          )
        )
      )
      AND (v_chain_id IS NULL OR t."chainId" = v_chain_id)
      AND (p_addresses IS NULL OR t.address = ANY(p_addresses))
      AND (p_tokenIds IS NULL OR t."tokenId" = ANY(p_tokenIds))
      AND (
        p_hidden = true
        OR
        -- Always use token admin's hidden field based on query context
        COALESCE(
          CASE 
            -- When querying for specific artist: use that artist's token admin record
            WHEN p_artist IS NOT NULL AND p_type = 'mutual' THEN ta_artist.hidden
            WHEN p_artist IS NOT NULL AND p_type = 'timeline' AND t."defaultAdmin" != p_artist THEN ta_artist.hidden
            -- When querying all tokens or artist-owned: use defaultAdmin's token admin record
            ELSE ta_default.hidden
          END,
          false
        ) = false
      )
    GROUP BY
      t.id, t.address, t."tokenId", t.uri, t."defaultAdmin",
      t."chainId", t."createdAt", t."payoutRecipient", a.username
  )
  SELECT COUNT(*) INTO v_total_count FROM filtered_tokens;

  -- Get moments array
  WITH filtered_tokens AS (
    SELECT DISTINCT
      t.id,
      t.address,
      t."tokenId",
      t.uri,
      t."defaultAdmin",
      t."chainId" AS t_chainId,
      t."createdAt",
      -- Always use token admin's hidden field based on query context
      COALESCE(
        CASE 
          -- When querying for specific artist: use that artist's token admin record
          WHEN p_artist IS NOT NULL AND p_type = 'mutual' THEN ta_artist.hidden
          WHEN p_artist IS NOT NULL AND p_type = 'timeline' AND t."defaultAdmin" != p_artist THEN ta_artist.hidden
          -- When querying all tokens or artist-owned: use defaultAdmin's token admin record
          ELSE ta_default.hidden
        END,
        false
      ) AS t_hidden,
      t."payoutRecipient",
      a.username,
      COALESCE(
        ARRAY_AGG(DISTINCT ta.artist_address) FILTER (WHERE ta.artist_address IS NOT NULL),
        ARRAY[]::text[]
      ) AS tokenAdmins
    FROM in_process_tokens t
    INNER JOIN in_process_artists a ON t."defaultAdmin" = a.address
    LEFT JOIN in_process_token_admins ta_default ON t.id = ta_default.token AND ta_default.artist_address = t."defaultAdmin"
    LEFT JOIN in_process_token_admins ta_artist ON t.id = ta_artist.token AND ta_artist.artist_address = p_artist
    LEFT JOIN in_process_token_admins ta ON t.id = ta.token
    WHERE
      (
        (p_artist IS NULL AND a.username != '')
        OR
        -- Case 2: artist_address & type = "mutual" -> artist != defaultAdmin AND artist in tokenAdmins
        (
          p_artist IS NOT NULL
          AND p_type = 'mutual'
          AND t."defaultAdmin" != p_artist
          AND EXISTS (
            SELECT 1 FROM in_process_token_admins ta2
            WHERE ta2.token = t.id AND ta2.artist_address = p_artist
          )
        )
        OR
        -- Case 3: artist_address & type = "artist" -> artist == defaultAdmin
        (
          p_artist IS NOT NULL
          AND p_type = 'artist'
          AND t."defaultAdmin" = p_artist
        )
        OR
        -- Case 4: artist_address & type = "timeline" -> return both (mutual OR artist owned)
        (
          p_artist IS NOT NULL
          AND p_type = 'timeline'
          AND (
            -- Mutual: artist != defaultAdmin AND artist in tokenAdmins
            (
              t."defaultAdmin" != p_artist
              AND EXISTS (
                SELECT 1 FROM in_process_token_admins ta3
                WHERE ta3.token = t.id AND ta3.artist_address = p_artist
              )
            )
            OR
            -- Artist owned: artist == defaultAdmin
            t."defaultAdmin" = p_artist
          )
        )
      )
      AND (v_chain_id IS NULL OR t."chainId" = v_chain_id)
      AND (p_addresses IS NULL OR t.address = ANY(p_addresses))
      AND (p_tokenIds IS NULL OR t."tokenId" = ANY(p_tokenIds))
      AND (
        p_hidden = true
        OR
        -- Always use token admin's hidden field based on query context
        COALESCE(
          CASE 
            -- When querying for specific artist: use that artist's token admin record
            WHEN p_artist IS NOT NULL AND p_type = 'mutual' THEN ta_artist.hidden
            WHEN p_artist IS NOT NULL AND p_type = 'timeline' AND t."defaultAdmin" != p_artist THEN ta_artist.hidden
            -- When querying all tokens or artist-owned: use defaultAdmin's token admin record
            ELSE ta_default.hidden
          END,
          false
        ) = false
      )
    GROUP BY
      t.id, t.address, t."tokenId", t.uri, t."defaultAdmin",
      t."chainId", t."createdAt", t."payoutRecipient", a.username,
      ta_default.hidden, ta_artist.hidden
  )
  SELECT json_agg(
    json_build_object(
      'id', id,
      'address', address,
      'tokenId', "tokenId",
      'uri', uri,
      'defaultAdmin', "defaultAdmin",
      'chain_id', t_chainId,
      'createdAt', "createdAt",
      'hidden', t_hidden,
      'payoutRecipient', "payoutRecipient",
      'username', username,
      'tokenAdmins', tokenAdmins
    )
  ) INTO v_moments
  FROM (
    SELECT
      id,
      address,
      "tokenId",
      uri,
      "defaultAdmin",
      t_chainId,
      "createdAt",
      t_hidden,
      "payoutRecipient",
      username,
      tokenAdmins
    FROM filtered_tokens
    ORDER BY
      CASE WHEN p_latest THEN "createdAt" END DESC NULLS LAST,
      CASE WHEN NOT p_latest THEN "createdAt" END ASC NULLS LAST
    LIMIT capped_limit OFFSET offset_val
  ) AS paginated_tokens;

  -- Calculate total pages
  v_total_pages := CASE WHEN v_total_count > 0 THEN CEIL(v_total_count::numeric / capped_limit) ELSE 1 END;

  -- Return JSON response matching route.ts format
  RETURN json_build_object(
    'moments', COALESCE(v_moments, '[]'::json),
    'pagination', json_build_object(
      'page', p_page,
      'limit', capped_limit,
      'total_pages', v_total_pages
    )
  );
END;
$function$
;