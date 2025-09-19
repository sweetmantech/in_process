import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaymentsTable from "../PaymentsPage/PaymentsTable";

interface ManagePagePaymentsAccordionProps {
  address?: string;
}

const ManagePagePaymentsAccordion = ({
  address,
}: ManagePagePaymentsAccordionProps) => {
  return (
    <div className="px-6 md:px-8 pb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="payments">
          <AccordionTrigger className="text-left">
            <span className="text-lg font-archivo-medium">Recent Payments</span>
          </AccordionTrigger>
          <AccordionContent>
            <PaymentsTable limit={50} address={address} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ManagePagePaymentsAccordion;
