import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Email } from "@/types/email";
import EmailRow from "./EmailRow";

interface EmailsTableContentsProps {
  emails: Email[];
}

const EmailsTableContents = ({ emails }: EmailsTableContentsProps) => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-48 px-6 py-3 text-xs font-semibold uppercase tracking-wider">
              Social Wallet
            </TableHead>
            <TableHead className="w-48 px-6 py-3 text-xs font-semibold uppercase tracking-wider">
              Artist Wallet
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
              Email
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((email) => (
            <EmailRow key={email.address} email={email} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmailsTableContents;
