"use client";

import Header from "../Header";
import Footer from "../Footer";
import { ReactNode, useState } from "react";
import useSignedAddress from "@/hooks/useSignedAddress";

const Layout = ({ children }: { children: ReactNode }) => {
  const signedAddress = useSignedAddress();
  const [isOpenNavbar, setisOpenNavbar] = useState<boolean>(false);
  const toggleNavbar = () => {
    if (!signedAddress) return;
    setisOpenNavbar(!isOpenNavbar);
  };
  return (
    <div
      className={`grow flex flex-col ${isOpenNavbar && "h-screen overflow-hidden"}`}
    >
      <Header isOpenNavbar={isOpenNavbar} toggleNavbar={toggleNavbar} />
      <div className="grow relative flex flex-col">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
