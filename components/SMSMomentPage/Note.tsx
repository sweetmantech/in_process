import { InfoIcon } from "lucide-react";

const Note = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg border border-grey-moss-200 bg-grey-moss-50 p-4 mb-4">
      <div className="flex items-start gap-3">
        <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-moss-600" />
        <p className="font-archivo text-sm text-grey-moss-900">{children}</p>
      </div>
    </div>
  );
};

export default Note;
