import { MomentMetadata } from "@/types/moment";

export const usePdfContainerClassName = (metadata: MomentMetadata | null | undefined): string => {
  const isPdf = metadata?.content?.mime?.includes("pdf") ?? false;
  return isPdf
    ? "w-fit pt-4 flex flex-col items-center gap-2"
    : "w-fit pt-4 flex flex-col items-center gap-2 md:flex-row";
};
