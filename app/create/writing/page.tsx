"use client";

import WritingPage from "@/components/WritingPage";
import { ZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const Writing = () => (
  <ZoraCreateProvider>
    <WritingPage />
  </ZoraCreateProvider>
);

export default Writing;
