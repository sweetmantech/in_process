import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const Moment = () => {
  const { titleRef } = useZoraCreateProvider();

  return (
    <div className="w-full lg:max-w-[250px] xl:max-w-[300px] h-fit">
      <div ref={titleRef} className="flex items-end gap-3 w-fit">
        <div className="w-full">
          <p className="font-archivo-medium text-4xl xl:text-5xl">new moment</p>
        </div>
      </div>
    </div>
  );
};

export default Moment;
