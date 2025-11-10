import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, CreateFormData } from "@/lib/schema/createFormSchema";
import { useEffect } from "react";
import useCreateMetadata from "@/hooks/useCreateMetadata";
import useCreateAdvancedValues from "./useCreateAdvancedValues";

const useCreateForm = () => {
  const createMetadata = useCreateMetadata();
  const advancedValues = useCreateAdvancedValues();

  const form = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: createMetadata.name,
      price: createMetadata.price,
      priceUnit: createMetadata.priceUnit as "eth" | "usdc",
      description: createMetadata.description || undefined,
      startDate: advancedValues.startDate,
      splits: undefined,
    },
    mode: "onChange",
  });

  // Sync form values to existing hooks
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name !== undefined) {
        createMetadata.setName(value.name);
      } else if (name === "price" && value.price !== undefined) {
        createMetadata.setPrice(value.price);
      } else if (name === "priceUnit" && value.priceUnit) {
        createMetadata.setPriceUnit(value.priceUnit);
      } else if (name === "description") {
        createMetadata.setDescription(value.description || "");
      } else if (name === "startDate" && value.startDate) {
        advancedValues.onChangeStartDate(value.startDate);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, createMetadata, advancedValues]);

  // Sync existing state to form
  useEffect(() => {
    if (form.getValues("name") !== createMetadata.name) {
      form.setValue("name", createMetadata.name, { shouldValidate: false });
    }
  }, [createMetadata.name, form]);

  useEffect(() => {
    if (form.getValues("price") !== createMetadata.price) {
      form.setValue("price", createMetadata.price, { shouldValidate: false });
    }
  }, [createMetadata.price, form]);

  useEffect(() => {
    if (form.getValues("priceUnit") !== createMetadata.priceUnit) {
      form.setValue("priceUnit", createMetadata.priceUnit as "eth" | "usdc", {
        shouldValidate: false,
      });
    }
  }, [createMetadata.priceUnit, form]);

  useEffect(() => {
    const currentDesc = form.getValues("description") || "";
    if (currentDesc !== (createMetadata.description || "")) {
      form.setValue("description", createMetadata.description || undefined, {
        shouldValidate: false,
      });
    }
  }, [createMetadata.description, form]);

  useEffect(() => {
    if (form.getValues("startDate") !== advancedValues.startDate) {
      form.setValue("startDate", advancedValues.startDate, { shouldValidate: false });
    }
  }, [advancedValues.startDate, form]);

  return { form, createMetadata, advancedValues };
};

export default useCreateForm;
