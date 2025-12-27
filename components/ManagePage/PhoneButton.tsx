"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { usePhoneVerification } from "@/hooks/usePhoneVerification";
import { useState } from "react";

const PhoneButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { phoneNumber, isLoading, handlePhoneNumberChange, verify } = usePhoneVerification();

  const handleVerify = async () => {
    const success = await verify();
    if (success) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
        >
          connect phone
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Connect Phone</DialogTitle>
        </VisuallyHidden>
        <h2 className="mb-2 w-full text-center font-archivo text-2xl">Connect Phone</h2>
        <p className="text-grey-moss-600 mb-6 w-full text-center font-archivo text-sm italic">
          Enter your phone number to receive verification messages
        </p>
        <fieldset className="w-full">
          <Label className="text-grey-moss-600 mb-1 w-full text-left font-archivo text-sm">
            phone number
          </Label>
          <Input
            placeholder="ex: +17742052354"
            className="mt-1 resize-none font-spectral"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            disabled={isLoading}
          />
        </fieldset>
        <button
          type="button"
          onClick={handleVerify}
          disabled={isLoading || !phoneNumber.trim()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "verifying..." : "verify"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneButton;
