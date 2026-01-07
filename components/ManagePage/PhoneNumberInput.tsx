import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { usePhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";
import { usePhoneNumberValidation } from "@/hooks/usePhoneNumberValidation";

const PhoneNumberInput = () => {
  const { phoneNumber, isLoading, handlePhoneNumberChange, verify } =
    usePhoneVerificationProvider();
  const { showError, errorMessage, isValid, setHasBlurred } = usePhoneNumberValidation(phoneNumber);

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
          placeholder="ex: +17742052354 or 2704431235"
          className="mt-1 resize-none font-spectral"
          value={phoneNumber}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          onBlur={() => setHasBlurred(true)}
          disabled={isLoading}
        />
        {showError && errorMessage && (
          <p className="mt-2 text-sm text-red-500 font-archivo">{errorMessage}</p>
        )}
        <button
          type="button"
          onClick={verify}
          disabled={isLoading || !phoneNumber.trim() || !isValid}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "sending..." : "send verification message"}
        </button>
      </fieldset>
    </>
  );
};

export default PhoneNumberInput;
