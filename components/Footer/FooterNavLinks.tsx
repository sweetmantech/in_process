import { useRouter } from "next/navigation";
import FeedbackModal from "./FeedbackModal";

const FooterNavLinks = () => {
  const { push } = useRouter();

  return (
    <div className="flex flex-col font-archivo-bold text-md space-y-1 text-left md:text-right items-start md:items-end md:ml-auto">
      <button type="button" onClick={() => push("/manifesto")}>
        manifesto
      </button>
      <button type="button" onClick={() => push("/faq")}>
        faq
      </button>
      <FeedbackModal />
    </div>
  );
};

export default FooterNavLinks;
