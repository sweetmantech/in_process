import { Address, zeroAddress } from "viem";
import { MomentType, MomentApiSaleConfig } from "@/types/moment";
import { DatabaseSale } from "@/types/sale";

export const convertDatabaseSaleToApi = (sale: DatabaseSale): MomentApiSaleConfig => ({
  pricePerToken: sale.price_per_token.toString(),
  saleStart: Number(sale.sale_start),
  saleEnd: Number(sale.sale_end),
  maxTokensPerAddress: Number(sale.max_tokens_per_address),
  fundsRecipient: sale.funds_recipient as Address,
  type:
    sale.currency.toLowerCase() === zeroAddress.toLowerCase()
      ? MomentType.FixedPriceMint
      : MomentType.Erc20Mint,
});
