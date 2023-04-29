// import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
export var SupportedChainId;
(function (SupportedChainId) {
    //MAINNET = 1,
    SupportedChainId[SupportedChainId["ROPSTEN"] = 3] = "ROPSTEN";
    SupportedChainId[SupportedChainId["RINKEBY"] = 4] = "RINKEBY";
    SupportedChainId[SupportedChainId["GOERLI"] = 5] = "GOERLI";
    SupportedChainId[SupportedChainId["KOVAN"] = 6] = "KOVAN";
    SupportedChainId[SupportedChainId["POLYGON"] = 137] = "POLYGON";
    SupportedChainId[SupportedChainId["BINANCE"] = 56] = "BINANCE";
    SupportedChainId[SupportedChainId["BINANCETEST"] = 97] = "BINANCETEST";
    SupportedChainId[SupportedChainId["POLYGONTEST"] = 80001] = "POLYGONTEST";
    SupportedChainId[SupportedChainId["OASISTEST"] = 42261] = "OASISTEST";
    SupportedChainId[SupportedChainId["OASISMAINNET"] = 42262] = "OASISMAINNET";
    SupportedChainId[SupportedChainId["AVALANCHE"] = 43114] = "AVALANCHE";
    SupportedChainId[SupportedChainId["AVALANCHE_FUJI"] = 43113] = "AVALANCHE_FUJI";
})(SupportedChainId || (SupportedChainId = {}));
export const ALL_SUPPORTED_CHAIN_IDS = [
    //SupportedChainId.MAINNET,
    SupportedChainId.BINANCE,
    SupportedChainId.POLYGON,
    SupportedChainId.POLYGONTEST,
    SupportedChainId.BINANCETEST,
    SupportedChainId.ROPSTEN,
    SupportedChainId.RINKEBY,
    SupportedChainId.GOERLI,
    SupportedChainId.KOVAN,
    SupportedChainId.OASISTEST,
    SupportedChainId.OASISMAINNET,
    SupportedChainId.AVALANCHE,
    SupportedChainId.AVALANCHE_FUJI,
];
export const L1_CHAIN_IDS = [
    // SupportedChainId.MAINNET,
    SupportedChainId.ROPSTEN,
    SupportedChainId.RINKEBY,
    SupportedChainId.GOERLI,
    SupportedChainId.KOVAN,
    SupportedChainId.BINANCE,
    SupportedChainId.POLYGON,
    SupportedChainId.BINANCETEST,
    SupportedChainId.POLYGONTEST,
    SupportedChainId.OASISTEST,
    SupportedChainId.OASISMAINNET,
    SupportedChainId.AVALANCHE,
    SupportedChainId.AVALANCHE_FUJI,
];
export const CHAIN_INFO = {
    [SupportedChainId.ROPSTEN]: {
        docs: "",
        explorer: "https://ropsten.etherscan.io/",
        infoLink: "",
        label: "Ropsten",
        nativeCurrency: { name: "Ethereum", symbol: "ropETH", decimals: 18 },
    },
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
    /*
    [SupportedChainId.MAINNET]: {
      docs: '',
      explorer: 'https://etherscan.io/',
      infoLink: '',
      label: 'Ethereum',
      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    },
    */
    [SupportedChainId.RINKEBY]: {
        docs: "",
        explorer: "https://rinkeby.etherscan.io/",
        infoLink: "",
        label: "Rinkeby",
        nativeCurrency: { name: "Ethereum", symbol: "rinkETH", decimals: 18 },
    },
    [SupportedChainId.ROPSTEN]: {
        docs: "",
        explorer: "https://ropsten.etherscan.io/",
        infoLink: "",
        label: "Ropsten",
        nativeCurrency: { name: "Ethereum", symbol: "ropETH", decimals: 18 },
    },
    [SupportedChainId.KOVAN]: {
        docs: "",
        explorer: "https://kovan.etherscan.io/",
        infoLink: "",
        label: "Kovan",
        nativeCurrency: { name: "Ethereum", symbol: "kovETH", decimals: 18 },
    },
    [SupportedChainId.GOERLI]: {
        docs: "",
        explorer: "https://goerli.etherscan.io/",
        infoLink: "",
        label: "Görli",
        nativeCurrency: { name: "Ethereum", symbol: "görETH", decimals: 18 },
    },
    [SupportedChainId.OASISTEST]: {
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
};
