import { Address } from "viem";
import { upsertInProcessTokens } from "../supabase/in_process_tokens/upsertInProcessTokens";
import getTokenInfo from "../viem/getTokenInfo";

const indexMoment = async (
  address: Address,
  tokenId: number,
  chainId: number
) => {
  // Fetch onchain details using helper
  const { tokenUri: uri, owner: admin } = await getTokenInfo(
    address,
    tokenId.toString(),
    chainId
  );

  // Upsert the moment in a single call
  const { data: upsertedRows, error: upsertError } =
    await upsertInProcessTokens({
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

  if (upsertError) throw upsertError;

  const momentRow = upsertedRows?.[0];

  if (!momentRow) throw new Error("Failed to index moment");

  return {
    ...momentRow,
    admin: momentRow.defaultAdmin,
  };
};

export default indexMoment;
