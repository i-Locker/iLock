import { CHAIN_ID_APTOS } from "@certusone/wormhole-sdk";
import { AptosClient } from "aptos";
import { hexZeroPad } from "ethers/lib/utils";
import { APTOS_URL, getBridgeAddressForChain } from "./consts";
export var AptosNetwork;
(function (AptosNetwork) {
    AptosNetwork["Testnet"] = "Testnet";
    AptosNetwork["Mainnet"] = "Mainnet";
    AptosNetwork["Devnet"] = "Devnet";
    AptosNetwork["Localhost"] = "Localhost";
})(AptosNetwork || (AptosNetwork = {}));
export const getAptosClient = () => new AptosClient(APTOS_URL);
export const getEmitterAddressAndSequenceFromResult = (result) => {
    const data = result.events.find((e) => e.type ===
        `${getBridgeAddressForChain(CHAIN_ID_APTOS)}::state::WormholeMessage`)?.data;
    const emitterAddress = hexZeroPad(`0x${parseInt(data?.sender).toString(16)}`, 32).substring(2);
    const sequence = data?.sequence;
    return {
        emitterAddress,
        sequence,
    };
};
export async function waitForSignAndSubmitTransaction(payload, signAndSubmitTransaction) {
    // The wallets do not handle Uint8Array serialization'
    if (payload?.arguments) {
        payload.arguments = payload.arguments.map((a) => a instanceof Uint8Array ? Array.from(a) : a);
    }
    try {
        let hash = "";
        hash = (await signAndSubmitTransaction(payload)).hash;
        if (!hash) {
            throw new Error("Invalid hash");
        }
        const client = getAptosClient();
        await client.waitForTransaction(hash);
        return hash;
    }
    catch (e) {
        throw e;
    }
}
