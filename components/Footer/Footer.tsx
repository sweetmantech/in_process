import FooterNavLinks from "./FooterNavLinks";
import FooterSocialIcons from "./FooterSocialIcons";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  return (
    <main className="px-4 md:px-10 mx-auto w-screen overflow-x-hidden pb-16 md:py-16 relative z-[10]">
      {/* top divider for mobile */}
      <div className="my-8 h-[1px] bg-grey-moss-400 w-full block md:hidden" />

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
