"use client";

import AccountPage from "@/components/ManagePage/AccountPage";
import ProfileFormProvider from "@/providers/ProfileFormProvider";
import { useUserProvider } from "@/providers/UserProvider";

const Account = () => {
  const { artistWallet } = useUserProvider();

  return (
    <ProfileFormProvider address={artistWallet}>
      <AccountPage />
    </ProfileFormProvider>
  );
};

export default Account;
