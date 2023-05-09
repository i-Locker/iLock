import { createSlice } from "@reduxjs/toolkit";
import { errorDataWrapper, fetchDataWrapper, getEmptyDataWrapper, receiveDataWrapper, } from "./helpers";
const initialState = {
    solanaTokenMap: getEmptyDataWrapper(),
    terraTokenMap: getEmptyDataWrapper(),
    relayerTokenInfo: getEmptyDataWrapper(),
};
export const tokenSlice = createSlice({
    name: "tokenInfos",
    initialState,
    reducers: {
        receiveSolanaTokenMap: (state, action) => {
            state.solanaTokenMap = receiveDataWrapper(action.payload);
        },
        fetchSolanaTokenMap: (state) => {
            state.solanaTokenMap = fetchDataWrapper();
        },
        errorSolanaTokenMap: (state, action) => {
            state.solanaTokenMap = errorDataWrapper(action.payload);
        },
        receiveTerraTokenMap: (state, action) => {
            state.terraTokenMap = receiveDataWrapper(action.payload);
        },
        fetchTerraTokenMap: (state) => {
            state.terraTokenMap = fetchDataWrapper();
        },
        errorTerraTokenMap: (state, action) => {
            state.terraTokenMap = errorDataWrapper(action.payload);
        },
        receiveRelayerTokenInfo: (state, action) => {
            state.relayerTokenInfo = receiveDataWrapper(action.payload);
        },
        fetchRelayerTokenInfo: (state) => {
            state.relayerTokenInfo = fetchDataWrapper();
        },
        errorRelayerTokenInfo: (state, action) => {
            state.relayerTokenInfo = errorDataWrapper(action.payload);
        },
        reset: () => initialState,
    },
});
export const { receiveSolanaTokenMap, fetchSolanaTokenMap, errorSolanaTokenMap, receiveTerraTokenMap, fetchTerraTokenMap, errorTerraTokenMap, receiveRelayerTokenInfo, fetchRelayerTokenInfo, errorRelayerTokenInfo, reset, } = tokenSlice.actions;
export default tokenSlice.reducer;
