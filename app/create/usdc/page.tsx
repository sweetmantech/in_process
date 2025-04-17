"use client";

import CreatePage from "@/components/CreatePage/CreatePage";
import { ZoraCreateProvider } from "@/providers/ZoraCreateProvider";
const Create = () => (
  <ZoraCreateProvider>
    <CreatePage />
  </ZoraCreateProvider>
);

export default Create;
