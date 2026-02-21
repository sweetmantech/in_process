"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { fetchAllEmails } from "@/lib/admin/fetchAllEmails";
import { downloadEmailsCsv } from "@/lib/admin/downloadEmailsCsv";

const DownloadCsvButton = () => {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token");
      const emails = await fetchAllEmails(accessToken);
      downloadEmailsCsv(emails);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="flex items-center gap-1.5 rounded-sm bg-grey-moss-900 px-3 py-1.5 font-archivo text-sm text-grey-eggshell hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Download className="size-3.5" />
      {isLoading ? "Downloading..." : "Download CSV"}
    </button>
  );
};

export default DownloadCsvButton;
