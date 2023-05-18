import { CHAIN_ID_ETH, CHAIN_ID_SOLANA, } from "@certusone/wormhole-sdk";
import { createSlice } from "@reduxjs/toolkit";
import { errorDataWrapper, fetchDataWrapper, getEmptyDataWrapper, receiveDataWrapper, } from "./helpers";
const LAST_STEP = 3;
const initialState = {
    activeStep: 0,
    sourceChain: CHAIN_ID_SOLANA,
    isSourceAssetWormholeWrapped: false,
    sourceWalletAddress: undefined,
    sourceParsedTokenAccount: undefined,
    sourceParsedTokenAccounts: getEmptyDataWrapper(),
    originChain: undefined,
    originAsset: undefined,
    amount: "",
    targetChain: CHAIN_ID_ETH,
    targetAddressHex: undefined,
    targetAsset: getEmptyDataWrapper(),
    targetParsedTokenAccount: undefined,
    transferTx: undefined,
    signedVAAHex: undefined,
    isSending: false,
    isVAAPending: false,
    isRedeeming: false,
    redeemTx: undefined,
    isApproving: false,
    isRecovery: false,
    gasPrice: undefined,
    useRelayer: false,
    relayerFee: undefined,
    acalaRelayerInfo: getEmptyDataWrapper(),
};
export const transferSlice = createSlice({
    name: "transfer",
    initialState,
    reducers: {
        incrementStep: (state) => {
            if (state.activeStep < LAST_STEP)
                state.activeStep++;
        },
        decrementStep: (state) => {
            if (state.activeStep > 0)
                state.activeStep--;
        },
        setStep: (state, action) => {
            state.activeStep = action.payload;
        },
        setSourceChain: (state, action) => {
            const prevSourceChain = state.sourceChain;
            state.sourceChain = action.payload;
            state.sourceParsedTokenAccount = undefined;
            state.sourceParsedTokenAccounts = getEmptyDataWrapper();
            // clear targetAsset so that components that fire before useFetchTargetAsset don't get stale data
            state.targetAsset = getEmptyDataWrapper();
            state.targetParsedTokenAccount = undefined;
            state.targetAddressHex = undefined;
            state.isSourceAssetWormholeWrapped = undefined;
            state.originChain = undefined;
            state.originAsset = undefined;
            if (state.targetChain === action.payload) {
                state.targetChain = prevSourceChain;
            }
        },
        setSourceWormholeWrappedInfo: (state, action) => {
            state.isSourceAssetWormholeWrapped = action.payload.isWrapped;
            state.originChain = action.payload.chainId;
            state.originAsset = action.payload.assetAddress;
        },
        setSourceWalletAddress: (state, action) => {
            state.sourceWalletAddress = action.payload;
        },
        setSourceParsedTokenAccount: (state, action) => {
            state.sourceParsedTokenAccount = action.payload;
            // clear targetAsset so that components that fire before useFetchTargetAsset don't get stale data
            state.targetAsset = getEmptyDataWrapper();
            state.targetParsedTokenAccount = undefined;
            state.targetAddressHex = undefined;
            state.isSourceAssetWormholeWrapped = undefined;
            state.originChain = undefined;
            state.originAsset = undefined;
        },
        setSourceParsedTokenAccounts: (state, action) => {
            state.sourceParsedTokenAccounts = action.payload
                ? receiveDataWrapper(action.payload)
                : getEmptyDataWrapper();
        },
        fetchSourceParsedTokenAccounts: (state) => {
            state.sourceParsedTokenAccounts = fetchDataWrapper();
        },
        errorSourceParsedTokenAccounts: (state, action) => {
            state.sourceParsedTokenAccounts = errorDataWrapper(action.payload || "An unknown error occurred.");
        },
        receiveSourceParsedTokenAccounts: (state, action) => {
            state.sourceParsedTokenAccounts = receiveDataWrapper(action.payload);
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setTargetChain: (state, action) => {
            const prevTargetChain = state.targetChain;
            state.targetChain = action.payload;
            state.targetAddressHex = undefined;
            // clear targetAsset so that components that fire before useFetchTargetAsset don't get stale data
            state.targetAsset = getEmptyDataWrapper();
            state.targetParsedTokenAccount = undefined;
            if (state.sourceChain === action.payload) {
                state.sourceChain = prevTargetChain;
                state.activeStep = 0;
                state.sourceParsedTokenAccount = undefined;
                state.isSourceAssetWormholeWrapped = undefined;
                state.originChain = undefined;
                state.originAsset = undefined;
                state.sourceParsedTokenAccounts = getEmptyDataWrapper();
            }
        },
        setTargetAddressHex: (state, action) => {
            state.targetAddressHex = action.payload;
        },
        setTargetAsset: (state, action) => {
            state.targetAsset = action.payload;
            state.targetParsedTokenAccount = undefined;
        },
        setTargetParsedTokenAccount: (state, action) => {
            state.targetParsedTokenAccount = action.payload;
        },
        setTransferTx: (state, action) => {
            state.transferTx = action.payload;
        },
        setSignedVAAHex: (state, action) => {
            state.signedVAAHex = action.payload;
            state.isSending = false;
            state.isVAAPending = false;
            state.activeStep = 3;
        },
        setIsSending: (state, action) => {
            state.isSending = action.payload;
        },
        setIsVAAPending: (state, action) => {
            state.isVAAPending = action.payload;
        },
        setIsRedeeming: (state, action) => {
            state.isRedeeming = action.payload;
        },
        setRedeemTx: (state, action) => {
            state.redeemTx = action.payload;
            state.isRedeeming = false;
        },
        setIsApproving: (state, action) => {
            state.isApproving = action.payload;
        },
        reset: (state) => ({
            ...initialState,
            sourceChain: state.sourceChain,
            targetChain: state.targetChain,
        }),
        setRecoveryVaa: (state, action) => {
            const prevTargetChain = state.targetChain;
            state.signedVAAHex = action.payload.vaa;
            state.targetChain = action.payload.parsedPayload.targetChain;
            if (state.sourceChain === action.payload.parsedPayload.targetChain) {
                state.sourceChain = prevTargetChain;
            }
            state.sourceParsedTokenAccount = undefined;
            state.sourceParsedTokenAccounts = getEmptyDataWrapper();
            // clear targetAsset so that components that fire before useFetchTargetAsset don't get stale data
            state.targetAsset = getEmptyDataWrapper();
            state.targetParsedTokenAccount = undefined;
            state.isSourceAssetWormholeWrapped = undefined;
            state.targetAddressHex = action.payload.parsedPayload.targetAddress;
            state.originChain = action.payload.parsedPayload.originChain;
            state.originAsset = action.payload.parsedPayload.originAddress;
            state.amount = action.payload.parsedPayload.amount;
            state.activeStep = 3;
            state.isRecovery = true;
            state.useRelayer = action.payload.useRelayer;
        },
        setGasPrice: (state, action) => {
            state.gasPrice = action.payload;
        },
        setUseRelayer: (state, action) => {
            state.useRelayer = !!action.payload;
        },
        setRelayerFee: (state, action) => {
            state.relayerFee = action.payload;
        },
        setAcalaRelayerInfo: (state, action) => {
            state.acalaRelayerInfo = action.payload
                ? receiveDataWrapper(action.payload)
                : getEmptyDataWrapper();
        },
        fetchAcalaRelayerInfo: (state) => {
            state.acalaRelayerInfo = fetchDataWrapper();
        },
        errorAcalaRelayerInfo: (state, action) => {
            state.acalaRelayerInfo = errorDataWrapper(action.payload || "An unknown error occurred.");
        },
        receiveAcalaRelayerInfo: (state, action) => {
            state.acalaRelayerInfo = receiveDataWrapper(action.payload);
        },
    },
});
export const { incrementStep, decrementStep, setStep, setSourceChain, setSourceWormholeWrappedInfo, setSourceWalletAddress, setSourceParsedTokenAccount, setSourceParsedTokenAccounts, receiveSourceParsedTokenAccounts, errorSourceParsedTokenAccounts, fetchSourceParsedTokenAccounts, setAmount, setTargetChain, setTargetAddressHex, setTargetAsset, setTargetParsedTokenAccount, setTransferTx, setSignedVAAHex, setIsSending, setIsVAAPending, setIsRedeeming, setRedeemTx, setIsApproving, reset, setRecoveryVaa, setGasPrice, setUseRelayer, setRelayerFee, setAcalaRelayerInfo, fetchAcalaRelayerInfo, errorAcalaRelayerInfo, receiveAcalaRelayerInfo, } = transferSlice.actions;
export default transferSlice.reducer;
