import FooterNavLinks from "./FooterNavLinks";
import FooterSocialIcons from "./FooterSocialIcons";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  return (
    <main className="relative z-[10] mx-auto w-screen overflow-x-hidden px-4 pb-16 md:px-10 md:py-16">
      {/* top divider for mobile */}
      <div className="my-8 block h-[1px] w-full bg-grey-moss-400 md:hidden" />

      {/* Shared responsive layout */}
      <div className="flex w-full items-start gap-4">
        <FooterLogo />
        <FooterNavLinks />
        <FooterSocialIcons />
      </div>
    </main>
  );
};

export default Footer;
