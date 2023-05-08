import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
import { DEFAULT_CHAIN_ID, REACT_APP_NETWORK_URL, network_, network_dec_to_hex } from "../../constants";
import { NetworkConnector } from "./NetworkConnector";
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from "../constants/chains";
let NETWORK_URL = process.env.REACT_APP_NETWORK_URL ? process.env.REACT_APP_NETWORK_URL : REACT_APP_NETWORK_URL[network_[network_dec_to_hex[DEFAULT_CHAIN_ID]]];
export const setNetwork = (chainId) => {
    NETWORK_URL = REACT_APP_NETWORK_URL[network_[chainId]];
};
console.log("REACT_APP_NETWORK_URL[DEFAULT_CHAIN_ID]: ", DEFAULT_CHAIN_ID, REACT_APP_NETWORK_URL[network_[network_dec_to_hex[DEFAULT_CHAIN_ID]]], network_[network_dec_to_hex[DEFAULT_CHAIN_ID]], DEFAULT_CHAIN_ID);
export const RPC = {    
    [SupportedChainId.BINANCE]: "https://bsc-dataseed4.binance.org",
    [SupportedChainId.BINANCETEST]: "https://data-seed-prebsc-2-s3.binance.org:8545",
    [SupportedChainId.ETHEREUM]: "https://endpoints.omniatech.io/v1/eth/mainnet/public",
    [SupportedChainId.GOERLI]: "https://rpc.ankr.com/eth_goerli",
    [SupportedChainId.POLYGON]: "https://rpc-mainnet.maticvigil.com",
    [SupportedChainId.POLYGONTEST]: "https://rpc-mumbai.matic.today",
    [SupportedChainId.FRENCHAIN]: "https://rpc-02.frenscan.io",
    [SupportedChainId.FRENCHAINTEST]: "https://rpc-01tn.frenchain.app",
    [SupportedChainId.CRONOS]: "https://evm.cronos.org",
    [SupportedChainId.CRONOSTEST]: "https://evm-t3.cronos.org",
    [SupportedChainId.KEKCHAIN]: "https://mainnet.kekchain.com",
    [SupportedChainId.KEKCHAINTEST]: "https://testnet.kekchain.com",
    [SupportedChainId.AVALANCHE]: "https://api.avax.network/ext/bc/C/rpc",
    [SupportedChainId.AVALANCHETEST]: "https://api.avax-test.network/ext/bc/C/rpc",
};
export var ConnectorNames;
(function(ConnectorNames) {
    ConnectorNames["Injected"] = "injected";
    ConnectorNames["WalletConnect"] = "walletconnect";
    ConnectorNames["BSC"] = "bsc";
})(ConnectorNames || (ConnectorNames = {}));
export const NETWORK_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID ? process.env.REACT_APP_CHAIN_ID : DEFAULT_CHAIN_ID);
if (typeof NETWORK_URL === "undefined") { { /* // REACT_APP_NETWORK_URL must be a defined environment variable */ }
    throw new Error(`Maintenance`);
};
console.log("RPC:",RPC);
export const network = new NetworkConnector({
    urls: RPC,
    defaultChainId: DEFAULT_CHAIN_ID,
});
export default function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 15000;
    return library;
};
let networkLibrary;
export function getNetworkLibrary(provider) {
    // eslint-disable-next-line no-return-assign
    const library = new Web3Provider(network ? network.provider : provider);
    library.pollingInterval = 15000;
    networkLibrary = library;
    return library;
};
export const injected = new InjectedConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});
const supportedChainIds = [1, 5, 25, 56, 338, 97, 444, 44444, 420420, 420666, 80001, 137, 42261, 42262, 43114, 43113];
export const checkSupportedIds = (chainID) => supportedChainIds.some((id) => id === chainID);
export const bscConnector = new BscConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});
export const walletconnect = new WalletConnectConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
    rpc: RPC,
    qrcode: true,
}); 
{
    /*
    // export const walletlink = new WalletLinkConnector({
    //     url: NETWORK_URL,
    //     appName: 'Smartswap',
    //     appLogoUrl: SMARTSWAP_LOGO
    // })
    */
}
export const connectorKey = "connectv2";
export const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.BSC]: bscConnector,
};