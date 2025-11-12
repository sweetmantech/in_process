import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { manageFormSchema, ManageFormData } from "@/lib/schema/manageFormSchema";
import { useEffect } from "react";
import { useMomentManageProvider } from "@/providers/MomentManageProvider";

const useTokenManageForm = () => {
  const manageMetadata = useMomentManageProvider();

  const form = useForm<ManageFormData>({
    resolver: zodResolver(manageFormSchema),
    defaultValues: {
      name: manageMetadata.name,
      description: manageMetadata.description || undefined,
    },
    mode: "onChange",
  });

  // Sync form values to existing hooks
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name !== undefined) {
        manageMetadata.setName(value.name);
      } else if (name === "description") {
        manageMetadata.setDescription(value.description || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form, manageMetadata]);

  // Sync existing state to form (but don't clear form if provider becomes empty)
  useEffect(() => {
    const formName = form.getValues("name");
    const providerName = manageMetadata.name;

    // Only sync if values are different AND provider has a value (don't clear form)
    if (formName !== providerName && providerName) {
      form.setValue("name", providerName, { shouldValidate: false });
    }
  }, [manageMetadata.name, form]);

  useEffect(() => {
    const currentDesc = form.getValues("description") || "";
    const providerDesc = manageMetadata.description || "";

    // Only sync if values are different AND provider has a value (don't clear form)
    if (currentDesc !== providerDesc && providerDesc) {
      form.setValue("description", providerDesc || undefined, {
        shouldValidate: false,
      });
    }
  }, [manageMetadata.description, form]);

  return { form, manageMetadata };
};

export default useTokenManageForm;
