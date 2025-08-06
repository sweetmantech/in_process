"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ImgDialogProps {
  img?: string | null;
}

const ImgDialog = ({ img }: ImgDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);

  // Automatically open dialog when a new image is provided
  useEffect(() => {
    if (img) {
      setOpen(true);
    }
  }, [img]);

  const handleChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="text-center mb-4">cropped image</DialogTitle>
        {img && (
          <img src={img} alt="Cropped" className="w-full h-auto rounded" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImgDialog;
