import FaqPage from "@/components/FaqPage";
import { APP_URL } from "@/lib/og/consts";
import { Metadata } from "next";

const title = "FAQ";

export const metadata: Metadata = {
  title: `${title} - In Process`,
  description: "Frequently Asked Questions",
  openGraph: {
    title: `${title} - In Process`,
    description: "Frequently Asked Questions",
    images: [`${APP_URL}/faq_preview.png`],
  },
};

const Faq = () => <FaqPage />;

export default Faq;
