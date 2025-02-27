export const COLLECTION_ADDRESS = "0xf0b2ab81056c8e2fdc40e46e32fae895f809c90d";
export const MINT_FEE_RECIPIENT = "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38";

export const JSON_EXTENSION_REGISTRY =
  "0xabcdefed93200601e1dfe26d6644758801d732e8";
import { Point } from "@/types/spiral";
import {
  zoraCreator1155FactoryImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { encodeEventTopics } from "viem";
import { baseSepolia, base } from "viem/chains";

export const IS_TESTNET =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? true : false;

export const FIXED_PRICE_SALE_STRATEGY_ADDRESS =
  "0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE";

// Wagmi
export const CHAIN = IS_TESTNET ? baseSepolia : base;
export const CHAIN_ID = CHAIN.id;
// Zora
export const REFERRAL_RECIPIENT = "0x749B7b7A6944d72266Be9500FC8C221B6A7554Ce";
// IPFS
export const ONE_MB = 1024 * 1024;
export const MAX_FILE_SIZE = 5 * ONE_MB;

export const SETUP_NEW_CONTRACT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreator1155FactoryImplABI,
  eventName: "SetupNewContract",
})[0];

export const MINT_COMMENT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreatorFixedPriceSaleStrategyABI,
  eventName: "MintComment",
})[0];

export const CROSSMINT_SIGNER_ADDRESS =
  "0xa105C311fA72b8Fb78c992EcbDb8b02Ea5bd394d";

export const SPIRAL_POINTS: Point[] = [
  [14, 123],
  [48, 115],
  [80, 107],
  [103, 101],
  [135, 94],
  [160, 88],
  [185, 84],
  [202, 78],
  [227, 74],
  [248, 70],
  [266, 67],
  [285, 64],
  [307, 60],
  [331, 55],
  [355, 50],
  [384, 45],
  [414, 43],
  [442, 38],
  [476, 33],
  [511, 30],
  [547, 27],
  [584, 21],
  [627, 18],
  [664, 16],
  [713, 12],
  [759, 11],
  [802, 9],
  [839, 10],
  [870, 11],
  [901, 14],
  [935, 15],
  [965, 18],
  [997, 21],
  [1029, 25],
  [1080, 36],
  [1125, 50],
  [1164, 67],
  [1195, 87],
  [1224, 111],
  [1246, 129],
  [1270, 155],
  [1294, 190],
  [1309, 220],
  [1324, 251],
  [1330, 276],
  [1335, 316],
  [1338, 400],
  [1326, 437],
  [1313, 464],
  [1294, 491],
  [1270, 516],
  [1246, 534],
  [1224, 550],
  [1195, 571],
  [1174, 586],
  [1155, 597],
  [1117, 618],
  [1075, 638],
  [1042, 655],
  [1018, 664],
  [937, 696],
  [899, 709],
  [860, 720],
  [827, 733],
  [784, 744],
  [756, 755],
  [724, 759],
  [695, 763],
  [667, 767],
  [617, 774],
  [575, 777],
  [537, 780],
  [506, 782],
  [471, 780],
  [429, 775],
  [386, 765],
  [364, 755],
  [340, 740],
  [317, 718],
  [303, 694],
  [294, 671],
  [291, 643],
  [296, 617],
  [306, 597],
  [322, 575],
  [342, 557],
  [368, 538],
  [385, 528],
  [409, 512],
  [439, 498],
  [462, 486],
  [496, 471],
  [533, 455],
  [566, 442],
  [603, 429],
  [634, 421],
  [668, 411],
  [710, 400],
  [740, 391],
  [769, 383],
  [802, 375],
  [829, 369],
  [860, 366],
  [892, 360],
  [936, 357],
  [972, 355],
  [1007, 356],
  [1041, 357],
  [1076, 358],
  [1118, 362],
  [1162, 371],
  [1200, 376],
  [1228, 379],
  [1267, 388],
  [1305, 397],
  [1333, 409],
  [1375, 427],
  [1402, 442],
  [1427, 452],
  [1453, 470],
  [1477, 488],
  [1503, 509],
  [1528, 538],
  [1544, 559],
  [1565, 583],
  [1580, 605],
  [1583, 613],
  [1589, 625],
  [1601, 649],
  [1613, 675],
  [1631, 707],
  [1641, 731],
  [1651, 757],
  [1659, 789],
  [1671, 815],
  [1681, 853],
];
