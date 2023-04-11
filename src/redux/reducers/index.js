import { combineReducers } from "redux";
import config from "./config";
import { STATISTICS, CHANGE_WALLET, TOKENDATA, USERBALANCE, TOKENLISTS, LOCKERDATA, LOCKERSDATA } from "../constants";
import { accordionActionsClasses } from "@mui/material";

export function statistics(state = {}, action) {
    switch (action.type) {
        case STATISTICS:
            return action.payload
        default:
            return state
    }
}

export function walletAddress(state = '', action) {
    switch (action.type) {
        case CHANGE_WALLET:
            return {
                address: action.payload
            }
        default:
            return state
    }

    // return state;
}

export function tokenData(state={}, action) {
    switch (action.type) {
        case TOKENDATA:
            return action.payload
        default:
            return state
    }
}

export function lockersData(state=[], action) {
    switch (action.type) {
        case LOCKERSDATA: {
            localStorage.setItem("LOCKERSDATA", action.payload);
            return { ...state, lockersData: action.payload };
        }
        default: {
            return { ...state };
        }
    }
}

export function lockerData(state=[], action) {
    switch (action.type) {
        case LOCKERDATA:
            return action.payload
        default:
            return state
    }
}

export function userBalance(state=0, action) {
    switch (action.type) {
        case USERBALANCE:
            return action.payload
        default:
            return state
    }
}

export function tokenLists(state=[], action) {
    switch(action.type) {
        case TOKENLISTS:
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    config,
    statistics,
    walletAddress,
    tokenData,
    lockerData,
    lockersData,
    userBalance,
    tokenLists
});
export default rootReducer;
