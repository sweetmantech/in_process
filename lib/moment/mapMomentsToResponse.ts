import type { Moment, AggregatedRawMoment } from "@/types/timeline";

export async function mapMomentsToResponse({
  moments,
  hidden,
}: {
  moments: AggregatedRawMoment[];
  hidden: boolean;
}): Promise<Moment[]> {
  if (!moments || moments.length === 0) {
    return [];
  }

  const processedMoments = moments
    .map((moment) => {
      const collection = moment.collection;
      const tokenId = moment.token_id;
      const defaultAdmin = collection.default_admin;
      const collectionAdmins = collection.admins || [];

      // Filter admins: token-specific (token_id) or contract-level (token_id = 0)
      const relevantAdmins = collectionAdmins.filter(
        (admin: any) => admin.token_id === tokenId || admin.token_id === 0
      );

      // Build admins array, avoiding duplicates by address
      const adminsMap = new Map<string, any>();
      relevantAdmins.forEach((admin: AggregatedRawMoment["collection"]["admins"][number]) => {
        const address = admin.artist.address;
        if (address) {
          adminsMap.set(address, {
            address: admin.artist.address,
            username: admin.artist.username || null,
            defaultAdmin: address === defaultAdmin.address,
            hidden: admin.hidden || false,
          });
        }
      });

      // Add default admin if not already present
      if (!adminsMap.has(defaultAdmin.address)) {
        adminsMap.set(defaultAdmin.address, {
          address: defaultAdmin.address,
          username: null,
          defaultAdmin: true,
          hidden: false,
        });
      }

      const admins = Array.from(adminsMap.values());

      // Filter by hidden if needed - only filter if default_admin has hidden === true
      if (!hidden) {
        const defaultAdminEntry = admins.find((a) => a.defaultAdmin === true);
        if (defaultAdminEntry?.hidden === true) {
          return null;
        }
      }

      return {
        address: collection.address,
        token_id: String(tokenId),
        max_supply: Number(moment.max_supply),
        chain_id: collection.chain_id,
        id: moment.id,
        uri: moment.uri,
        admins: admins.sort((a, b) => {
          if (a.defaultAdmin && !b.defaultAdmin) return -1;
          if (!a.defaultAdmin && b.defaultAdmin) return 1;
          return 0;
        }),
        created_at: moment.created_at,
        updated_at: moment.updated_at,
      };
    })
    .filter((m): m is Moment => m !== null);

  return processedMoments;
}
