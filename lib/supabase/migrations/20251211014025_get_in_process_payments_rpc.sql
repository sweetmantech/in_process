CREATE OR REPLACE FUNCTION public.get_in_process_payments(
  p_limit integer DEFAULT 20,
  p_page integer DEFAULT 1,
  p_artists text[] DEFAULT NULL,
  p_collectors text[] DEFAULT NULL,
  p_chainid numeric DEFAULT 8453
)
RETURNS json
LANGUAGE plpgsql
AS $function$
DECLARE
  capped_limit int := GREATEST(1, LEAST(COALESCE(NULLIF(p_limit, 0), 20), 100));
  clamped_page int := GREATEST(1, COALESCE(NULLIF(p_page, 0), 1));
  offset_val int := (clamped_page - 1) * capped_limit;
  v_payments json;
  v_total_count int;
  v_total_pages int;
BEGIN
  -- Get filtered count (for pagination calculation)
  WITH filtered_payments AS (
    SELECT DISTINCT
      p.id
    FROM in_process_payments p
    INNER JOIN in_process_moments m ON p.moment = m.id
    INNER JOIN in_process_collections c ON m.collection = c.id
    INNER JOIN in_process_artists b ON p.buyer = b.address
    WHERE
      (p_chainid IS NULL OR c.chain_id = p_chainid)
      AND (
        -- Match artists if provided, or collectors if provided, or both (union)
        -- Treat NULL and empty arrays as "no filter"
        (p_artists IS NULL OR COALESCE(array_length(p_artists, 1), 0) = 0 OR c.default_admin = ANY(p_artists))
        OR
        (p_collectors IS NULL OR COALESCE(array_length(p_collectors, 1), 0) = 0 OR p.buyer = ANY(p_collectors))
      )
      AND p.buyer != '0x0000000000000000000000000000000000000000'
  )
  SELECT COUNT(*) INTO v_total_count FROM filtered_payments;

  -- Get payments array with related data
  SELECT json_agg(
    json_build_object(
      'id', payment_result.id,
      'amount', payment_result.amount::text,
      'currency', payment_result.currency,
      'transaction_hash', payment_result.transaction_hash,
      'transferred_at', payment_result.transferred_at,
      'moment', payment_result.moment,
      'buyer', payment_result.buyer
    )
  ) INTO v_payments
  FROM (
    SELECT
      p.id,
      p.amount,
      p.currency,
      p.transaction_hash,
      p.transferred_at,
      json_build_object(
        'id', m.id,
        'token_id', m.token_id,
        'uri', m.uri,
        'max_supply', m.max_supply,
        'created_at', m.created_at,
        'updated_at', m.updated_at,
        'collection', json_build_object(
          'id', c.id,
          'address', c.address,
          'chain_id', c.chain_id,
          'default_admin', c.default_admin,
          'name', c.name,
          'created_at', c.created_at
        ),
        'fee_recipients', COALESCE(fr.fee_recipients_array, '[]'::json)
      ) AS moment,
      json_build_object(
        'address', b.address,
        'username', b.username,
        'bio', b.bio,
        'instagram_username', b.instagram_username,
        'twitter_username', b.twitter_username,
        'telegram_username', b.telegram_username
      ) AS buyer
    FROM in_process_payments p
    INNER JOIN in_process_moments m ON p.moment = m.id
    INNER JOIN in_process_collections c ON m.collection = c.id
    INNER JOIN in_process_artists b ON p.buyer = b.address
    LEFT JOIN LATERAL (
      SELECT json_agg(
        json_build_object(
          'id', fr.id,
          'moment', fr.moment,
          'artist_address', fr.artist_address,
          'percent_allocation', fr.percent_allocation
        )
      ) AS fee_recipients_array
      FROM in_process_moment_fee_recipients fr
      WHERE fr.moment = m.id
    ) fr ON true
    WHERE
      (p_chainid IS NULL OR c.chain_id = p_chainid)
      AND (
        -- Match artists if provided, or collectors if provided, or both (union)
        -- Treat NULL and empty arrays as "no filter"
        (p_artists IS NULL OR COALESCE(array_length(p_artists, 1), 0) = 0 OR c.default_admin = ANY(p_artists))
        OR
        (p_collectors IS NULL OR COALESCE(array_length(p_collectors, 1), 0) = 0 OR p.buyer = ANY(p_collectors))
      )
      AND p.buyer != '0x0000000000000000000000000000000000000000'
    ORDER BY p.transferred_at DESC
    LIMIT capped_limit OFFSET offset_val
  ) payment_result;

  -- Calculate total pages
  v_total_pages := CASE WHEN v_total_count > 0 THEN CEIL(v_total_count::numeric / capped_limit) ELSE 1 END;

  -- Return JSON response matching API format
  RETURN json_build_object(
    'payments', COALESCE(v_payments, '[]'::json),
    'count', v_total_count,
    'pagination', json_build_object(
      'page', clamped_page,
      'limit', capped_limit,
      'total_pages', v_total_pages
    )
  );
END;
$function$
;
