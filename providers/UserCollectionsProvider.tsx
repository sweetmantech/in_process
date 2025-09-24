"use client";

import { useCollections } from "@/hooks/useCollections";
import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { useUserProvider } from "./UserProvider";

interface UserCollectionsContextReturn
  extends ReturnType<typeof useCollections> {
  isLoading: boolean;
}
const UserCollectionsContext = createContext<UserCollectionsContextReturn>(
  {} as UserCollectionsContextReturn
);

const UserCollectionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connectedAddress } = useUserProvider();
  const userCollections = useCollections(
    connectedAddress,
    Boolean(connectedAddress)
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Keep legacy loading flag until collections finish initial fetch
    if (!connectedAddress) return;
    if (!userCollections.isFetchingCollections) setIsLoading(false);
  }, [userCollections.isFetchingCollections, connectedAddress]);

  const value = useMemo(
    () => ({
      ...userCollections,
      isLoading,
    }),
    [userCollections, isLoading]
  );

  return (
    <UserCollectionsContext.Provider value={value}>
      {children}
    </UserCollectionsContext.Provider>
  );
};

export const useUserCollectionsProvider = () => {
  const context = useContext(UserCollectionsContext);
  if (!context) {
    throw new Error(
      "useUserCollectionsProvider must be used within a UserCollectionsProvider"
    );
  }
  return context;
};

export default UserCollectionsProvider;
