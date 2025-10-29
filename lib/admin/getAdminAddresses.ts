/**
 * Get admin addresses from environment variable
 * @returns Array of admin addresses (lowercased and trimmed)
 */
export const getAdminAddresses = (): string[] => {
  const adminAddresses = process.env.ADMIN_ADDRESSES;
  if (!adminAddresses) return [];
  return adminAddresses.split(",").map((addr) => addr.toLowerCase().trim());
};
