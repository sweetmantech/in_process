import { useProfileProvider } from "@/providers/ProfileProvider";
import {
  FarcasterIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
} from "../ui/icons";
import Social from "./Social";

const SocialAccounts = () => {
  const { socialAccounts } = useProfileProvider();

  return (
    <>
      <div className="flex gap-2 items-center pt-2 md:pt-6">
        {socialAccounts?.instagram && (
          <Social
            link={`https://instagram.com/${socialAccounts.instagram.username}`}
            icon={<InstagramIcon />}
          />
        )}
        {socialAccounts?.twitter && (
          <Social
            link={`https://x.com/@${socialAccounts.twitter.username}`}
            icon={<TwitterIcon />}
          />
        )}
        {socialAccounts?.farcaster && (
          <Social
            link={`https://warpcast.com/${socialAccounts.farcaster.username}`}
            icon={<FarcasterIcon />}
          />
        )}
        {socialAccounts?.tiktok && (
          <Social
            link={`https://tiktok.com/${socialAccounts.tiktok.username}`}
            icon={<TikTokIcon />}
          />
        )}
      </div>
    </>
  );
};

export default SocialAccounts;
