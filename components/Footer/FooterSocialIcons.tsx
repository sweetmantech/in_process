import Image from "next/image";

const FooterSocialIcons = () => {
  return (
    <div className="flex flex-row gap-2 items-center ml-auto md:ml-0">
      <a
        href="https://x.com/stayinprocess"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        className="block"
      >
        <Image src="/images/x.svg" alt="X icon" width={36} height={36} />
      </a>
      <a
        href="https://farcaster.xyz/callmelatasha"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Farcaster"
        className="block"
      >
        <Image
          src="/images/farcaster.svg"
          alt="Farcaster icon"
          width={36}
          height={36}
        />
      </a>
    </div>
  );
};

export default FooterSocialIcons;
