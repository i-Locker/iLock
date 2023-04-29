// import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
export var SupportedChainId;
(function (SupportedChainId) {
    // SupportedChainId[SupportedChainId["MAINNET"] = 1] = "MAINNET";
    SupportedChainId[SupportedChainId["ETHEREUM"] = 1] = "ETHEREUM";
    SupportedChainId[SupportedChainId["GOERLI"] = 5] = "GOERLI";
    SupportedChainId[SupportedChainId["CRONOS"] = 25] = "CRONOS";
    SupportedChainId[SupportedChainId["CRONOSTEST"] = 338] = "CRONOSTEST";
    SupportedChainId[SupportedChainId["KEKCHAIN"] = 420420] = "KEKCHAIN";
    SupportedChainId[SupportedChainId["KEKCHAINTEST"] = 420666] = "KEKCHAINTEST";
    SupportedChainId[SupportedChainId["FRENCHAIN"] = 44444] = "FRENCHAIN";
    SupportedChainId[SupportedChainId["FRENCHAINTEST"] = 444] = "FRENCHAINTEST";
    SupportedChainId[SupportedChainId["BINANCE"] = 56] = "BINANCE";
    SupportedChainId[SupportedChainId["BINANCETEST"] = 97] = "BINANCETEST";
    SupportedChainId[SupportedChainId["POLYGON"] = 137] = "POLYGON";
    SupportedChainId[SupportedChainId["POLYGONTEST"] = 80001] = "POLYGONTEST";
    SupportedChainId[SupportedChainId["AVALANCHE"] = 43114] = "AVALANCHE";
    SupportedChainId[SupportedChainId["AVALANCHETEST"] = 43113] = "AVALANCHETEST";
})(SupportedChainId || (SupportedChainId = {}));
export const ALL_SUPPORTED_CHAIN_IDS = [
    // SupportedChainId.MAINNET,
    // SupportedChainId.OASISTEST,
    // SupportedChainId.OASISMAINNET,
    SupportedChainId.ETHEREUM,
    SupportedChainId.GOERLI,
    SupportedChainId.POLYGON,
    SupportedChainId.POLYGONTEST,
    SupportedChainId.BINANCE,
    SupportedChainId.BINANCETEST,
    SupportedChainId.CRONOS,
    SupportedChainId.CRONOSTEST,
    SupportedChainId.AVALANCHE,
    SupportedChainId.AVALANCHETEST,
    SupportedChainId.KEKCHAIN,
    SupportedChainId.KEKCHAINTEST,
    SupportedChainId.FRENCHAIN,
    SupportedChainId.FRENCHAINTEST,
];
export const L1_CHAIN_IDS = [
    // SupportedChainId.MAINNET,
    // SupportedChainId.OASISTEST,
    // SupportedChainId.OASISMAINNET,
    SupportedChainId.ETHEREUM,
    SupportedChainId.GOERLI,
    SupportedChainId.POLYGON,
    SupportedChainId.POLYGONTEST,
    SupportedChainId.BINANCE,
    SupportedChainId.BINANCETEST,
    SupportedChainId.CRONOS,
    SupportedChainId.CRONOSTEST,
    SupportedChainId.AVALANCHE,
    SupportedChainId.AVALANCHETEST,
    SupportedChainId.KEKCHAIN,
    SupportedChainId.KEKCHAINTEST,
    SupportedChainId.FRENCHAIN,
    SupportedChainId.FRENCHAINTEST,
];
export const CHAIN_INFO = {
    [SupportedChainId.BINANCE]: {
        docs: "",
        explorer: "https://www.bscscan.com/",
        infoLink: "",
        label: "Binance",
        nativeCurrency: { name: "Binance", symbol: "BNB", decimals: 18 },
    },
    [SupportedChainId.AVALANCHE]: {
        docs: "",
        explorer: "https://snowtrace.io/",
        infoLink: "",
        label: "Avalanche",
        nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    },
    [SupportedChainId.BINANCETEST]: {
        docs: "",
        explorer: "https://testnet.bscscan.com/",
        infoLink: "",
        label: "BSC Testnet",
        nativeCurrency: { name: "Binance", symbol: "tBNB", decimals: 18 },
    },
    [SupportedChainId.POLYGON]: {
        docs: "",
        explorer: "https://polygonscan.com/",
        infoLink: "",
        label: "Polygon",
        nativeCurrency: { name: "Polygon", symbol: "POL", decimals: 18 },
    },
    [SupportedChainId.POLYGONTEST]: {
        docs: "",
        explorer: "https://mumbai.polygonscan.com/",
        infoLink: "",
        label: "Mumbai Testnet",
        nativeCurrency: { name: "Polygon", symbol: "POL", decimals: 18 },
    },
    [SupportedChainId.AVALANCHE_FUJI]: {
        docs: "",
        explorer: "https://testnet.snowtrace.io/",
        infoLink: "",
        label: "Avalanche Fuji Testnet",
        nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    },
    [SupportedChainId.AVALANCHETEST]: {
        docs: "",
        explorer: "https://testnet.snowtrace.io/",
        infoLink: "",
        label: "Avalanche Fuji Testnet",
        nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    },
    [SupportedChainId.ETHEREUM]: {
      docs: '',
      explorer: 'https://etherscan.io/',
      infoLink: '',
      label: 'Ethereum',
      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    },
    [SupportedChainId.GOERLI]: {
        docs: "",
        explorer: "https://goerli.etherscan.io/",
        infoLink: "",
        label: "Görli",
        nativeCurrency: { name: "Ethereum", symbol: "görETH", decimals: 18 },
    },
    [SupportedChainId.KEKCHAINTEST]: {
        docs: "",
        explorer: "https://testnet-explorer.kekchain.com",
        infoLink: "",
        label: "Kekchain Testnet",
        nativeCurrency: { name: "Kekchain", symbol: "tKEK", decimals: 18 },
    },
    [SupportedChainId.KEKCHAIN]: {
        docs: "",
        explorer: "https://mainnet-explorer.kekchain.com",
        infoLink: "",
        label: "Kekchain",
        nativeCurrency: { name: "Kekchain", symbol: "KEK", decimals: 18 },
    },
    [SupportedChainId.FRENCHAINTEST]: {
        docs: "",
        explorer: "https://testnet.frenscan.io",
        infoLink: "",
        label: "Frenchain Testnet",
        nativeCurrency: { name: "Frenchain", symbol: "tFREN", decimals: 18 },
    },
    [SupportedChainId.FRENCHAIN]: {
        docs: "",
        explorer: "https://mainnet.frenscan.io",
        infoLink: "",
        label: "Frenchain",
        nativeCurrency: { name: "Frenchain", symbol: "FREN", decimals: 18 },
    },
    [SupportedChainId.CRONOSTEST]: {
        docs: "",
        explorer: "https://testnet.cronoscan.com",
        infoLink: "",
        label: "Cronos Testnet",
        nativeCurrency: { name: "Cronos", symbol: "tCRO", decimals: 18 },
    },
    [SupportedChainId.CRONOS]: {
        docs: "",
        explorer: "https://cronoscan.com",
        infoLink: "",
        label: "Cronos",
        nativeCurrency: { name: "Cronos", symbol: "CRO", decimals: 18 },
    },
    /*[SupportedChainId.OASISTEST]: {
        docs: "",
        explorer: "https://explorer.emerald.oasis.dev/",
        infoLink: "",
        label: "Oasis Emerald Testnet",
        nativeCurrency: { name: "ROSE", symbol: "ROSE", decimals: 18 },
    },
    [SupportedChainId.OASISMAINNET]: {
        docs: "",
        explorer: "https://testnet.explorer.emerald.oasis.dev/",
        infoLink: "",
        label: "Oasis Emerald Mainnet",
        nativeCurrency: { name: "ROSE", symbol: "ROSE", decimals: 18 },
    },
    */
};
