import { Share2Icon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";
import useShareMoment from "@/hooks/useShareMoment";

const ShareButton = () => {
  const { share } = useShareMoment();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={share}
            className="border border-grey-moss-900 bg-white p-1 rounded-sm"
            aria-label="Share moment"
          >
            <Share2Icon className="size-4 text-grey-moss-900" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>share</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShareButton;
