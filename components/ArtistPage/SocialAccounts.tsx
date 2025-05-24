import { useProfileProvider } from "@/providers/ProfileProvider";
import { TwitterIcon, TwitterXsIcon } from "../ui/icons";
import { Send, InstagramIcon } from "lucide-react";
import Social from "./Social";
import useIsMobile from "@/hooks/useIsMobile";

const SocialAccounts = () => {
  const {
    twitter,
    instagram,
    telegram,
    isEditing,
    socialRef,
    setTwitter,
    setInstagram,
    setTelegram,
  } = useProfileProvider();

  const isMobile = useIsMobile();

  if (isEditing)
    return (
      <div
        className="flex flex-col md:flex-row md:pt-4 flex gap-2"
        ref={socialRef}
      >
        <fieldset className="flex gap-2 items-center">
          <div className="p-1 rounded-sm bg-grey-primary">
            <InstagramIcon className="text-grey-eggshell size-5 md:size-7" />
          </div>
          <input
            className="grow p-1 font-spectral !outline-none"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex gap-2 items-center">
          <div className="p-1 rounded-sm bg-grey-primary">
            {isMobile ? <TwitterXsIcon /> : <TwitterIcon />}
          </div>
          <input
            className="grow p-1 font-spectral !outline-none"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex gap-2 items-center">
          <div className="p-1 rounded-sm bg-grey-primary">
            <Send className="text-grey-eggshell size-5 md:size-7" />
          </div>
          <input
            className="grow p-1 font-spectral !outline-none"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
        </fieldset>
      </div>
    );
  return (
    <div className="flex gap-2 items-center pt-2">
      {instagram && (
        <Social
          link={`https://instagram.com/${instagram}`}
          icon={
            <InstagramIcon className="text-grey-eggshell size-5 md:size-7" />
          }
        />
      )}
      {twitter && (
        <Social
          link={`https://x.com/@${twitter}`}
          icon={isMobile ? <TwitterXsIcon /> : <TwitterIcon />}
        />
      )}
      {telegram && (
        <Social
          link={`https://t.me/${telegram}`}
          icon={<Send className="text-grey-eggshell size-5 md:size-7" />}
        />
      )}
    </div>
  );
};

export default SocialAccounts;
