"use client";

import AccountPage from "@/components/ManagePage/AccountPage";
import ProfileProvider from "@/providers/ProfileProvider";
import { useUserProvider } from "@/providers/UserProvider";

const Account = () => {
  const { connectedAddress, externalWallet } = useUserProvider();
  return (
    <ProfileProvider address={externalWallet || connectedAddress}>
      <AccountPage />
    </ProfileProvider>
  );
};

export default Account;
