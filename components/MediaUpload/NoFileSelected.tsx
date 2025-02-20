import Image from "next/image";

const NoFileSelected = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute size-fit top-20 left-14 active:scale-[0.9] transition flex flex-col items-center"
    onClick={onClick}
    type="button"
  >
    <Image src={"/images/upload-imagination.png"} width={100} height={100} alt="upload imagination"/>
    <p className="text-sm font-medium">Image Upload (or type for text only)</p>
  </button>
);

export default NoFileSelected;
