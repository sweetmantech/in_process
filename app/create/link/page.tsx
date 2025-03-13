"use client";

import WritingPage from "@/components/WritingPage";
import { ZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const Linking = () => (
  <ZoraCreateProvider>
    <WritingPage />
  </ZoraCreateProvider>
);

export default Linking;
