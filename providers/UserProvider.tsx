import useProfile from "@/hooks/useProfile";
import useUser from "@/hooks/useUser";
import { createContext, useMemo, useContext } from "react";

const UserContext = createContext<
  | (ReturnType<typeof useUser> & {
      profile: ReturnType<typeof useProfile>;
    })
  | null
>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const profile = useProfile(user.artistWallet);

  const value = useMemo(
    () => ({
      ...user,
      profile,
    }),
    [user, profile]
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
