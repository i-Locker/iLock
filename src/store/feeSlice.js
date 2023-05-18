import { createSlice } from "@reduxjs/toolkit";
import { TERRA_DEFAULT_FEE_DENOM } from "../utils/consts";
const initialState = {
    terraFeeDenom: TERRA_DEFAULT_FEE_DENOM,
};
export const feeSlice = createSlice({
    name: "fee",
    initialState,
    reducers: {
        setTerraFeeDenom: (state, action) => {
            state.terraFeeDenom = action.payload;
        },
        reset: () => initialState,
    },
});
export const { setTerraFeeDenom, reset } = feeSlice.actions;
export default feeSlice.reducer;
