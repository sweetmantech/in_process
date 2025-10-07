"use client";

import useProfile from "@/hooks/useProfile";
import { createContext, useMemo, useContext } from "react";
import { Address } from "viem";

const ProfileContext = createContext<ReturnType<typeof useProfile>>(
  {} as ReturnType<typeof useProfile>
);

interface IProfileProvider {
  children: React.ReactNode;
  address: Address | undefined;
}
const ProfileProvider = ({ children, address }: IProfileProvider) => {
  const profile = useProfile(address);

  const value = useMemo(
    () => ({
      ...profile,
    }),
    [profile]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfileProvider = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileProvider must be used within a ProfileProvider");
  }
  return context;
};

export default ProfileProvider;
