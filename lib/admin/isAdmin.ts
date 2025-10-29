/**
 * Get admin addresses from environment variable
 * @returns Array of admin addresses (lowercased and trimmed)
 */
export const getAdminAddresses = (): string[] => {
  const adminAddresses = process.env.ADMIN_ADDRESSES;
  if (!adminAddresses) return [];
  return adminAddresses.split(",").map((addr) => addr.toLowerCase().trim());
};

/**
 * Check if an address is an admin
 * @param address - The address to check
 * @returns true if the address is an admin, false otherwise
 */
export const isAdmin = (address: string): boolean => {
  const adminAddresses = getAdminAddresses();
  if (adminAddresses.length === 0) {
    console.warn("ADMIN_ADDRESSES environment variable is not set");
    return false;
  }
  return adminAddresses.includes(address.toLowerCase());
};
