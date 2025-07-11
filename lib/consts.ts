import { Point } from "@/types/spiral";
import { baseSepolia, base } from "viem/chains";

export const INPROCESS_GROUP_CHAT_ID = "-1002592953370";
export const COLLECTION_ADDRESS = "0xf0b2ab81056c8e2fdc40e46e32fae895f809c90d";
export const MINT_FEE_RECIPIENT = "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38";

export const ETH_USDC_WRAPPER = "0x8b7e5b73a187aA50B1660455566E4818f88Fdd72";
export const NULL_DATA =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const ERC1967_IMPLEMENTATION_SLOT =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";

export const JSON_EXTENSION_REGISTRY =
  "0xabcdefed93200601e1dfe26d6644758801d732e8";

export const IS_TESTNET =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? true : false;

// Coinbase
export const CDP_PAYMASTER_URL = `https://api.developer.coinbase.com/rpc/v1/base${IS_TESTNET ? "-sepolia" : ""}/${process.env.CDP_PAYMASTER_KEY}`;

// Wagmi
export const CHAIN = IS_TESTNET ? baseSepolia : base;
export const CHAIN_ID = CHAIN.id;
// Zora
export const REFERRAL_RECIPIENT = "0x749B7b7A6944d72266Be9500FC8C221B6A7554Ce";
// IPFS
export const ONE_MB = 1024 * 1024;
export const MAX_FILE_SIZE = 222 * ONE_MB;

export const PERMISSION_BIT_MINTER = 4;
export const UNISWAP_ROUTER_ADDRESS =
  "0x2626664c2603336E57B271c5C0b26F421741e481";
export const MULTICALL3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
export const FIXED_PRICE_CROSSMINT_COLLECTION_ID = `crossmint:${IS_TESTNET ? "4b386283-a16d-44a6-afcc-c44244643ecf" : "60073c68-5c30-462f-a9ba-81d44cfe02e2"}`;
export const ERC20_CROSSMINT_COLLECTION_ID = `crossmint:${IS_TESTNET ? "cbd4646a-dbbe-4818-a3c9-ba65ec5f9be0" : "6b130435-9a57-45ef-a530-d97314d49b24"}`;
export const CROSSMINT_SIGNER_ADDRESS = {
  [`${baseSepolia.id}`]: "0xa105C311fA72b8Fb78c992EcbDb8b02Ea5bd394d",
  [`${base.id}`]: "0xa66b23D9a8a46C284fa5b3f2E2b59Eb5cc3817F4",
};

export const USDC_ADDRESS = IS_TESTNET
  ? "0x14196F08a4Fa0B66B7331bC40dd6bCd8A1dEeA9F"
  : "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export const PROD_URL = "https://inprocess.fun";
export const BLOCKLISTS = [
  "0x323e8bcb41ae2454c3f4899e094c599aab6b84bc",
  "0x51027631b9def86e088c33368ec4e3a4be0ad264",
  "0xf498624bbf806048296cf1757f0ea349228803a5",
  "0x1053db8955355d967BB0f3cabe7a71FD23ebfAB7",
];

export const TIMLINE_STEP_OFFSET = 12;

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

export const MOBILE_SPIRAL_POINTS: Point[] = [
  [7, 29],
  [20, 26],
  [31, 24],
  [43, 21],
  [58, 19],
  [72, 17],
  [84, 15],
  [94, 13],
  [111, 11],
  [125, 10],
  [139, 9],
  [186, 9],
  [200, 11],
  [209, 11],
  [220, 14],
  [230, 16],
  [240, 20],
  [253, 25],
  [260, 35],
  [270, 44],
  [276, 54],
  [280, 66],
  [280, 87],
  [275, 103],
  [271, 112],
  [263, 120],
  [256, 129],
  [246, 136],
  [235, 143],
  [221, 150],
  [204, 156],
  [186, 163],
  [170, 166],
  [158, 169],
  [143, 172],
  [130, 174],
  [121, 176],
  [100, 175],
  [87, 173],
  [74, 170],
  [65, 163],
  [58, 152],
  [57, 142],
  [64, 131],
  [74, 121],
  [88, 110],
  [104, 103],
  [122, 97],
  [139, 92],
  [158, 87],
  [177, 84],
  [196, 82],
  [217, 80],
  [235, 82],
  [254, 83],
  [269, 87],
  [282, 91],
  [293, 97],
  [305, 106],
  [313, 111],
  [322, 120],
  [330, 130],
  [338, 140],
  [344, 154],
  [350, 167],
  [354, 180],
  [356, 193],
];
