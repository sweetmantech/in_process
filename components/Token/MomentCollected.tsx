import Buttons from "./Buttons";

const MomentCollected = () => {
  return (
    <div>
      <div className="flex items-end gap-3 w-full w-fit">
        <div className="w-full">
          <p className="font-archivo-medium text-5xl pb-4">moment created</p>
          <Buttons />
        </div>
      </div>
    </div>
  );
};

export default MomentCollected;
