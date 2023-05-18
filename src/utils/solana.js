import { BigNumber } from "@ethersproject/bignumber";
import { MintLayout } from "@solana/spl-token";
import { PublicKey, } from "@solana/web3.js";
export async function signSendAndConfirm(wallet, connection, transaction) {
    if (!wallet.signTransaction) {
        throw new Error("wallet.signTransaction is undefined");
    }
    const signed = await wallet.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);
    return txid;
}
export function extractMintInfo(account) {
    const data = Buffer.from(account.data);
    const mintInfo = MintLayout.decode(data);
    const uintArray = mintInfo?.mintAuthority;
    const pubkey = new PublicKey(uintArray);
    const supply = BigNumber.from(mintInfo?.supply.reverse()).toString();
    const output = {
        mintAuthority: pubkey?.toString(),
        supply: supply.toString(),
    };
    return output;
}
export async function getMultipleAccountsRPC(connection, pubkeys) {
    return getMultipleAccounts(connection, pubkeys, "confirmed");
}
export const getMultipleAccounts = async (connection, pubkeys, commitment) => {
    return (await Promise.all(chunks(pubkeys, 99).map((chunk) => connection.getMultipleAccountsInfo(chunk, commitment)))).flat();
};
export function chunks(array, size) {
    return Array.apply(0, new Array(Math.ceil(array.length / size))).map((_, index) => array.slice(index * size, (index + 1) * size));
}
export function shortenAddress(address) {
    return address.length > 10
        ? `${address.slice(0, 4)}...${address.slice(-4)}`
        : address;
}
