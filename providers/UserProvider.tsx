import useProfile from "@/hooks/useProfile";
import useArtistWallet from "@/hooks/useArtistWallet";
import useUser from "@/hooks/useUser";
import { createContext, useMemo, useContext } from "react";
import { Address } from "viem";

const UserContext = createContext<
  ReturnType<typeof useUser> &
    ReturnType<typeof useArtistWallet> & {
      profile: ReturnType<typeof useProfile>;
    }
>(
  {} as ReturnType<typeof useUser> &
    ReturnType<typeof useArtistWallet> & {
      profile: ReturnType<typeof useProfile>;
    }
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const artistwallet = useArtistWallet({
    connectedAddress: (user.connectedAddress as Address | undefined) ?? undefined,
    isSocialWallet: user.isSocialWallet,
  });
  const profile = useProfile(
    artistwallet.artistWallet || (user.connectedAddress as Address | undefined)
  );

  const value = useMemo(
    () => ({
      ...user,
      ...artistwallet,
      profile,
    }),
    [user, artistwallet, profile]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserProvider = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserProvider must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
