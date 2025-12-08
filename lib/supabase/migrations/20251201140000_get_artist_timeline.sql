CREATE OR REPLACE FUNCTION public.get_artist_timeline(
  p_artist text,
  p_type text DEFAULT NULL,
  p_limit integer DEFAULT 100,
  p_page integer DEFAULT 1,
  p_chainid numeric DEFAULT 8453,
  p_hidden boolean DEFAULT false
)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
  capped_limit int := GREATEST(1, LEAST(COALESCE(NULLIF(p_limit, 0), 100), 1000));
  clamped_page int := GREATEST(1, COALESCE(NULLIF(p_page, 0), 1));
  offset_val int := (clamped_page - 1) * capped_limit;
  v_moments json;
  v_total_count int;
  v_total_pages int;
BEGIN
  -- Get filtered count (for pagination calculation)
  WITH filtered_moments AS (
    SELECT DISTINCT
      m.id
    FROM in_process_moments m
    INNER JOIN in_process_collections c ON m.collection = c.id
    WHERE
      (p_chainid IS NULL OR c.chain_id = p_chainid)
      AND (
        -- When p_hidden = true, return all moments regardless of hidden status
        -- Default case: artist is the default admin
        (
          (p_type IS NULL OR p_type = 'default') 
          AND c.default_admin = LOWER(p_artist)
          AND (
            p_hidden = true OR 
            COALESCE(
              (SELECT hidden FROM in_process_admins 
               WHERE collection = m.collection 
                 AND token_id = m.token_id 
                 AND artist_address = c.default_admin 
               LIMIT 1),
              false
            ) = false
          )
        )
        OR
        -- Mutual case: artist is NOT the default admin but IS in the admins list
        (
          (p_type IS NULL OR p_type = 'mutual')
          AND c.default_admin != LOWER(p_artist)
          AND EXISTS (
            SELECT 1 FROM in_process_admins adm_check
            WHERE adm_check.collection = m.collection 
            AND (adm_check.token_id = m.token_id OR adm_check.token_id = 0)
            AND adm_check.artist_address = LOWER(p_artist)
            AND (p_hidden = true OR adm_check.hidden = false)
          )
        )
      )
  )
  SELECT COUNT(*) INTO v_total_count FROM filtered_moments;

  -- Get moments array with admins
  WITH moment_data AS (
    SELECT DISTINCT
      m.id,
      m.collection,
      m.token_id,
      m.uri,
      m.max_supply,
      m.created_at,
      m.updated_at,
      c.address,
      c.chain_id,
      c.default_admin,
      -- Get default admin info
      da.username AS default_admin_username,
      -- Get default admin hidden status from admins table
      -- Priority: exact token_id match, if not found default to false
      COALESCE(
        (SELECT hidden FROM in_process_admins 
         WHERE collection = m.collection 
           AND token_id = m.token_id 
           AND artist_address = c.default_admin 
         LIMIT 1),
        false
      ) AS default_admin_hidden
    FROM in_process_moments m
    INNER JOIN in_process_collections c ON m.collection = c.id
    INNER JOIN in_process_artists da ON c.default_admin = da.address
    WHERE
      (p_chainid IS NULL OR c.chain_id = p_chainid)
      AND (
        -- When p_hidden = true, return all moments regardless of hidden status
        -- Default case: artist is the default admin
        (
          (p_type IS NULL OR p_type = 'default') 
          AND c.default_admin = LOWER(p_artist)
          AND (
            p_hidden = true OR 
            COALESCE(
              (SELECT hidden FROM in_process_admins 
               WHERE collection = m.collection 
                 AND token_id = m.token_id 
                 AND artist_address = c.default_admin 
               LIMIT 1),
              false
            ) = false
          )
        )
        OR
        -- Mutual case: artist is NOT the default admin but IS in the admins list
        (
          (p_type IS NULL OR p_type = 'mutual')
          AND c.default_admin != LOWER(p_artist)
          AND EXISTS (
            SELECT 1 FROM in_process_admins adm_check
            WHERE adm_check.collection = m.collection 
            AND (adm_check.token_id = m.token_id OR adm_check.token_id = 0)
            AND adm_check.artist_address = LOWER(p_artist)
            AND (p_hidden = true OR adm_check.hidden = false)
          )
        )
      )
  ),
  admin_data AS (
    SELECT
      md.id AS moment_id,
      json_agg(
        json_build_object(
          'address', adm.artist_address,
          'username', COALESCE(a.username, NULL),
          'hidden', adm.hidden
        )
        ORDER BY adm.granted_at ASC
      ) FILTER (WHERE adm.artist_address IS NOT NULL) AS admins_array
    FROM moment_data md
    LEFT JOIN LATERAL (
      SELECT DISTINCT ON (adm.artist_address)
        adm.artist_address,
        adm.hidden,
        adm.granted_at
      FROM in_process_admins adm
      WHERE adm.collection = md.collection 
        AND (adm.token_id = md.token_id OR adm.token_id = 0)
      ORDER BY adm.artist_address, 
        CASE WHEN adm.token_id = md.token_id THEN 0 ELSE 1 END,
        adm.granted_at ASC
    ) adm ON true
    LEFT JOIN in_process_artists a ON adm.artist_address = a.address
    GROUP BY md.id
  )
  SELECT json_agg(
    json_build_object(
      'address', moment_result.address,
      'token_id', moment_result.token_id,
      'max_supply', moment_result.max_supply,
      'chain_id', moment_result.chain_id,
      'id', moment_result.id,
      'uri', moment_result.uri,
      'default_admin', moment_result.default_admin,
      'admins', moment_result.admins,
      'created_at', moment_result.created_at,
      'updated_at', moment_result.updated_at
    )
  ) INTO v_moments
  FROM (
    SELECT
      md.address,
      md.token_id::text AS token_id,
      md.max_supply,
      md.chain_id,
      md.id,
      md.uri,
      json_build_object(
        'address', md.default_admin,
        'username', md.default_admin_username,
        'hidden', md.default_admin_hidden
      ) AS default_admin,
      COALESCE(ad.admins_array, '[]'::json) AS admins,
      md.created_at,
      md.updated_at
    FROM moment_data md
    LEFT JOIN admin_data ad ON md.id = ad.moment_id
    ORDER BY md.created_at DESC
    LIMIT capped_limit OFFSET offset_val
  ) moment_result;

  -- Calculate total pages
  v_total_pages := CASE WHEN v_total_count > 0 THEN CEIL(v_total_count::numeric / capped_limit) ELSE 1 END;

  -- Return JSON response matching API format
  RETURN json_build_object(
    'moments', COALESCE(v_moments, '[]'::json),
    'pagination', json_build_object(
      'page', clamped_page,
      'limit', capped_limit,
      'total_pages', v_total_pages
    )
  );
END;
$function$
;

