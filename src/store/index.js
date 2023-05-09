import { configureStore } from "@reduxjs/toolkit";
import attestReducer from "./attestSlice";
import transferReducer from "./transferSlice";
import tokenReducer from "./tokenSlice";
import feeReducer from "./feeSlice";
import usdcReducer from "./usdcSlice";
export const store = configureStore({
    reducer: {
        attest: attestReducer,
        nft: nftReducer,
        transfer: transferReducer,
        tokens: tokenReducer,
        fee: feeReducer,
        usdc: usdcReducer,
    },
});
