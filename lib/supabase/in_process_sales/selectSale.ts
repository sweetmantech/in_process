import { supabase } from "../client";

const selectSale = async (momentId: string) => {
  const { data, error } = await supabase
    .from("in_process_sales")
    .select("*")
    .eq("moment", momentId)
    .single();
  if (error) return null;
  return data;
};

export default selectSale;
