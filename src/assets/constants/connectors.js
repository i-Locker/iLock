import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { network_,network_dec_to_hex } from "../../constants.js";
import { provider } from "../../web3.js";

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
    supportedChainIds: [1, 5, 25, 56, 97, 137, 338, 444, 43113, 43114, 44444, 80001, 420420, 420666],
});

export const walletconnect = new WalletConnectConnector({
    rpc: { 
        1: provider[network_[network_dec_to_hex[1]]],
        5: provider[network_[network_dec_to_hex[5]]],
        56: provider[network_[network_dec_to_hex[56]]],
        97: provider[network_[network_dec_to_hex[97]]],
        137: provider[network_[network_dec_to_hex[137]]],
        338: provider[network_[network_dec_to_hex[338]]],
        444: provider[network_[network_dec_to_hex[444]]],
        43113: provider[network_[network_dec_to_hex[43113]]],
        43114: provider[network_[network_dec_to_hex[43114]]],
        44444: provider[network_[network_dec_to_hex[44444]]],
        80001: provider[network_[network_dec_to_hex[80001]]],
        420420: provider[network_[network_dec_to_hex[420420]]],
        420666: provider[network_[network_dec_to_hex[420666]]]
    },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
});