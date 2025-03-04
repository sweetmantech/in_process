import Image from "next/image";

const Buttons = () => {
  return (
    <div className="space-y-2 pt-3 relative">
      <div className="absolute w-1/2 aspect-[1/1] z-[2] -right-10 bottom-10 z-[1]">
        <Image
          src="/semi-transparent image.png"
          alt="not found semi"
          layout="fill"
        />
      </div>
      <button
        type="button"
        className="w-full py-2 bg-black font-archivo text-tan-primary rounded-sm z-[2] relative"
      >
        Share
      </button>
      <button
        type="button"
        className="w-full py-2 font-archivo text-black border border-black rounded-sm z-[2] relative"
      >
        Create
      </button>
    </div>
  );
};

export default Buttons;
