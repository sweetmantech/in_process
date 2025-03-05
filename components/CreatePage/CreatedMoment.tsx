import Buttons from "./Buttons";

const CreatedMoment = () => {
  return (
    <div className="pl-20 h-fit">
      <div className="flex items-end gap-3 w-full w-fit">
        <div className="w-full">
          <p className="font-archivo text-4xl font-bold">moment created</p>
          <Buttons />
        </div>
      </div>
    </div>
  );
};

export default CreatedMoment;
