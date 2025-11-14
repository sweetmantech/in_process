import { getMaxBlockTimestamp } from "@/lib/supabase/in_process_tokens/getMaxBlockTimestamp";
import fetchGraphQL from "@/lib/envio/fetchGraphQL";
import { CHAIN_ID, INDEXER_ID } from "@/lib/consts";
import { mapMomentsToSupabase } from "@/lib/supabase/in_process_tokens/mapMomentsToSupabase";
import { ensureArtists } from "@/lib/supabase/in_process_artists/ensureArtists";
import { upsertTokens } from "@/lib/supabase/in_process_tokens/upsertTokens";
import { GraphQLResponse } from "@/types/envio";
import { Database } from "@/lib/supabase/types";
import { processTokenFeeRecipients } from "../supabase/in_process_token_fee_recipients/processTokenFeeRecipients";

export async function syncMoments() {
  const maxBlockTimestamp = await getMaxBlockTimestamp(CHAIN_ID);
  const operation = `query MyQuery($limit: Int, $offset: Int, $minTimestamp: Int, $chainId: Int) {
    CreatorFactory_SetupNewContract(limit: $limit, offset: $offset, order_by: {blockNumber: desc}, where: {blockTimestamp: {_gt: $minTimestamp}, chainId: {_eq: $chainId}}) {
      id
      chainId
      address
      contractURI
      defaultAdmin
      payoutRecipient
      transactionHash
      blockNumber
      blockTimestamp
    }
  }`;

  const result = (await fetchGraphQL(INDEXER_ID, operation, "MyQuery", {
    limit: 100,
    offset: 0,
    minTimestamp: maxBlockTimestamp,
    chainId: CHAIN_ID,
  })) as GraphQLResponse;

  const mappedMoments = mapMomentsToSupabase(result.data.CreatorFactory_SetupNewContract);

  const validMoments = mappedMoments.filter(
    (moment: Database["public"]["Tables"]["in_process_tokens"]["Insert"]) =>
      moment.address && moment.defaultAdmin && moment.uri
  );

  const adminAddresses = validMoments.map(
    (moment: Database["public"]["Tables"]["in_process_tokens"]["Insert"]) => moment.defaultAdmin!
  );
  await ensureArtists(adminAddresses);
  const upsertedTokens = await upsertTokens(validMoments);

  await processTokenFeeRecipients(upsertedTokens);

  const addresses = validMoments
    .map((moment) => moment.address!)
    .filter((address): address is string => address !== undefined);

  return addresses;
}
