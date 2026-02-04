import { useCallback } from "react";
import { useAudioProvider } from "@/components/AudioPlayer";

const useAudioController = () => {
  const { handleSliderChange, handleVolumeChange } = useAudioProvider();

  const handleProgressInteraction = useCallback(
    (clientX: number, rect: DOMRect) => {
      const percent = ((clientX - rect.left) / rect.width) * 100;
      handleSliderChange([Math.max(0, Math.min(100, percent))]);
    },
    [handleSliderChange]
  );

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      handleProgressInteraction(e.clientX, rect);
    },
    [handleProgressInteraction]
  );

  const handleProgressTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      handleProgressInteraction(touch.clientX, rect);
    },
    [handleProgressInteraction]
  );

  const handleVolumeClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      handleVolumeChange(percent);
    },
    [handleVolumeChange]
  );

  const handleVolumeTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (touch.clientX - rect.left) / rect.width;
      handleVolumeChange(percent);
    },
    [handleVolumeChange]
  );

  return {
    handleProgressClick,
    handleProgressTouchMove,
    handleVolumeClick,
    handleVolumeTouchMove,
  };
};

export default useAudioController;
