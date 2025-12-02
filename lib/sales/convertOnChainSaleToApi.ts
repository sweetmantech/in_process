import { MomentSaleConfig } from "@/types/moment";
import { OnChainSaleConfig } from "@/types/sale";

export const convertOnChainSaleToApi = (sale: OnChainSaleConfig): MomentSaleConfig => ({
  pricePerToken: sale.pricePerToken.toString(),
  saleStart: Number(sale.saleStart),
  saleEnd: Number(sale.saleEnd),
  maxTokensPerAddress: Number(sale.maxTokensPerAddress),
  fundsRecipient: sale.fundsRecipient,
  type: sale.type,
});
