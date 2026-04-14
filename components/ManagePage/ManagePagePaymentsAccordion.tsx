"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaymentsTable from "../PaymentsPage/PaymentsTable";
import PaymentsTabs from "../PaymentsPage/PaymentsTabs";
import { PaymentsProvider } from "@/providers/PaymentsProvider";
import { useUserProvider } from "@/providers/UserProvider";

const ManagePagePaymentsAccordion = () => {
  const { artistWallet } = useUserProvider();
  if (!artistWallet) return null;

  return (
    <div className="px-6 pb-6 md:px-8">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="payments">
          <AccordionTrigger className="text-left">
            <span className="font-archivo-medium text-lg">Payments</span>
          </AccordionTrigger>
          <AccordionContent>
            <PaymentsProvider>
              <PaymentsTabs />
              <PaymentsTable />
            </PaymentsProvider>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ManagePagePaymentsAccordion;
