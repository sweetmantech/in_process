"use client";

import AudioPlayerComponent from "./AudioPlayer";
import { AudioProvider, useAudioProvider } from "@/providers/AudioProvider";

const AudioPlayer = (props: {
  thumbnailUrl?: string;
  audioUrl: string;
  allowThumbnailUpload?: boolean;
}) => (
  <AudioProvider>
    <AudioPlayerComponent {...props} />
  </AudioProvider>
);

export { AudioPlayer, AudioProvider, useAudioProvider };
