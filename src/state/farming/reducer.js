import { createReducer } from "@reduxjs/toolkit";
import { clearAllFarms, clearSearchResult, updateFilterResult, updateNewFilterResult, updateNewSearchResult, updateProductFarmDetails, updateSearchResult, updateSelectedField, updateYieldFarmDetails } from "./action";
var farmSection;
(function (farmSection) {
    farmSection[farmSection["LIQUIDITY"] = 0] = "LIQUIDITY";
    farmSection[farmSection["STAKING"] = 1] = "STAKING";
    farmSection[farmSection["PRODUCT_FARM"] = 2] = "PRODUCT_FARM";
    farmSection[farmSection["NEW_LP"] = 3] = "NEW_LP";
    farmSection[farmSection["SECOND_NEW_LP"] = 4] = "SECOND_NEW_LP";
})(farmSection || (farmSection = {}));
const initialState = {
    searchResult: undefined,
    newSearchResult: undefined,
    filterResult: undefined,
    newFilterResult: undefined,
    content: undefined,
    productFarm: undefined,
    selectedField: farmSection.LIQUIDITY
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
    // eslint-disable-next-line
    .addCase(clearSearchResult, (farming, {}) => {
    return {
        ...farming,
        searchResult: undefined,
        filterResult: undefined,
    };
})
    .addCase(updateSelectedField, (farming, { payload: { value } }) => {
    return {
        ...farming,
        selectedField: value
    };
}));
