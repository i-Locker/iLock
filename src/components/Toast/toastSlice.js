import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    message: '',
    URL: '',
    error: false
};
const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, action) => {
            state.message = action.payload.message;
            state.URL = action.payload.URL;
            state.error = action.payload.error;
        },
        removeToast: (state) => {
            state.message = '';
        }
    }
});
export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
