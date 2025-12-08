import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collectionFormSchema, CollectionFormData } from "@/lib/schema/collectionFormSchema";
import { useState, useEffect } from "react";

const useCollectionForm = () => {
  // Metadata values state
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // React Hook Form
  const form = useForm<CollectionFormData>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name,
      description: description || undefined,
    },
    mode: "onChange",
  });

  // Sync form values to state
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.name !== undefined) {
        setName(value.name);
      }
      if (value.description !== undefined) {
        setDescription(value.description || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Sync state to form when state changes externally
  useEffect(() => {
    if (name !== form.getValues("name")) {
      form.setValue("name", name, { shouldValidate: false });
    }
  }, [name, form]);

  useEffect(() => {
    if (description !== form.getValues("description")) {
      form.setValue("description", description || undefined, { shouldValidate: false });
    }
  }, [description, form]);

  const resetForm = () => {
    setName("");
    setDescription("");
    form.reset({
      name: "",
      description: undefined,
    });
  };

  return {
    form,
    name,
    setName,
    description,
    setDescription,
    resetForm,
  };
};

export default useCollectionForm;
