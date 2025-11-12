set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_in_process_tokens(p_artist text DEFAULT NULL::text, p_limit integer DEFAULT 20, p_page integer DEFAULT 1, p_latest boolean DEFAULT true, p_chainid numeric DEFAULT NULL::numeric, p_addresses text[] DEFAULT NULL::text[], p_tokenids integer[] DEFAULT NULL::integer[], p_hidden boolean DEFAULT NULL::boolean)
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
    LEFT JOIN in_process_token_admins ta ON t.id = ta.token_id
    WHERE
      (
        (p_artist IS NULL AND a.username != '')
        OR
        (
          p_artist IS NOT NULL
          AND (
            t."defaultAdmin" = p_artist
            OR EXISTS (
              SELECT 1 FROM in_process_token_admins ta2
              WHERE ta2.token_id = t.id AND ta2.artist_address = p_artist
            )
          )
        )
      )
      AND (v_chain_id IS NULL OR t."chainId" = v_chain_id)
      AND (p_addresses IS NULL OR t.address = ANY(p_addresses))
      AND (p_tokenIds IS NULL OR t."tokenId" = ANY(p_tokenIds))
      AND (p_hidden = true OR t.hidden = false)
    GROUP BY
      t.id, t.address, t."tokenId", t.uri, t."defaultAdmin",
      t."chainId", t."createdAt", t.hidden, t."payoutRecipient", a.username
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
      t.hidden AS t_hidden,
      t."payoutRecipient",
      a.username,
      COALESCE(
        ARRAY_AGG(DISTINCT ta.artist_address) FILTER (WHERE ta.artist_address IS NOT NULL),
        ARRAY[]::text[]
      ) AS tokenAdmins
    FROM in_process_tokens t
    INNER JOIN in_process_artists a ON t."defaultAdmin" = a.address
    LEFT JOIN in_process_token_admins ta ON t.id = ta.token_id
    WHERE
      (
        (p_artist IS NULL AND a.username != '')
        OR
        (
          p_artist IS NOT NULL
          AND (
            t."defaultAdmin" = p_artist
            OR EXISTS (
              SELECT 1 FROM in_process_token_admins ta2
              WHERE ta2.token_id = t.id AND ta2.artist_address = p_artist
            )
          )
        )
      )
      AND (v_chain_id IS NULL OR t."chainId" = v_chain_id)
      AND (p_addresses IS NULL OR t.address = ANY(p_addresses))
      AND (p_tokenIds IS NULL OR t."tokenId" = ANY(p_tokenIds))
      AND (p_hidden = true OR t.hidden = false)
    GROUP BY
      t.id, t.address, t."tokenId", t.uri, t."defaultAdmin",
      t."chainId", t."createdAt", t.hidden, t."payoutRecipient", a.username
  )
  SELECT json_agg(
    json_build_object(
      'id', id,
      'address', address,
      'tokenId', "tokenId",
      'uri', uri,
      'defaultAdmin', "defaultAdmin",
      'chainId', t_chainId,
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


