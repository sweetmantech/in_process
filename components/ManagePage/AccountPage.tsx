"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/hooks/useProfile";
import { useUserProvider } from "@/providers/UserProvider";
import { useState } from "react";
import ConnectButton from "./ConnectButton";
import PhoneButton from "./PhoneButton";
import { extractSocialUsername } from "@/lib/socials/extractSocialUsername";
import { PhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";

const AccountPage = () => {
  const { profile, artistWallet } = useUserProvider();
  const {
    twitter,
    instagram,
    farcaster,
    username,
    bio,
    telegram,
    setBio,
    setTwitter,
    setInstagram,
    setFarcaster,
    setTelegram,
    setUserName,
  } = profile;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSave = async () => {
    setIsLoading(true);

    await updateProfile({
      address: artistWallet as string,
      username,
      bio,
      farcaster_username: extractSocialUsername(farcaster),
      twitter_username: extractSocialUsername(twitter),
      instagram_username: extractSocialUsername(instagram),
      telegram_username: extractSocialUsername(telegram),
    });
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col font-archivo">
      <section className="grid grid-cols-12 gap-1">
        <p className="col-span-12 text-base md:col-span-2">your info</p>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-10">
          <fieldset>
            <Label>display name</Label>
            <Input
              placeholder="ex: ziad.eth"
              className="mt-1 resize-none font-spectral"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>bio</Label>
            <Textarea
              placeholder="ex: I am the dev of onchain."
              minRows={7}
              className="mt-1 resize-none font-spectral"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
        </div>
      </section>
      <section className="mt-6 grid grid-cols-12 gap-1 md:mt-24">
        <p className="col-span-12 text-base md:col-span-2">
          connected <br className="hidden md:block" />
          accounts
        </p>
        <div className="col-span-12 flex flex-col gap-4 md:col-span-10">
          <fieldset>
            <Label>instagram</Label>
            <Input
              placeholder="ex: https://instagram.com/helly"
              className="mt-1 resize-none font-spectral"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>x</Label>
            <Input
              placeholder="ex: https://x.com/helly"
              className="mt-1 resize-none font-spectral"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>farcaster</Label>
            <Input
              placeholder="ex: https://farcaster.xyz/helly"
              className="mt-1 resize-none font-spectral"
              value={farcaster}
              onChange={(e) => setFarcaster(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>telegram</Label>
            <Input
              placeholder="ex: @sweetman_eth"
              className="mt-1 resize-none font-spectral"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
          </fieldset>
        </div>
      </section>
      <section className="mt-4 flex flex-col items-end justify-end gap-3 md:flex-row">
        <PhoneVerificationProvider>
          <PhoneButton />
        </PhoneVerificationProvider>
        <ConnectButton />
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:mr-4 md:w-fit md:min-w-[100px]"
          onClick={onSave}
        >
          {isLoading ? "saving..." : "save"}
        </button>
      </section>
    </main>
  );
};

export default AccountPage;
