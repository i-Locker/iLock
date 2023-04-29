import { createAction } from "@reduxjs/toolkit";
export const updateUserSlippageTolerance = createAction("user/updateUserSlippageTolerance");
export const addSerializedToken = createAction("user/addSerializedToken");
export const removeSerializedToken = createAction("user/removeSerializedToken");
export const updateUserDeadline = createAction("user/updateUserDeadline");
