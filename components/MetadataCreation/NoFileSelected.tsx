import Image from "next/image";
import { useRouter } from "next/navigation";

const NoFileSelected = ({ onClick }: { onClick: () => void }) => {
  const { push } = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
    push("/create/writing");
  };
  return (
    <div className="size-full flex flex-col items-center justify-center gap-6 px-4">
      <button
        type="button"
        className="relative w-1/2 aspect-[201/187]"
        onClick={onClick}
      >
        <Image
          src={"/upload-imagination.png"}
          layout="fill"
          alt="upload imagination"
          objectFit="contain"
          objectPosition="center"
        />
      </button>
      <p className="font-archivo text-md text-center">
        drop an image, video, pdf, link, or embed
      </p>
      <button
        className="relative z-3 hover:bg-background-light border border-black py-1 px-12 font-archivo text-xl"
        type="button"
        onClick={handleClick}
      >
        create
      </button>
    </div>
  );
};

export default NoFileSelected;
