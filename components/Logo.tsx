import Image from "next/image";

interface LogoProps {
  className?: string;
}
const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={className}>
      <Image src={"/logo.png"} alt="not found logo" width={128} height={29} />
    </div>
  );
};

export default Logo;
