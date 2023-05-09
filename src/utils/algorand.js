import MyAlgoConnect from "@randlabs/myalgo-connect";
import { assignGroupID, waitForConfirmation } from "algosdk";
import { ALGORAND_WAIT_FOR_CONFIRMATIONS } from "./consts";
export async function signSendAndConfirmAlgorand(algodClient, txs) {
    const myAlgoConnect = new MyAlgoConnect();
    assignGroupID(txs.map((tx) => tx.tx));
    const signedTxns = [];
    const lsigSignedTxns = [];
    const walletUnsignedTxns = [];
    // sign all the lsigs
    for (const lsigTx of txs) {
        if (lsigTx.signer) {
            lsigSignedTxns.push(await lsigTx.signer.signTxn(lsigTx.tx));
        }
    }
    // assemble the txs for the wallet to sign
    for (const walletTx of txs) {
        if (!walletTx.signer) {
            walletUnsignedTxns.push(walletTx.tx.toByte());
        }
    }
    const walletSignedTxns = await myAlgoConnect.signTransaction(walletUnsignedTxns);
    let lsigIdx = 0;
    let walletIdx = 0;
    for (const originalTx of txs) {
        if (originalTx.signer) {
            signedTxns.push(lsigSignedTxns[lsigIdx++]);
        }
        else {
            signedTxns.push(walletSignedTxns[walletIdx++].blob);
        }
    }
    await algodClient.sendRawTransaction(signedTxns).do();
    const result = await waitForConfirmation(algodClient, txs[txs.length - 1].tx.txID(), ALGORAND_WAIT_FOR_CONFIRMATIONS);
    return result;
}
