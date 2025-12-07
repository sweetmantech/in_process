import { format } from "date-fns";

export const formatDate = (date: Date | undefined, formatString: string = "PPP"): string => {
  if (!date) return "";
  return format(date, formatString);
};

export const formatDateTime = (date: Date | undefined): string => {
  if (!date) return "";
  return format(date, "PPP p");
};
