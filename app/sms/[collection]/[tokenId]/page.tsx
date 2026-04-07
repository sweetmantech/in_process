import { NextPage } from "next";
import SMSMomentPage from "@/components/SMSMomentPage";
import { Metadata } from "next";
import { generateMomentMetadata } from "@/lib/metadata/generateMomentMetadata";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};

export const revalidate = 300;

export const generateMetadata = ({ params }: Props): Promise<Metadata> =>
  generateMomentMetadata(params, "/sms");

const SMSMoment: NextPage = () => <SMSMomentPage />;

export default SMSMoment;
