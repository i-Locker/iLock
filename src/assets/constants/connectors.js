import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 5, 56, 97, 444, 43113, 43114, 44444, 420420, 420666],
});

export const walletconnect = new WalletConnectConnector({
    rpc: { 
        1: "https://mainnet.infura.io/v3/3587df9c45a740f9812d093074c6a505",
        3: "https://ropsten.infura.io/v3/3587df9c45a740f9812d093074c6a505",
        5: "https://goerli.infura.io/v3/3587df9c45a740f9812d093074c6a505",
        56: "https://bsc-dataseed1.binance.org",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545",
        444: "https://rpc-01tn.frenchain.app",
        43113: "https://api.avax.network/ext/bc/C/rpc",
        43114: "https://api.avax-test.network/ext/bc/C/rpc", 
        44444: "https://rpc-02.frenscan.io",
        420420: "https://testnet.kekchain.com",
        420666: "https://mainnet.kekchain.com"
    },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
});