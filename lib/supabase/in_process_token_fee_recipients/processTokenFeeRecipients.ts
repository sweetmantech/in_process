import { ensureArtists } from "@/lib/supabase/in_process_artists/ensureArtists";
import getSplitRecipients from "@/lib/splits/getSplitRecipients";
import isSplitContract from "@/lib/splits/isSplitContract";
import { Database } from "@/lib/supabase/types";
import { upsertTokenFeeRecipients } from "@/lib/supabase/in_process_token_fee_recipients/upsertTokenFeeRecipients";
import { Address } from "viem";

/**
 * Processes token fee recipients for tokens with payout recipients (split or non-split).
 * @param {Array<Object>} upsertedTokens - Tokens returned from upsertTokens, including payoutRecipient and chainId.
 */
export async function processTokenFeeRecipients(
  upsertedTokens: Database["public"]["Tables"]["in_process_tokens"]["Insert"][]
) {
  const recipientsInserts = [];
  const recipientAddresses = [];
  const tokensWithSplitRecipients = upsertedTokens.filter(
    (token) => token.payoutRecipient && token.chainId
  );
  for (const token of tokensWithSplitRecipients) {
    try {
      const isSplit = await isSplitContract(token.payoutRecipient as Address, token.chainId);
      if (isSplit) {
        const recipients = await getSplitRecipients(
          token.payoutRecipient as Address,
          token.chainId
        );
        if (recipients && recipients.length > 0) {
          for (const recipient of recipients) {
            const address = recipient.recipient.address.toLowerCase();
            recipientsInserts.push({
              token: token.id,
              artist_address: address,
              percentAllocation: recipient.percentAllocation,
            });
            recipientAddresses.push(address);
          }
        }
      } else {
        const address = token.payoutRecipient?.toLowerCase();
        if (address) {
          recipientsInserts.push({
            token: token.id,
            artist_address: address,
            percentAllocation: 100,
          });
          recipientAddresses.push(address);
        }
      }
    } catch (err) {
      console.error(err);
      continue;
    }
  }
  // Ensure all recipients are artists
  if (recipientAddresses.length > 0) {
    await ensureArtists(recipientAddresses);
  }

  // Bulk upsert into in_process_token_fee_recipients
  if (recipientsInserts.length > 0) {
    await upsertTokenFeeRecipients(recipientsInserts);
  }
}
