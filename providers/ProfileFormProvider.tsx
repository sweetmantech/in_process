"use client";

import useArtistEdit from "@/hooks/useArtistEdit";
import { createContext, useMemo, useContext } from "react";
import { Address } from "viem";

const ProfileFormContext = createContext<ReturnType<typeof useArtistEdit>>(
  {} as ReturnType<typeof useArtistEdit>
);

interface IProfileFormProvider {
  children: React.ReactNode;
  address: Address | undefined;
}
const ProfileFormProvider = ({ children, address }: IProfileFormProvider) => {
  const profileForm = useArtistEdit(address);

  const value = useMemo(
    () => ({
      ...profileForm,
    }),
    [profileForm]
  );

  return <ProfileFormContext.Provider value={value}>{children}</ProfileFormContext.Provider>;
};

export const useProfileFormProvider = () => {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error("useProfileFormProvider must be used within a ProfileFormProvider");
  }
  return context;
};

export default ProfileFormProvider;
