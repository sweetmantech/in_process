import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const Moment = () => {
  const { titleRef } = useZoraCreateProvider();

  return (
    <div className="size-fit">
      <div ref={titleRef} className="flex items-end gap-2 w-fit">
        <div className="w-full lg:min-w-[200px] xl:min-w-[300px] h-fit">
          <p className="font-archivo-medium text-3xl xl:text-5xl">new moment</p>
        </div>
        <div className="size-2 rotate-[45deg] bg-black translate-y-[-8px]" />
        <p className="font-grotesk-light text-xl tracking-[-1px]">create</p>
      </div>
    </div>
  );
};

export default Moment;
