import { addTransaction, checkedTransaction, clearAllTransactions, finalizeTransaction, transactionTab, detailsTab, refreshTransactionTab, notificationTab } from './actions';
import { createReducer } from '@reduxjs/toolkit';
const now = () => new Date().getTime();
export const initialState = {
    removeSideTab: false,
    removeDetailsTab: false,
    refresh: 0,
    autoTimeNotification: 0,
    setPriceNotification: 0,
    address: ""
};
export default createReducer(initialState, (builder) => builder
    .addCase(addTransaction, (transactions, { payload: { chainId, from, hash, approval, summary, claim, archer } }) => {
    if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.');
    }
    const txs = transactions[chainId] ?? {};
    txs[hash] = {
        hash,
        approval,
        summary,
        claim,
        from,
        addedTime: now(),
        archer,
    };
    transactions[chainId] = txs;
})
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
    if (!transactions[chainId])
        return;
    transactions[chainId] = {};
})
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
    const tx = transactions[chainId]?.[hash];
    if (!tx) {
        return;
    }
    if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
    }
    else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
    }
})
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
    const tx = transactions[chainId]?.[hash];
    if (!tx) {
        return;
    }
    tx.receipt = receipt;
    tx.confirmedTime = now();
})
    .addCase(transactionTab, (transactions, { payload: { removeSideTab } }) => {
    transactions.removeSideTab = removeSideTab;
})
    .addCase(detailsTab, (transactions, { payload: { removeDetailsTab } }) => {
    transactions.removeDetailsTab = removeDetailsTab;
})
    .addCase(refreshTransactionTab, (transactions, { payload: { refresh } }) => {
    transactions.refresh = refresh;
})
    .addCase(notificationTab, (transactions, { payload: { setPriceNotification, autoTimeNotification, address } }) => {
    console.log({ autoTimeNotification });
    transactions.setPriceNotification = setPriceNotification ? setPriceNotification : transactions.setPriceNotification;
    transactions.autoTimeNotification = autoTimeNotification ? autoTimeNotification : transactions.autoTimeNotification;
    transactions.address = address ? address : transactions.address;
}));
