import { TableCell, TableRow } from "@/components/ui/table";
import CopyButton from "@/components/CopyButton/CopyButton";
import { Email } from "@/types/email";

interface EmailRowProps {
  email: Email;
}

const EmailRow = ({ email }: EmailRowProps) => {
  return (
    <TableRow className="transition-colors hover:bg-muted/50">
      <TableCell className="px-6 py-4">
        <CopyButton
          text={email.address}
          className="bg-transparent px-0 py-0 font-mono text-xs text-foreground hover:text-grey-moss-400"
        />
      </TableCell>
      <TableCell className="px-6 py-4">
        {email.artist_address ? (
          <CopyButton
            text={email.artist_address}
            className="bg-transparent px-0 py-0 font-mono text-xs text-foreground hover:text-grey-moss-400"
          />
        ) : (
          <span className="text-xs text-neutral-400">—</span>
        )}
      </TableCell>
      <TableCell className="px-6 py-4 text-sm text-neutral-500">{email.email}</TableCell>
    </TableRow>
  );
};

export default EmailRow;
