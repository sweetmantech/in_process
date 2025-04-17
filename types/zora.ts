export interface CollectionStyle {
  theme: {
    color: {
      background: string;
      text: string;
      accent: string;
      accentText: string;
      border: string;
    };
    font: {
      heading: {
        fontFamily: string;
        fontSize: string;
        lineHeight: string;
      };
      body: {
        fontFamily: string;
        fontSize: string;
        lineHeight: string;
      };
      caption: {
        fontFamily: string;
        fontSize: string;
        lineHeight: string;
      };
    };
    button: {
      shape: string;
    };
  };
  unit: {
    radius: string;
    base: string;
  };
}

export enum MintType {
  ZoraErc20Mint = "ZoraErc20Mint",
  ZoraTimedMint = "ZoraTimed",
  ZoraFixedPriceMint = "ZoraFixedPrice",
}
