import { useCallback, useEffect, useState } from "react";
import { Field, selectCurrency, typeInput, replaceSwapState, switchCurrencies, selectMarketFactory, } from "./actions";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";
import { useCurrency } from "../../hooks/Tokens";
import { useDispatch, useSelector } from "react-redux";
import { useNativeBalance } from "../../utils/hooks/useBalances";
import { getERC20Token } from "../../utils/utilsFunctions";
import { isAddress, ParseFloat } from "../../utils";
import { ethers } from "ethers";
import { SupportedChainSymbols } from "../../utils/constants/chains";
import { useSwap } from "../../hooks/useSwap";
import { parseUnits } from "@ethersproject/units";
import useParsedQueryString from "../../hooks/useParsedQueryString";
import JSBI from "jsbi";
import { ZERO_ADDRESS } from "../../constants";
export function tryParseAmount(value, currency) {
    if (!value || !currency) {
        return undefined;
    }
    try {
        const typedValueParsed = parseUnits(value, currency.decimals).toString();
        if (typedValueParsed !== "0") {
            return typedValueParsed;
        }
    }
    catch (error) {
        // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
        console.debug(`Failed to parse input amount: "${value}"`, error);
    }
    // necessary for all paths to return a value
    return undefined;
}
export function useSwapState() {
    return useSelector((state) => state.swap);
}
export function useSwapActionHandlers() {
    const dispatch = useDispatch();
    const onCurrencySelection = useCallback((field, currency) => {
        dispatch(selectCurrency({
            field,
            currencyId: currency.isToken
                ? currency.address
                : currency.isNative
                    ? currency.symbol
                    : "",
        }));
    }, [dispatch]);
    const onMarketSelection = useCallback((marketFactory, marketRouterAddress) => {
        dispatch(selectMarketFactory({
            marketFactory,
            marketRouterAddress,
        }));
    }, [dispatch]);
    const onSwitchTokens = useCallback(() => {
        dispatch(switchCurrencies());
    }, [dispatch]);
    const onUserInput = useCallback((field, typedValue) => {
        dispatch(typeInput({ field, typedValue }));
    }, [dispatch]);
    return {
        onCurrencySelection,
        onUserInput,
        onSwitchTokens,
        onMarketSelection,
    };
}
export function useDerivedSwapInfo() {
    const { account } = useActiveWeb3React();
    const [Balance] = useNativeBalance();
    const { independentField, typedValue, [Field.INPUT]: { currencyId: inputCurrencyId }, [Field.OUTPUT]: { currencyId: outputCurrencyId }, recipient, marketFactory, marketRouterAddress, } = useSwapState();
    const inputCurrency = useCurrency(inputCurrencyId);
    const outputCurrency = useCurrency(outputCurrencyId);
    const isExactIn = independentField === Field.INPUT;
    const currencies = {
        [Field.INPUT]: inputCurrency ?? undefined,
        [Field.OUTPUT]: outputCurrency ?? undefined,
    };
    const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined);
    const [address, wrap, amount, pathArray, pathSymbol] = useSwap(
    // isExactIn ? inputCurrency : outputCurrency,
    inputCurrency, 
    // isExactIn ? outputCurrency : inputCurrency,
    outputCurrency, parsedAmount, marketFactory, marketRouterAddress);
    const [, , unitAmount, , , oppositeAmount] = useSwap(
    // isExactIn ? inputCurrency : outputCurrency,
    inputCurrency, 
    // isExactIn ? outputCurrency : inputCurrency,
    outputCurrency, `${10 ** inputCurrency?.decimals}`, marketFactory, marketRouterAddress, "unit");
    const formatAmount = tryParseAmount(amount, inputCurrency);
    const showWrap = wrap;
    const bestTrade = amount;
    const getMaxValue = async (currency, library) => {
        if (currency.isNative) {
            // return Balance === "0.0000" ? "0" :  Balance
            const balance = await library?.getBalance(account);
            return balance ? JSBI.BigInt(balance.toString()) : undefined;
        }
        else if (isAddress(currency.address)) {
            const token = await getERC20Token(currency.address ? currency.address : "", library);
            const [balance, decimals] = await Promise.all([
                token.balanceOf(account),
                token.decimals(),
            ]);
            const amount = ethers.utils.formatUnits(balance.toString(), decimals);
            return amount === "0.0" ? "0" : ParseFloat(amount, 4);
        }
    };
    let inputError;
    if ((inputCurrency && outputCurrency && !typedValue) ||
        (inputCurrency && outputCurrency && typedValue == 0)) {
        inputError = "Enter an amount";
    }
    if (!inputCurrency || !outputCurrency || !address) {
        inputError = inputError ?? "Select a Token";
    }
    if (parseFloat(typedValue) > 0 && pathArray?.length === 0 && !wrap) {
        inputError = "Insufficient Liquidity for this Trade.";
    }
    if (address === ZERO_ADDRESS) {
        inputError = "Insufficient Liquidity for this Trade.";
    }
    return {
        currencies,
        getMaxValue,
        bestTrade,
        parsedAmount,
        inputError,
        showWrap,
        pathArray,
        pathSymbol,
        isExactIn,
        formatAmount,
        unitAmount,
        oppositeAmount,
    };
}
function parseTokenAmountURLParameter(urlParam) {
    // eslint-disable-next-line no-restricted-globals
    return typeof urlParam === "string" && !isNaN(parseFloat(urlParam))
        ? urlParam
        : "";
}
function parseIndependentFieldURLParameter(urlParam) {
    return typeof urlParam === "string" && urlParam.toLowerCase() === "output"
        ? Field.OUTPUT
        : Field.INPUT;
}
const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/;
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
function validatedRecipient(recipient) {
    if (typeof recipient !== "string")
        return null;
    const address = isAddress(recipient);
    if (address)
        return address;
    if (ENS_NAME_REGEX.test(recipient))
        return recipient;
    if (ADDRESS_REGEX.test(recipient))
        return recipient;
    return null;
}
function parseCurrencyFromURLParameter(urlParam, symbol = "") {
    if (typeof urlParam === "string") {
        const valid = isAddress(urlParam);
        if (valid)
            return valid;
        if (valid === false)
            return symbol;
    }
    return urlParam ?? "";
}
function queryParametersToSwapState(parsedQs, chainId) {
    let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency);
    let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency);
    const symbol = SupportedChainSymbols[chainId ?? 56];
    if (inputCurrency === "" && outputCurrency === "") {
        inputCurrency = symbol;
        outputCurrency = "";
    }
    else if (inputCurrency === "") {
        inputCurrency = outputCurrency === symbol ? "" : symbol;
    }
    else if (outputCurrency === "" || inputCurrency === outputCurrency) {
        outputCurrency = inputCurrency === symbol ? "" : symbol;
    }
    const recipient = validatedRecipient(parsedQs.recipient);
    return {
        [Field.INPUT]: {
            currencyId: inputCurrency,
        },
        [Field.OUTPUT]: {
            currencyId: outputCurrency,
        },
        typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
        independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
        recipient,
    };
}
export const binanceMarketArray = [
    { name: "Smartswap", image: "Smartswap.png" },
    { name: "Pancakeswap", image: "Pancakeswap.png" },
];
export const polygonMarketArray = [
    { name: "Smartswap", image: "Smartswap.png" },
    { name: "Quickswap", image: "Quickswap.png" },
];
export const binanceTestMarketArray = [
    { name: "Smartswap", image: "Smartswap.png" },
];
export const AvalancheMarketArray = [
    { name: "Tradejoe", image: "tradejoe.png" },
    { name: "Lydia", image: "lydia.png" },
];
export const binanceFreeMarketArray = [
    // { name: "Smartswap", image: "Smartswap.png" },
    { name: "Pancakeswap", image: "Pancakeswap.png" },
];
export const polygonTestFreeMarketArray = [
    { name: "Smartswap", image: "Smartswap.png" },
    { name: "Quickswap", image: "Quickswap.png" },
];
export const polygonFreeMarketArray = [
    { name: "Quickswap", image: "Quickswap.png" },
];
export const binanceTestFreeMarketArray = [
    { name: "Smartswap", image: "Smartswap.png" },
];
export const AvalancheFreeMarketArray = [
    { name: "Tradejoe", image: "tradejoe.png" },
];
// updates the swap state to use the defaults for a given network
export function useDefaultsFromURLSearch() {
    const { account, chainId } = useActiveWeb3React();
    const ChainId = useSelector((state) => state.chainId.chainId);
    const dispatch = useDispatch();
    const parsedQs = useParsedQueryString();
    const [result, setResult] = useState();
    useEffect(() => {
        if (!ChainId)
            return;
        const parsed = queryParametersToSwapState(parsedQs, ChainId);
        dispatch(replaceSwapState({
            typedValue: parsed.typedValue,
            field: parsed.independentField,
            inputCurrencyId: parsed[Field.INPUT].currencyId,
            outputCurrencyId: parsed[Field.OUTPUT].currencyId,
            recipient: null,
        }));
        setResult({
            inputCurrencyId: parsed[Field.INPUT].currencyId,
            outputCurrencyId: parsed[Field.OUTPUT].currencyId,
        });
    }, [dispatch, ChainId]);
    return result;
}
