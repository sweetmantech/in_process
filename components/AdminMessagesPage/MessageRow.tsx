import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/types/message";
import { getPartsPreview } from "@/lib/messages/getPartsPreview";

interface MessageRowProps {
  message: Message;
}

const MessageRow = ({ message }: MessageRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs">{message.id.slice(0, 8)}...</TableCell>
      <TableCell>
        <Badge variant={message.role === "user" ? "default" : "secondary"}>{message.role}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{message.metadata.client}</Badge>
      </TableCell>
      <TableCell className="max-w-xs truncate">{getPartsPreview(message.parts)}</TableCell>
      <TableCell className="text-neutral-500">
        {message.metadata.artist_address
          ? `${message.metadata.artist_address.slice(0, 6)}...${message.metadata.artist_address.slice(-4)}`
          : "-"}
      </TableCell>
      <TableCell className="text-neutral-500">
        {new Date(message.metadata.created_at).toLocaleString()}
      </TableCell>
    </TableRow>
  );
};

export default MessageRow;
