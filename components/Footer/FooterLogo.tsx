import Link from "next/link";
import Image from "next/image";

const FooterLogo = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center">
      <Link
        href="/"
        aria-label="Go to homepage"
        className="mb-2 md:mb-0 md:mr-2"
      >
        <Image
          src="/footer_logo.svg"
          blurDataURL="/footer_logo.png"
          alt="footer logo"
          width={70}
          height={70}
        />
      </Link>

      <p className="font-archivo-bold text-md !uppercase">© TOPIA</p>
    </div>
  );
};

export default FooterLogo;
