import Image from "next/image";

const Loading = ({ className }: { className: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src="/spinner.svg"
        alt="not found spinner icon."
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
};

export default Loading;
