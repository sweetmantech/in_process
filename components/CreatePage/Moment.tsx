import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const Moment = () => {
  const { titleRef, createModeActive } = useZoraCreateProvider();

  return (
    <div className="pl-20 h-fit">
      <div ref={titleRef} className="flex items-end gap-3 w-fit">
        <div className="w-full">
          <p className="font-archivo text-4xl font-bold">new moment</p>
        </div>
        {createModeActive && (
          <>
            <div className="size-2 rotate-[45deg] bg-black translate-y-[-8px]" />
            <p className="font-grotesk-light text-xl tracking-[-1px]">create</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Moment;
