import { useMetadata } from "@/hooks/useMetadata";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import CarouselItem from "./CarouselItem";
import { Moment } from "@/types/timeline";

interface SliderItemProps {
  moment: Moment;
}

const SliderItem = ({ moment }: SliderItemProps) => {
  const { data, isLoading } = useMetadata(moment.uri);
  const { push } = useRouter();

  const handleClick = () => {
    push(`/${moment.admins[0].address}`);
  };

  return (
    <button
      className="w-full h-[200px] md:h-auto overflow-hidden relative rounded-md bg-grey-moss-100 font-spectral"
      type="button"
      onClick={handleClick}
    >
      {isLoading || !data ? (
        <div className="size-full flex justify-center items-center bg-grey-moss-100 border border-grey rounded-md">
          <Loading className="size-3/4" />
        </div>
      ) : (
        <CarouselItem metadata={data} />
      )}
    </button>
  );
};
export default SliderItem;
