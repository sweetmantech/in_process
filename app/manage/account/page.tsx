"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Account = () => {
  return (
    <main className="flex flex-col gap-12 md:gap-24 font-archivo">
      <section className="grid grid-cols-12 gap-1">
        <p className="text-base col-span-12 md:col-span-2">your info</p>
        <div className="col-span-12 md:col-span-10 flex flex-col gap-4">
          <fieldset>
            <Label>display name</Label>
            <Input
              placeholder="ex: ziad.eth"
              className="resize-none font-spectral mt-1"
            />
          </fieldset>
          <fieldset>
            <Label>bio</Label>
            <Textarea
              placeholder="ex: I am the dev of onchain."
              minRows={7}
              className="resize-none font-spectral mt-1"
            />
          </fieldset>
        </div>
      </section>
      <section className="grid grid-cols-12 gap-1">
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
            />
          </fieldset>
          <fieldset>
            <Label>x</Label>
            <Input
              placeholder="ex: https://x.com/helly"
              className="resize-none font-spectral mt-1"
            />
          </fieldset>
          <fieldset>
            <Label>farcaster</Label>
            <Input
              placeholder="ex: https://farcaster.com/helly"
              className="resize-none font-spectral mt-1"
            />
          </fieldset>
        </div>
      </section>
    </main>
  );
};

export default Account;
