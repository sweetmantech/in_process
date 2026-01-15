import { Fragment } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import { LoginButton } from "../LoginButton/LoginButton";
import { useMomentProvider } from "@/providers/MomentProvider";
import Note from "../Note";

const Notes = () => {
  const { artistWallet } = useUserProvider();
  const { isOwner } = useMomentProvider();

  if (artistWallet && !isOwner) return <Note>you are not an admin of this moment.</Note>;

  if (artistWallet) return <Fragment />;

  return (
    <>
      <Note>sign in to airdrop and edit the description.</Note>
      <LoginButton />
    </>
  );
};

export default Notes;
