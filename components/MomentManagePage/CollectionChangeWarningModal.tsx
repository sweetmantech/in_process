"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CollectionChangeWarningModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const CollectionChangeWarningModal = ({
  open,
  onConfirm,
  onCancel,
}: CollectionChangeWarningModalProps) => (
  <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change collection?</DialogTitle>
        <DialogDescription>
          If the collection is updated, it will break the metadata on the original moment. Are you
          sure you want to continue?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-black text-grey-eggshell" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default CollectionChangeWarningModal;
