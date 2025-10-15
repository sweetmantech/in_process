"use client";

import AccountPage from "@/components/ManagePage/AccountPage";
import ProfileProvider from "@/providers/ProfileProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";

const Account = () => {
  const { connectedAddress, artistWallet } = useUserProvider();
  return (
    <ProfileProvider address={(artistWallet as Address) || connectedAddress}>
      <AccountPage />
    </ProfileProvider>
  );
};

export default Account;
