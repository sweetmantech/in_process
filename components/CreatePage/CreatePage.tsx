"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Spinner from "@/components/ui/spinner";
import MediaUpload from "@/components/MediaUpload/MediaUpload";
import Title from "./Title";
import CreateButton from "./CreateButton";
import BgNoiseWrapper from "../ui/texture-wrapper";

export default function CreatePage() {
  const { creating, name } = useZoraCreateProvider();

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gradientTopRightLight">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        {creating ? (
          <div className="flex flex-col gap-2 items-center">
            <Spinner />
            <span>Creating Post!</span>
          </div>
        ) : (
          <div className="mx-auto min-h-screen flex items-center justify-center">
            <div className="mt-8 md:flex md:space-x-8 w-full">
              <div className="flex flex-col items-center gap-5">
                <MediaUpload />
              </div>
              {typeof name !== "undefined" && (
                <div className="mt-4 md:mt-0 flex flex-col items-center gap-3">
                  <div className="w-full flex flex-col items-start gap-4">
                    <Title />
                  </div>
                </div>
              )}
              <CreateButton />
            </div>
          </div>
        )}
      </BgNoiseWrapper>
    </main>
  );
}
