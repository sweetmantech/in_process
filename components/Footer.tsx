import Image from "next/image";

const Footer = () => {
  return (
    <main className="w-screen flex justify-between items-center pl-10 pr-14 pt-24 pb-16 relative z-[10]">
      <div className="flex items-center">
        <Image
          src="/footer_logo.png"
          alt="not found logo"
          width={80}
          height={80}
        />
        <p className="font-grotesk-medium text-lg">© XYZ Partners</p>
      </div>
      <div className="font-grotesk-medium text-lg">
        <p>write</p>
        <p>collect</p>
        <p>manifesto</p>
      </div>
    </main>
  );
};

export default Footer;
