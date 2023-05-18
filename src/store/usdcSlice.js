import { CHAIN_ID_AVAX, CHAIN_ID_ETH } from "@certusone/wormhole-sdk";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    sourceChain: CHAIN_ID_ETH,
    targetChain: CHAIN_ID_AVAX,
    balance: null,
    relayerFee: null,
    maxSwapAmount: null,
    estimatedSwapAmount: null,
    amount: "",
    shouldRelay: false,
    toNativeAmount: "0",
    isSending: false,
    sourceTxHash: "",
    sourceTxConfirmed: false,
    transferInfo: null,
    isRedeeming: false,
    isRedeemComplete: false,
    targetTxHash: "",
    allowanceError: "",
    shouldApproveUnlimited: false,
};
export const usdcSlice = createSlice({
    name: "usdc",
    initialState,
    reducers: {
        setSourceChain: (state, action) => {
            const prevSourceChain = state.sourceChain;
            state.sourceChain = action.payload;
            if (state.targetChain === action.payload) {
                state.targetChain = prevSourceChain;
            }
        },
        setTargetChain: (state, action) => {
            const prevTargetChain = state.sourceChain;
            state.targetChain = action.payload;
            if (state.sourceChain === action.payload) {
                state.sourceChain = prevTargetChain;
            }
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
        setRelayerFee: (state, action) => {
            state.relayerFee = action.payload;
        },
        setMaxSwapAmount: (state, action) => {
            state.maxSwapAmount = action.payload;
        },
        setEstimatedSwapAmount: (state, action) => {
            state.estimatedSwapAmount = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setShouldRelay: (state, action) => {
            state.shouldRelay = action.payload;
        },
        setToNativeAmount: (state, action) => {
            state.toNativeAmount = action.payload;
        },
        setIsSending: (state, action) => {
            state.isSending = action.payload;
        },
        setSourceTxHash: (state, action) => {
            state.sourceTxHash = action.payload;
        },
        setSourceTxConfirmed: (state, action) => {
            state.sourceTxConfirmed = action.payload;
        },
        setTransferInfo: (state, action) => {
            state.transferInfo = action.payload;
        },
        setIsRedeeming: (state, action) => {
            state.isRedeeming = action.payload;
        },
        setIsRedeemComplete: (state, action) => {
            state.isRedeemComplete = action.payload;
        },
        setTargetTxHash: (state, action) => {
            state.targetTxHash = action.payload;
        },
        setAllowanceError: (state, action) => {
            state.allowanceError = action.payload;
        },
        setShouldApproveUnlimited: (state, action) => {
            state.shouldApproveUnlimited = action.payload;
        },
        reset: (state) => ({
            ...initialState,
            sourceChain: state.sourceChain,
            targetChain: state.targetChain,
        }),
    },
});
export const { setSourceChain, setTargetChain, setBalance, setRelayerFee, setMaxSwapAmount, setEstimatedSwapAmount, setAmount, setShouldRelay, setToNativeAmount, setIsSending, setSourceTxHash, setSourceTxConfirmed, setTransferInfo, setIsRedeeming, setIsRedeemComplete, setTargetTxHash, setAllowanceError, setShouldApproveUnlimited, reset, } = usdcSlice.actions;
export default usdcSlice.reducer;
