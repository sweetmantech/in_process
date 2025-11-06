import getArtistProfile from "@/lib/getArtistProfile";
import { upsertArtists } from "@/lib/supabase/in_process_artists/upsertArtists";
import { selectArtists } from "@/lib/supabase/in_process_artists/selectArtists";

/**
 * Ensures that all provided artist addresses exist in the in_process_artists table.
 * Creates new artist records with profiles if they don't exist.
 * @param {Array<string>} addresses - Array of artist addresses to ensure exist
 * @returns {Promise<void>}
 */
export async function ensureArtists(addresses: string[]): Promise<void> {
  if (!addresses || addresses.length === 0) {
    return;
  }

  // Get unique addresses and normalize to lowercase
  const uniqueAddresses = [...new Set(addresses.map((addr: string) => addr.toLowerCase()))];

  // Check which addresses already exist in the database
  const existingArtists = await selectArtists(uniqueAddresses, "address");

  const existingAddresses = new Set(existingArtists.map((artist) => artist.address.toLowerCase()));

  // Find addresses that need to be created
  const addressesToCreate = uniqueAddresses.filter(
    (address: string) => !existingAddresses.has(address.toLowerCase())
  );

  if (addressesToCreate.length === 0) return;

  // Create artist profiles for new addresses
  const newArtists = await Promise.all(
    addressesToCreate.map(async (address: string) => {
      try {
        const profile = await getArtistProfile(address);
        return {
          address: address.toLowerCase(),
          username: profile.username || "",
          bio: profile.bio || "",
          instagram_username: profile.instagram_username || "",
          twitter_username: profile.twitter_username || "",
          telegram_username: profile.telegram_username || "",
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(`Failed to get profile for ${address}:`, errorMessage);
        // Create minimal artist record if profile fetch fails
        return {
          address: address.toLowerCase(),
          username: "",
          bio: "",
          instagram_username: "",
          twitter_username: "",
          telegram_username: "",
        };
      }
    })
  );

  // Upsert the new artists
  await upsertArtists(newArtists);
}
