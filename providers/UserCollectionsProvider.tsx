"use client";

import { useUserCollections } from "@/hooks/useUserCollections";
import { createContext, useMemo, useContext } from "react";

const UserCollectionsContext = createContext<
  ReturnType<typeof useUserCollections>
>({} as ReturnType<typeof useUserCollections>);

const UserCollectionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userCollections = useUserCollections();

  const value = useMemo(
    () => ({
      ...userCollections,
    }),
    [userCollections],
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
      "useUserCollectionsProvider must be used within a UserCollectionsProvider",
    );
  }
  return context;
};

export default UserCollectionsProvider;
