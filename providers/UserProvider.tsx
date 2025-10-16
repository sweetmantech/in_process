import useProfile from "@/hooks/useProfile";
import useSmartWallets from "@/hooks/useSmartWallets";
import useUser from "@/hooks/useUser";
import { createContext, useMemo, useContext } from "react";

const UserContext = createContext<
  ReturnType<typeof useUser> &
    ReturnType<typeof useSmartWallets> & {
      profile: ReturnType<typeof useProfile>;
    }
>(
  {} as ReturnType<typeof useUser> &
    ReturnType<typeof useSmartWallets> & {
      profile: ReturnType<typeof useProfile>;
    }
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const smartWallets = useSmartWallets({
    connectedAddress: user.connectedAddress,
    isSocialWallet: user.isSocialWallet,
  });
  const profile = useProfile(smartWallets.artistWallet || user.connectedAddress);

  const value = useMemo(
    () => ({
      ...user,
      ...smartWallets,
      profile,
    }),
    [user, smartWallets, profile]
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
