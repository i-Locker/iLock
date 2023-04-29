import { createReducer } from "@reduxjs/toolkit";
import { clearAllFarms, clearSearchResult, updateFilterResult, updateNewFilterResult, updateNewSearchResult, updateProductFarmDetails, updateSearchResult, updateYieldFarmDetails } from "./action";
const initialState = {
    searchResult: undefined,
    newSearchResult: undefined,
    filterResult: undefined,
    newFilterResult: undefined,
    content: undefined,
    productFarm: undefined
};
export default createReducer(initialState, (builder) => builder
    .addCase(updateSearchResult, (farming, { payload: { farmData } }) => {
    return {
        ...farming,
        searchResult: farmData,
    };
})
    .addCase(updateNewSearchResult, (farming, { payload: { farmData } }) => {
    return {
        ...farming,
        newSearchResult: farmData,
    };
})
    .addCase(clearAllFarms, (farming, { payload }) => {
    return {
        ...farming,
        newSearchResult: undefined,
        newFilterResult: undefined,
        content: undefined,
    };
})
    .addCase(updateNewFilterResult, (farming, { payload: { farmData } }) => {
    return {
        ...farming,
        newFilterResult: farmData,
    };
})
    .addCase(updateYieldFarmDetails, (farming, { payload: { value } }) => {
    // const farms = action.payload.farmData;
    if (value !== undefined) {
        return {
            ...farming,
            content: value,
        };
    }
})
    .addCase(updateProductFarmDetails, (farming, { payload: { value } }) => {
    // const farms = action.payload.farmData;
    if (value !== undefined) {
        return {
            ...farming,
            productFarm: value,
        };
    }
})
    .addCase(updateFilterResult, (farming, { payload: { farmData } }) => {
    return {
        ...farming,
        filterResult: farmData,
    };
})
    .addCase(clearSearchResult, (farming, {}) => {
    return {
        ...farming,
        searchResult: undefined,
        filterResult: undefined,
    };
}));
