import { Download } from "lucide-react";
import { downloadEmailsCsv } from "@/lib/admin/downloadEmailsCsv";
import { Email } from "@/types/email";

interface DownloadCsvButtonProps {
  emails: Email[];
  hasNextPage: boolean;
}

const DownloadCsvButton = ({ emails, hasNextPage }: DownloadCsvButtonProps) => (
  <div className="flex flex-col items-end gap-0.5">
    <button
      type="button"
      onClick={() => downloadEmailsCsv(emails)}
      disabled={hasNextPage}
      className="flex items-center gap-1.5 rounded-sm bg-grey-moss-900 px-3 py-1.5 font-archivo text-sm text-grey-eggshell hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Download className="size-3.5" />
      Download CSV
    </button>
    {hasNextPage && (
      <span className="font-archivo text-xs text-grey-secondary">
        scroll to load all rows first
      </span>
    )}
  </div>
);

export default DownloadCsvButton;
