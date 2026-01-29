"use client";

import { ReactNode } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import { useHasMutualMoments } from "@/hooks/useHasMutualMoments";
import NavButton from "@/components/ManagePage/NavButton";

const ManagePage = ({ children }: { children: ReactNode }) => {
  const { artistWallet } = useUserProvider();
  const { hasMutualMoments } = useHasMutualMoments(artistWallet);

  return (
    <main className="flex flex-col md:flex-row w-screen grow gap-4 px-2 pt-10 md:gap-6 md:px-8 md:pt-16">
      <div className="flex flex-row w-full md:w-[400px] overflow-x-auto no-scrollbar md:flex-col md:gap-2 md:overflow-visible">
        <NavButton label="account" href="/manage/account" />
        <NavButton label="payment" href="/manage/payment" />
        <NavButton label="moments" href="/manage/moments" />
        {hasMutualMoments && <NavButton label="mutual moments" href="/manage/mutual-moments" />}
      </div>
      <div className="w-full md:grow">{children}</div>
    </main>
  );
};

export default ManagePage;
