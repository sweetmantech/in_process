import fetchArtistProfile, { Profile } from "@/lib/fetchArtistProfile";
import { Collection } from "@/types/token";
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";

const useProfiles = (collections: Collection[]) => {
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [isFetchingProfiles, setIsFetchingProfiles] = useState<boolean>(false);
  const [profileFetchedArtists, setProfileFetchedArtists] = useState<Address[]>(
    [],
  );

  const fetch = useCallback(async () => {
    if (!collections.length || isFetchingProfiles) return;
    setIsFetchingProfiles(true);
    const aggregatedArtists = new Set<Address>();
    for (const collection of collections)
      aggregatedArtists.add(collection.creator);
    const data: Record<string, Profile> = { ...profiles };
    const filtered = Array.from(aggregatedArtists).filter(
      (address) => !profileFetchedArtists.includes(address),
    );
    setProfileFetchedArtists(Array.from(aggregatedArtists));
    const promise = filtered.map(async (address) => {
      const profile = await fetchArtistProfile(address);
      data[`${address}`] = profile;
    });
    await Promise.all(promise);
    setProfiles(data);
    setIsFetchingProfiles(false);
  }, [collections.length, isFetchingProfiles]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    profiles,
  };
};

export default useProfiles;
