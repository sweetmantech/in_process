"use client";

import ApiKeyPage from "@/components/ApiKeyPage";
import ApiKeyProvider from "@/providers/ApiKeyProvider";

const ApiKeys = () => (
  <ApiKeyProvider>
    <ApiKeyPage />
  </ApiKeyProvider>
);

export default ApiKeys;
