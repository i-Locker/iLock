import { createAction } from "@reduxjs/toolkit";
export var Field;
(function (Field) {
    Field["INPUT"] = "INPUT";
    Field["OUTPUT"] = "OUTPUT";
})(Field || (Field = {}));
export const selectCurrency = createAction("swap/selectCurrency");
export const selectMarketFactory = createAction("swap/selectMarketFactory");
export const selectMarketRouterAddress = createAction("swap/selectMarketRouterAddress");
export const typeInput = createAction("swap/typeInput");
export const switchCurrencies = createAction("swap/switchCurrencies");
export const replaceSwapState = createAction("swap/replaceSwapState");
