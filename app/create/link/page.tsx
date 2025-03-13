"use client";

import LinkPage from "@/components/LinkPage";
import { ZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const Linking = () => (
  <ZoraCreateProvider>
    <LinkPage />
  </ZoraCreateProvider>
);

export default Linking;
