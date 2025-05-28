"use client";

import { useCollections } from "@/hooks/useCollections";
import {
  createContext,
  useMemo,
  useContext,
  Fragment,
  useState,
  useEffect,
} from "react";
import { useUserProvider } from "./UserProvider";
import getTotalEarnings from "@/lib/viem/getTotalEarnings";

interface UserCollectionsContextReturn
  extends ReturnType<typeof useCollections> {
  totalEarnings: {
    eth: string;
    usdc: string;
  };
  isLoading: boolean;
}
const UserCollectionsContext = createContext<UserCollectionsContextReturn>(
  {} as UserCollectionsContextReturn,
);

const UserCollectionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connectedAddress } = useUserProvider();
  if (!connectedAddress) return <Fragment />;
  const userCollections = useCollections(connectedAddress);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalEarnings, setTotalEarnings] = useState<{
    eth: string;
    usdc: string;
  }>({
    eth: "0",
    usdc: "0",
  });

  useEffect(() => {
    const init = async () => {
      const earnings = await getTotalEarnings(
        userCollections.collections,
        connectedAddress,
      );
      setTotalEarnings(earnings);
      setIsLoading(false);
    };
    init();
  }, [userCollections.collections.length]);

  const value = useMemo(
    () => ({
      ...userCollections,
      totalEarnings,
      isLoading,
    }),
    [userCollections, totalEarnings],
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
