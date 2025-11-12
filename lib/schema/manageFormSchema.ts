import { z } from "zod";

export const manageFormSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type ManageFormData = z.infer<typeof manageFormSchema>;
