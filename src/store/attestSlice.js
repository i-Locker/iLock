import { CHAIN_ID_ETH, CHAIN_ID_SOLANA, } from "@certusone/wormhole-sdk";
import { createSlice } from "@reduxjs/toolkit";
const LAST_STEP = 3;
const initialState = {
    activeStep: 0,
    sourceChain: CHAIN_ID_SOLANA,
    sourceAsset: "",
    targetChain: CHAIN_ID_ETH,
    attestTx: undefined,
    signedVAAHex: undefined,
    isSending: false,
    isCreating: false,
    createTx: undefined,
};
export const attestSlice = createSlice({
    name: "attest",
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
            state.sourceAsset = "";
            if (state.targetChain === action.payload) {
                state.targetChain = prevSourceChain;
            }
        },
        setSourceAsset: (state, action) => {
            state.sourceAsset = action.payload;
        },
        setTargetChain: (state, action) => {
            const prevTargetChain = state.targetChain;
            state.targetChain = action.payload;
            if (state.sourceChain === action.payload) {
                state.sourceChain = prevTargetChain;
                state.activeStep = 0;
                state.sourceAsset = "";
            }
        },
        setAttestTx: (state, action) => {
            state.attestTx = action.payload;
        },
        setSignedVAAHex: (state, action) => {
            state.signedVAAHex = action.payload;
            state.isSending = false;
            state.activeStep = 3;
        },
        setIsSending: (state, action) => {
            state.isSending = action.payload;
        },
        setIsCreating: (state, action) => {
            state.isCreating = action.payload;
        },
        setCreateTx: (state, action) => {
            state.createTx = action.payload;
            state.isCreating = false;
        },
        reset: (state) => ({
            ...initialState,
            sourceChain: state.sourceChain,
            targetChain: state.targetChain,
        }),
    },
});
export const { incrementStep, decrementStep, setStep, setSourceChain, setSourceAsset, setTargetChain, setAttestTx, setSignedVAAHex, setIsSending, setIsCreating, setCreateTx, reset, } = attestSlice.actions;
export default attestSlice.reducer;
