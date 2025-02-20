import useUser from "@/hooks/useUser";
import { createContext, useMemo, useContext } from "react";

const UserContext = createContext<ReturnType<typeof useUser>>(
  {} as ReturnType<typeof useUser>,
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  const value = useMemo(
    () => ({
      ...user,
    }),
    [user],
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
