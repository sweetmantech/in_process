import { ensureArtists } from "@/lib/supabase/in_process_artists/ensureArtists";
import { upsertTokenAdmins } from "@/lib/supabase/in_process_token_admins/upsertTokenAdmins";
import isSplitContract from "@/lib/splits/isSplitContract";
import getSplitRecipients from "@/lib/splits/getSplitRecipients.js";
import { Database } from "../types";
import { Address } from "viem";

export async function processTokenAdmins(
  upsertedTokens: Database["public"]["Tables"]["in_process_tokens"]["Insert"][]
) {
  const recipientsInserts = [];
  const recipientAddresses = [];
  for (const token of upsertedTokens) {
    try {
      const isSplit = await isSplitContract(token.payoutRecipient as Address, token.chainId);
      if (isSplit) {
        const recipients = await getSplitRecipients(
          token.payoutRecipient as Address,
          token.chainId
        );
        if (recipients && recipients.length > 0) {
          for (const r of recipients) {
            const address = r.recipient.address.toLowerCase();
            recipientsInserts.push({
              token_id: token.id,
              artist_address: address,
            });
            recipientAddresses.push(address);
          }
        }
      }
    } catch (err) {
      console.error(err);
      continue;
    }
  }

  if (recipientAddresses.length > 0) {
    await ensureArtists(recipientAddresses);
  }

  if (recipientsInserts.length > 0) {
    await upsertTokenAdmins(recipientsInserts);
  }
}
