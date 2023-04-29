import { INITIAL_GAS } from "../../utils/constants";
import { createReducer } from "@reduxjs/toolkit";
import { updateUserGasPrice, setDefaultGasPrice } from "./action";
const initialState = {
    userGasPrice: INITIAL_GAS,
    changed: false,
};
export default createReducer(initialState, (builder) => builder
    .addCase(updateUserGasPrice, (gas, { payload: { userGasPrice } }) => {
    return {
        ...gas,
        userGasPrice: userGasPrice,
        changed: true,
    };
})
    .addCase(setDefaultGasPrice, (gas, { payload: { userGasPrice } }) => {
    return {
        ...gas,
        userGasPrice: userGasPrice,
    };
}));
