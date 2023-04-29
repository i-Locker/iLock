import { createReducer } from "@reduxjs/toolkit";
import { setChainId } from "./actions";
const initialState = {
    chainId: undefined,
};
export default createReducer(initialState, (builder) => builder
    .addCase(setChainId, (state, action) => {
    const chainId = action.payload.value;
    return {
        ...state,
        chainId: chainId,
    };
}));
