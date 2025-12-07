import { useRouter } from "next/navigation";
import FeedbackModal from "./FeedbackModal";

const FooterNavLinks = () => {
  const { push } = useRouter();

  return (
    <div className="text-md flex flex-col items-start space-y-1 text-left font-archivo-bold md:ml-auto md:items-end md:text-right">
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
