import { useMemo } from 'react';
import { useActiveWeb3React } from "../utils/hooks/useActiveWeb3React";
export var WrapType;
(function (WrapType) {
    WrapType[WrapType["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
    WrapType[WrapType["WRAP"] = 1] = "WRAP";
    WrapType[WrapType["UNWRAP"] = 2] = "UNWRAP";
})(WrapType || (WrapType = {}));
const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE };
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(inputCurrency, outputCurrency, typedValue) {
    const { chainId, account } = useActiveWeb3React();
    // we can always parse the amount typed as the input currency, since wrapping is 1:1
    return useMemo(() => {
        if (!chainId || !inputCurrency || !outputCurrency)
            return NOT_APPLICABLE;
        if (inputCurrency.isNative) {
            return {
                wrapType: WrapType.WRAP,
            };
        }
        else if (outputCurrency.isNative) {
            return {
                wrapType: WrapType.UNWRAP,
            };
        }
        else {
            return NOT_APPLICABLE;
        }
    }, [chainId, inputCurrency, outputCurrency]);
}
