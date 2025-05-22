import { useProfileProvider } from "@/providers/ProfileProvider";
import { TwitterIcon } from "../ui/icons";
import { Send, InstagramIcon } from "lucide-react";
import Social from "./Social";

const SocialAccounts = () => {
  const { twitter, instagram, telegram } = useProfileProvider();

  return (
    <>
      <div className="flex gap-2 items-center pt-2">
        {instagram && (
          <Social
            link={`https://instagram.com/${instagram}`}
            icon={<InstagramIcon className="text-grey-eggshell size-7" />}
          />
        )}
        {twitter && (
          <Social link={`https://x.com/@${twitter}`} icon={<TwitterIcon />} />
        )}
        {telegram && (
          <Social
            link={`https://t.me/${telegram}`}
            icon={<Send className="text-grey-eggshell size-6" />}
          />
        )}
      </div>
    </>
  );
};

export default SocialAccounts;
