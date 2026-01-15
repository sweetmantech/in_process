import { useUserProvider } from "@/providers/UserProvider";
import { LoginButton } from "../LoginButton/LoginButton";
import { InfoIcon } from "lucide-react";
import { useMomentProvider } from "@/providers/MomentProvider";

const Notes = () => {
  const { artistWallet } = useUserProvider();
  const { isOwner } = useMomentProvider();

  if (artistWallet || !isOwner)
    return (
      <div className="rounded-lg border border-grey-moss-200 bg-grey-moss-50 p-4 mb-4">
        <div className="flex items-start gap-3">
          <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-moss-600" />
          <p className="font-archivo text-sm text-grey-moss-900">
            you are not an admin of this moment.
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div className="rounded-lg border border-grey-moss-200 bg-grey-moss-50 p-4 mb-4">
        <div className="flex items-start gap-3">
          <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-moss-600" />
          <p className="font-archivo text-sm text-grey-moss-900">
            sign in to airdrop and edit the description.
          </p>
        </div>
      </div>
      <LoginButton />
    </>
  );
};

export default Notes;
