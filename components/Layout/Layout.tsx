"use client";

import Header from "../Header";
import Footer from "../Footer";
import { ReactNode } from "react";
import { useLayoutProvider } from "@/providers/LayoutProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isOpenNavbar } = useLayoutProvider();

  return (
    <div
      className={`grow flex flex-col ${isOpenNavbar && "h-screen overflow-hidden"}`}
    >
      <Header />
      <div className="grow relative flex flex-col pt-[48px] md:pt-[72px]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
