import { createSlice } from '@reduxjs/toolkit';
import USDTLOGO from '../../assets/roundedlogo.svg';
export var TrxState;
(function (TrxState) {
    TrxState[TrxState["WaitingForConfirmation"] = 0] = "WaitingForConfirmation";
    TrxState[TrxState["TransactionSubmitted"] = 1] = "TransactionSubmitted";
    TrxState[TrxState["TransactionSuccessful"] = 2] = "TransactionSuccessful";
    TrxState[TrxState["TransactionFailed"] = 3] = "TransactionFailed";
})(TrxState || (TrxState = {}));
const initialState = {
    modal: null,
    message: "",
    refresh: false,
    tokenGroup: [{
            id: 1,
            img: USDTLOGO,
            name: "RigelProtocol Extended",
            type: "RigelProtocol Extended",
            display: true
        }, {
            id: 2,
            img: USDTLOGO,
            name: "RigelProtocol Extended",
            type: "RigelProtocol Token List",
            display: false
        }
    ]
};
const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setOpenModal(state, action) {
            console.log(action.payload);
            state.modal = action.payload;
        },
        setCloseModal(state) {
            state.modal = null;
        },
        setTokenGroup(state, action) {
            state.tokenGroup = state.tokenGroup.map(obj => {
                if (action.payload.id === obj.id) {
                    return {
                        ...obj,
                        display: obj.display = action.payload.checked
                    };
                }
                else {
                    return obj;
                }
            });
        },
        setRefresh(state) {
            state.refresh = !state.refresh;
        }
    }
});
export const { setOpenModal, setCloseModal, setTokenGroup, setRefresh } = applicationSlice.actions;
export default applicationSlice.reducer;
