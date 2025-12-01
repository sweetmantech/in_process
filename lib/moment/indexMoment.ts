import { Address } from "viem";
import { getInProcessTokens } from "@/lib/supabase/in_process_tokens/getInProcessTokens";
import { updateInProcessTokens } from "@/lib/supabase/in_process_tokens/updateInProcessTokens";
import { insertInProcessTokens } from "@/lib/supabase/in_process_tokens/insertInProcessTokens";
import getTokenInfo from "../viem/getTokenInfo";
import { Moment } from "@/types/moment";

const indexMoment = async (moment: Moment) => {
  // Fetch onchain details
  const { tokenUri: uri, owner: admin } = await getTokenInfo(moment);

  // Look for existing moment
  const { data: existingRows, error: fetchError } = await getInProcessTokens({
    addresses: [moment.collectionAddress],
    tokenIds: [moment.tokenId],
    chainId: moment.chainId,
    hidden: true, // include hidden + visible
  });

  if (fetchError) throw fetchError;

  let row;
  if (existingRows && existingRows.length > 0) {
    // Update existing row
    const ids = existingRows.map((r) => r.id);
    const { data: updatedRows, error: updateError } = await updateInProcessTokens({
      ids,
      update: { uri, defaultAdmin: admin as Address },
    });
    if (updateError) throw updateError;
    row = updatedRows?.[0];
  } else {
    // Insert new row when missing
    const { data: insertedRows, error: insertError } = await insertInProcessTokens({
      tokens: [
        {
          address: moment.collectionAddress,
          tokenId: Number(moment.tokenId),
          chainId: moment.chainId,
          uri,
          defaultAdmin: admin as Address,
          createdAt: new Date().toISOString(),
          hidden: false,
        },
      ],
    });
    if (insertError) throw insertError;
    row = insertedRows?.[0];
  }

  if (!row) throw new Error("Failed to index moment");

  return {
    ...row,
    admin: row.defaultAdmin,
  };
};

export default indexMoment;
