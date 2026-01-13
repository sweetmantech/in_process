"use client";

import { Dialog, DialogContent, DialogTitle, DialogOverlay } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAirdropRecipientsProvider } from "@/providers/AirdropRecipientsProvider";
import useAirdropRecipientsPopup from "@/hooks/useAirdropRecipientsPopup";
import AirdropRecipientItem from "./AirdropRecipientItem";

interface AirdropRecipientsPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AirdropRecipientsPopup = ({ isOpen, onOpenChange }: AirdropRecipientsPopupProps) => {
  const { recipients, isLoading } = useAirdropRecipientsProvider();
  const { handleRecipientClick, isRecipientActive } = useAirdropRecipientsPopup();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="!pointer-events-none opacity-80" />
      <DialogContent className="flex max-w-xl flex-col !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Regular Addies</DialogTitle>
        </VisuallyHidden>
        <div className="mb-4">
          <h2 className="text-center font-archivo text-2xl">regular addies</h2>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="py-4 text-center font-archivo text-sm text-neutral-500">Loading...</div>
          ) : recipients.length === 0 ? (
            <div className="py-4 text-center font-archivo text-sm text-neutral-500">
              No recipients found
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {recipients.map((recipient) => (
                <AirdropRecipientItem
                  key={recipient.address}
                  recipient={recipient}
                  isActive={isRecipientActive(recipient.address)}
                  onClick={handleRecipientClick}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AirdropRecipientsPopup;
