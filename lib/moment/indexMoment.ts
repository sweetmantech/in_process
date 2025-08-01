import { Address } from "viem";
import { getInProcessTokens } from "@/lib/supabase/in_process_tokens/getInProcessTokens";
import { updateInProcessTokens } from "@/lib/supabase/in_process_tokens/updateInProcessTokens";
import { insertInProcessTokens } from "@/lib/supabase/in_process_tokens/insertInProcessTokens";
import getTokenInfo from "../viem/getTokenInfo";

const indexMoment = async (
  address: Address,
  tokenId: number,
  chainId: number
) => {
  // Fetch onchain details
  const { tokenUri: uri, owner: admin } = await getTokenInfo(
    address,
    tokenId.toString(),
    chainId
  );

  // Look for existing moment
  const { data: existingRows, error: fetchError } = await getInProcessTokens({
    addresses: [address],
    tokenIds: [tokenId],
    chainId,
    hidden: true, // include hidden + visible
  });

  if (fetchError) throw fetchError;

  let row;
  if (existingRows && existingRows.length > 0) {
    // Update existing row
    const ids = existingRows.map((r) => r.id);
    const { data: updatedRows, error: updateError } =
      await updateInProcessTokens({
        ids,
        update: { uri, defaultAdmin: admin as Address },
      });
    if (updateError) throw updateError;
    row = updatedRows?.[0];
  } else {
    // Insert new row when missing
    const { data: insertedRows, error: insertError } =
      await insertInProcessTokens({
        tokens: [
          {
            address,
            tokenId,
            chainId,
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
