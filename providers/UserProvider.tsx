import useSmartWallets from "@/hooks/useSmartWallets";
import useUser from "@/hooks/useUser";
import { createContext, useMemo, useContext } from "react";
import { Address } from "viem";

const UserContext = createContext<ReturnType<typeof useUser> & ReturnType<typeof useSmartWallets>>(
  {} as ReturnType<typeof useUser> & ReturnType<typeof useSmartWallets>
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const smartWallets = useSmartWallets({
    connectedAddress: user.connectedAddress,
    isSocialWallet: user.isSocialWallet,
  });

  const value = useMemo(
    () => ({
      ...user,
      ...smartWallets,
    }),
    [user, smartWallets]
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
