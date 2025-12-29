import { useUserProvider } from "@/providers/UserProvider";
import CopyButton from "../CopyButton";

const DisconnectPhone = () => {
  const { profile } = useUserProvider();
  const { phoneNumber } = profile;

  return (
    <div className="flex w-full md:w-fit flex-col items-end gap-2 md:flex-row md:justify-end">
      <CopyButton text={phoneNumber} />
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
      >
        disconnect phone
      </button>
    </div>
  );
};

export default DisconnectPhone;
