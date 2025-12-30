import { useProfileFormProvider } from "@/providers/ProfileFormProvider";
import { TwitterIcon, TwitterXsIcon } from "../ui/icons";
import { Send, InstagramIcon } from "lucide-react";
import Social from "./Social";
import useIsMobile from "@/hooks/useIsMobile";
import { extractSocialUsername } from "@/lib/socials/extractSocialUsername";

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
  } = useProfileFormProvider();

  const isMobile = useIsMobile();

  if (isEditing)
    return (
      <div className="flex flex-col gap-2 md:flex-row md:pt-4" ref={socialRef}>
        <fieldset className="flex items-center gap-2">
          <div className="rounded-sm bg-grey-primary p-1">
            <InstagramIcon className="size-5 text-grey-eggshell md:size-7" />
          </div>
          <input
            className="grow p-1 font-spectral !outline-none"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <div className="rounded-sm bg-grey-primary p-1">
            {isMobile ? <TwitterXsIcon /> : <TwitterIcon />}
          </div>
          <input
            className="grow p-1 font-spectral !outline-none"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <div className="rounded-sm bg-grey-primary p-1">
            <Send className="size-5 text-grey-eggshell md:size-7" />
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
    <div className="flex items-center gap-2 pt-2">
      {instagram && (
        <Social
          link={`https://instagram.com/${extractSocialUsername(instagram)}`}
          icon={<InstagramIcon className="size-5 text-grey-eggshell md:size-7" />}
        />
      )}
      {twitter && (
        <Social
          link={`https://x.com/@${extractSocialUsername(twitter)}`}
          icon={isMobile ? <TwitterXsIcon /> : <TwitterIcon />}
        />
      )}
      {telegram && (
        <Social
          link={`https://t.me/${extractSocialUsername(telegram)}`}
          icon={<Send className="size-5 text-grey-eggshell md:size-7" />}
        />
      )}
    </div>
  );
};

export default SocialAccounts;
