"use client";

import AccountPage from "@/components/ManagePage/AccountPage";
import ProfileProvider from "@/providers/ProfileProvider";
import { useUserProvider } from "@/providers/UserProvider";

const Account = () => {
  const { connectedAddress } = useUserProvider();
  return (
    <ProfileProvider address={connectedAddress}>
      <AccountPage />
    </ProfileProvider>
  );
};

export default Account;
