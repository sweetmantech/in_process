import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Message } from "@/types/message";
import MessageRow from "./MessageRow";

interface MessagesTableContentsProps {
  messages: Message[];
}

const MessagesTableContents = ({ messages }: MessagesTableContentsProps) => {
  return (
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[800px] md:min-w-0">
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">ID</TableHead>
            <TableHead className="w-24">Role</TableHead>
            <TableHead className="w-24">Client</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="w-32">Artist</TableHead>
            <TableHead className="w-40">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <MessageRow key={message.id} message={message} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MessagesTableContents;
