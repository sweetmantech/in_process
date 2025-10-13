"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveIndentify } from "@/hooks/useProfile";
import { useProfileProvider } from "@/providers/ProfileProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useState } from "react";
import ConnectButton from "./ConnectButton";

const AccountPage = () => {
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
    setUserName,
  } = useProfileProvider();
  const { connectedAddress, externalWallet } = useUserProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSave = async () => {
    setIsLoading(true);
    await saveIndentify({
      address: (externalWallet || connectedAddress) as string,
      username,
      bio,
      farcaster_username: farcaster,
      twitter_username: twitter,
      instagram_username: instagram,
      telegram_username: telegram,
    });
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col font-archivo">
      <section className="grid grid-cols-12 gap-1">
        <p className="text-base col-span-12 md:col-span-2">your info</p>
        <div className="col-span-12 md:col-span-10 flex flex-col gap-4">
          <fieldset>
            <Label>display name</Label>
            <Input
              placeholder="ex: ziad.eth"
              className="resize-none font-spectral mt-1"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>bio</Label>
            <Textarea
              placeholder="ex: I am the dev of onchain."
              minRows={7}
              className="resize-none font-spectral mt-1"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
        </div>
      </section>
      <section className="grid grid-cols-12 gap-1 mt-6 md:mt-24">
        <p className="text-base col-span-12 md:col-span-2">
          connected <br className="hidden md:block" />
          accounts
        </p>
        <div className="col-span-12 md:col-span-10 flex flex-col gap-4">
          <fieldset>
            <Label>instagram</Label>
            <Input
              placeholder="ex: https://instagram.com/helly"
              className="resize-none font-spectral mt-1"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>x</Label>
            <Input
              placeholder="ex: https://x.com/helly"
              className="resize-none font-spectral mt-1"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Label>farcaster</Label>
            <Input
              placeholder="ex: https://farcaster.com/helly"
              className="resize-none font-spectral mt-1"
              value={farcaster}
              onChange={(e) => setFarcaster(e.target.value)}
            />
          </fieldset>
        </div>
      </section>
      <section className="flex justify-end gap-3 mt-4">
        <ConnectButton />
        <button
          className="mr-4 self-end px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
          onClick={onSave}
        >
          {isLoading ? "saving..." : "save"}
        </button>
      </section>
    </main>
  );
};

export default AccountPage;
