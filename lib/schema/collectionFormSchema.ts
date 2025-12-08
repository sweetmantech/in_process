import { z } from "zod";

export const collectionFormSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type CollectionFormData = z.infer<typeof collectionFormSchema>;
