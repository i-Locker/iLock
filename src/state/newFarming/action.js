import { createAction } from "@reduxjs/toolkit";
export const updateSearchResult = createAction("newFarming/updateSearchResult");
export const updateNewSearchResult = createAction("newFarming/updateNewSearchResult");
export const updateFilterResult = createAction("newFarming/updateFilterResult");
export const updateNewFilterResult = createAction("newFarming/updateNewFilterResult");
export const clearSearchResult = createAction("newFarming/clearSearchResult");
export const updateYieldFarmDetails = createAction("newFarming/updateYieldFarmDetails");
export const updateProductFarmDetails = createAction("newFarming/updateProductFarmDetails");
export const clearAllFarms = createAction("newFarming/clearAllFarms");
