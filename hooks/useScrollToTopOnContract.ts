import { useEffect } from "react";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";

export const useScrollToTopOnContract = (): void => {
  const { createdTokenId } = useMomentCreateProvider();
  useEffect(() => {
    if (createdTokenId) {
      const intervalId = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [createdTokenId]);
};
