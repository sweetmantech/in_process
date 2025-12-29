import { PHONE_VERIFICATION_STATUS } from "@/types/phone";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { usePhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";

const PhoneNumberInput = () => {
  const { phoneNumber, isLoading, handlePhoneNumberChange, verify, setStatus, setIsDialogOpen } =
    usePhoneVerificationProvider();

  const handleVerify = async () => {
    const success = await verify();
    if (success) {
      setStatus(PHONE_VERIFICATION_STATUS.CONFIRMING);
    }
  };

  return (
    <>
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
        <button
          type="button"
          onClick={handleVerify}
          disabled={isLoading || !phoneNumber.trim()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "verifying..." : "verify"}
        </button>
      </fieldset>
    </>
  );
};

export default PhoneNumberInput;
