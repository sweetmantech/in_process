import { Moment, MomentAdvancedInfo } from "@/types/moment";
import selectSale from "@/lib/supabase/in_process_sales/selectSale";
import getMomentOnChainInfo from "@/lib/viem/getTokenInfo";
import { convertDatabaseSaleToApi } from "@/lib/sales/convertDatabaseSaleToApi";
import { convertOnChainSaleToApi } from "@/lib/sales/convertOnChainSaleToApi";
import selectMoments from "../supabase/in_process_moments/selectMoments";

export const getMomentAdvancedInfo = async (moment: Moment): Promise<MomentAdvancedInfo> => {
  const moments = await selectMoments(moment);
  const momentdata = moments[0]

  if (momentdata) {
    const uri = momentdata.uri;
    const owner = momentdata.collection.default_admin;
    const sale = await selectSale(momentdata.id);

    if (sale) {
      return {
        uri,
        owner,
        saleConfig: convertDatabaseSaleToApi(sale),
      };
    }

    const { saleConfig: onChainSale } = await getMomentOnChainInfo(moment);
    return {
      uri,
      owner,
      saleConfig: convertOnChainSaleToApi(onChainSale),
    };
  }

  const {
    saleConfig: onChainSale,
    owner: tokenOwner,
    tokenUri,
  } = await getMomentOnChainInfo(moment);
  return {
    uri: tokenUri,
    owner: tokenOwner as string,
    saleConfig: convertOnChainSaleToApi(onChainSale),
  };
};
