import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { Address } from "viem";
import { selectArtist } from "../supabase/in_process_artists/selectArtist";

const getSmartWalletAddress = async (address: Address) => {
  const artist = await selectArtist(address.toLowerCase());
  if (artist) return artist.smart_wallet as Address;
  const smartAccount = await getOrCreateSmartWallet({
    address: address.toLowerCase() as Address,
  });
  return smartAccount.address.toLowerCase() as Address;
};

export default getSmartWalletAddress;
