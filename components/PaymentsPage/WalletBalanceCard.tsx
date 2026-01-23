import { Card, CardContent } from "@/components/ui/card";

interface SocialSmartWalletBalance {
  social_wallet: string;
  smart_wallet: string;
  eth_balance: string;
  usdc_balance: string;
}

interface WalletBalanceCardProps {
  balance: SocialSmartWalletBalance;
  index: number;
}

export function WalletBalanceCard({ balance, index }: WalletBalanceCardProps) {
  return (
    <Card key={index}>
      <CardContent className="pt-2.5 pb-2.5">
        <div className="space-y-2">
          <div className="space-y-0.5">
            <p className="text-[10px] font-spectral-italic text-grey-secondary">Social Wallet</p>
            <p className="text-xs font-spectral text-grey-moss-900 break-all">
              {balance.social_wallet}
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-spectral-italic text-grey-secondary">Smart Wallet</p>
            <p className="text-xs font-spectral text-grey-moss-900 break-all">
              {balance.smart_wallet}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-grey-secondary">
            <div className="space-y-0.5">
              <p className="text-[10px] font-spectral-italic text-grey-secondary">ETH</p>
              <p className="text-xs font-archivo-medium text-grey-moss-900">
                {balance.eth_balance} ETH
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-spectral-italic text-grey-secondary">USDC</p>
              <p className="text-xs font-archivo-medium text-grey-moss-900">
                {balance.usdc_balance} USDC
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
