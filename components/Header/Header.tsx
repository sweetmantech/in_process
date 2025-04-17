import LoginButton from "../LoginButton";
import Logo from "../Logo";

const Header = () => {
  return (
    <div className="w-screen flex justify-between items-center px-4 md:px-10 pt-6">
      <Logo />
      <LoginButton />
    </div>
  );
};

export default Header;
