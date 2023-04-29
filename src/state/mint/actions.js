import { createAction } from '@reduxjs/toolkit';
export var Field;
(function (Field) {
    Field["INPUT"] = "INPUT";
    Field["OUTPUT"] = "OUTPUT";
})(Field || (Field = {}));
export const selectCurrency = createAction('mint/selectCurrency');
export const typeInput = createAction('mint/typeInputMint');
export const resetMintState = createAction('mint/resetMintState');
export const replaceMintState = createAction('mint/replaceMintState');
