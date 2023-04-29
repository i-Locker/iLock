import { createAction } from '@reduxjs/toolkit';
export const addTransaction = createAction('transactions/addTransaction');
export const clearAllTransactions = createAction('transactions/clearAllTransactions');
export const finalizeTransaction = createAction('transactions/finalizeTransaction');
export const checkedTransaction = createAction('transactions/checkedTransaction');
export const transactionTab = createAction('transactions/transactionTab');
export const detailsTab = createAction('transactions/detailsTab');
export const refreshTransactionTab = createAction('transactions/refreshTab');
export const notificationTab = createAction('transactions/notificationTab');
