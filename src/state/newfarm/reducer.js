import { createReducer } from "@reduxjs/toolkit";
import { updateFarms, updateLoadingState, updateSpecialPool, updateChainId, } from "./actions";
const initialState = {
    loading: false,
    contents: undefined,
    specialPool: undefined,
    chainId: 56,
};
export default createReducer(initialState, (builder) => builder
    .addCase(updateFarms, (state, action) => {
    const farms = action.payload.value;
    if (farms !== undefined) {
        return {
            ...state,
            contents: farms,
            loading: false,
        };
    }
})
    .addCase(updateSpecialPool, (state, action) => {
    const farms = action.payload.value;
    if (farms !== undefined) {
        return {
            ...state,
            specialPool: farms,
            loading: false,
        };
    }
})
    .addCase(updateChainId, (state, action) => {
    const chainId = action.payload.value;
    return {
        ...state,
        chainId: chainId,
    };
})
    // .addCase(updateSpecialPool, (state, action) => {
    //   const farms = action.payload.value;
    //   if (farms !== undefined) {
    //     return {
    //       ...state,
    //       specialPool: farms,
    //       loading: false,
    //     };
    //   }
    // })
    .addCase(updateLoadingState, (state, action) => {
    if (state.contents !== undefined) {
        return {
            ...state,
            loading: false,
        };
    }
    else {
        return {
            ...state,
            loading: action.payload.value,
        };
    }
}));
