"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { usePhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";
import { PHONE_VERIFICATION_STATUS } from "@/types/phone";
import PhoneNumberInput from "./PhoneNumberInput";
import DisconnectPhone from "./DisconnectPhone";
import { useUserProvider } from "@/providers/UserProvider";

const PhoneButton = () => {
  const { status, setIsDialogOpen, isDialogOpen } = usePhoneVerificationProvider();
  const { profile } = useUserProvider();
  const { phoneVerified } = profile;

  if (phoneVerified) {
    return <DisconnectPhone />;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
        {status === PHONE_VERIFICATION_STATUS.READY_TO_VERIFY && <PhoneNumberInput />}
        {status === PHONE_VERIFICATION_STATUS.CONFIRMING && (
          <p>A verification message has been sent to your phone. Please check your messages.</p>
        )}
        {status === PHONE_VERIFICATION_STATUS.VERIFIED && (
          <p>Your phone number has been verified</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhoneButton;
