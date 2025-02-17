interface LogoProps {
  className?: string;
}
const Logo = ({ className = "" }: LogoProps) => {
  return (
    <p
      className={`text-xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] ${className}`}
    >
      In Process
    </p>
  );
};

export default Logo;
