import { useEffect, useState } from "react";
import { useActiveWeb3React } from "../utils/hooks/useActiveWeb3React";
import { smartFactory, SmartSwapRouter } from "../utils/Contracts";
import { BUSD, RGPADDRESSES, SMARTSWAPFACTORYADDRESSES, SMARTSWAPROUTER, USDT, WNATIVEADDRESSES, } from "../utils/addresses";
import { ZERO_ADDRESS } from "../constants";
import { ethers } from "ethers";
import { getAddress } from "../utils/hooks/usePools";
import { SupportedChainSymbols } from "../utils/constants/chains";
import { useSelector } from "react-redux";
import { isAddress } from "../utils";
import { useProvider } from "../utils/utilsFunctions";
const formatAmount = (number, decimals) => {
    return ethers.utils.formatUnits(number, decimals);
};
export function tryParseAmount(value, decimals) {
    if (!value || !decimals) {
        return undefined;
    }
    try {
        // console.log(currency);
        const typedValueParsed = ethers.utils
            .parseUnits(value, decimals)
            .toString();
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
const useSwap = (currencyA, currencyB, amountIn, marketFactory, marketRouterAddress, unit) => {
    const { chainId, library } = useActiveWeb3React();
    const [address, setAddress] = useState();
    const [amount, setAmount] = useState("");
    const [oppositeAmount, setOppositeAmount] = useState("0");
    const [wrap, setWrap] = useState(false);
    const [pathArray, setPath] = useState(undefined);
    const [pathSymbol, setPathSymbol] = useState("");
    const ChainId = useSelector((state) => state.chainId.chainId);
    const { prov } = useProvider();
    const lib = library ? library : prov;
    const independentFieldString = useSelector((state) => state.swap.independentField);
    let nativeAddress;
    if (!currencyA || !currencyB) {
        nativeAddress = undefined;
    }
    if (currencyA?.isNative || currencyB?.isNative) {
        nativeAddress = { address: WNATIVEADDRESSES[ChainId] };
    }
    const [tokenA, tokenB] = ChainId
        ? [currencyA?.wrapped, currencyB?.wrapped]
        : [undefined, undefined];
    const tokenOneAddress = tokenA?.address || nativeAddress?.address;
    const tokenTwoAddress = tokenB?.address || nativeAddress?.address;
    useEffect(() => {
        const getPairs = async () => {
            const wrappable = tokenOneAddress == tokenTwoAddress;
            let validSmartAddress;
            if (SMARTSWAPFACTORYADDRESSES[ChainId]) {
                validSmartAddress = isAddress(marketFactory)
                    ? marketFactory
                    : SMARTSWAPFACTORYADDRESSES[ChainId];
            }
            try {
                const SmartFactory = await smartFactory(validSmartAddress
                    ? validSmartAddress
                    : SMARTSWAPFACTORYADDRESSES[ChainId], lib);
                const pairAddress = await SmartFactory.getPair(tokenOneAddress, tokenTwoAddress);
                setAddress(pairAddress);
                if (wrappable) {
                    setWrap(true);
                }
                if (!wrappable && address !== ZERO_ADDRESS) {
                    setWrap(false);
                    if (amountIn !== undefined) {
                        const SwapRouter = await SmartSwapRouter(marketRouterAddress
                            ? marketRouterAddress
                            : SMARTSWAPROUTER[ChainId], lib);
                        const amountOut = await SwapRouter.getAmountsOut(amountIn, [
                            tokenOneAddress,
                            tokenTwoAddress,
                        ]);
                        const amountsIn = independentFieldString === "INPUT"
                            ? undefined
                            : await SwapRouter.getAmountsIn(amountIn, [
                                tokenOneAddress,
                                tokenTwoAddress,
                            ]);
                        const output = formatAmount(amountOut[1], currencyB.decimals);
                        const amountsInOutput = independentFieldString === "INPUT"
                            ? undefined
                            : formatAmount(amountsIn[0], currencyA.decimals);
                        setPath([tokenOneAddress, tokenTwoAddress]);
                        setPathSymbol(`${currencyA?.symbol} - ${currencyB?.symbol}`);
                        setAmount(independentFieldString === "INPUT" ? output : amountsInOutput);
                        if (unit) {
                            const amountOut2 = await SwapRouter.getAmountsOut(`${10 ** currencyB?.decimals}`, [tokenTwoAddress, tokenOneAddress]);
                            const output2 = formatAmount(amountOut2[1], currencyA.decimals);
                            setOppositeAmount(output2);
                        }
                    }
                    else {
                        setAmount("");
                    }
                    // setLoading(false)
                }
                else if (!wrappable && address === ZERO_ADDRESS && pairAddress === ZERO_ADDRESS) {
                    //   setWrap(true);
                    setWrap(false);
                    // RGP BNB BUSD USDT
                    const CurrencyA = getAddress(currencyA);
                    const CurrencyB = getAddress(currencyB);
                    const factory = await smartFactory(validSmartAddress
                        ? validSmartAddress
                        : SMARTSWAPFACTORYADDRESSES[ChainId], lib);
                    // const factory = await smartFactory(
                    //   SMARTSWAPFACTORYADDRESSES[chainId as number],
                    //   library
                    // );
                    // const SwapRouter = await SmartSwapRouter(
                    //   SMARTSWAPROUTER[chainId as number],
                    //   library
                    // );
                    const SwapRouter = await SmartSwapRouter(marketRouterAddress
                        ? marketRouterAddress
                        : SMARTSWAPROUTER[ChainId], lib);
                    const [RGPTOKENA, RGPTOKENB, NATIVETOKENA, NATIVETOKENB, BUSDTOKENA, BUSDTOKENB, USDTTOKENA, USDTTOKENB,] = await Promise.all([
                        factory.getPair(RGPADDRESSES[ChainId], CurrencyA),
                        factory.getPair(RGPADDRESSES[ChainId], CurrencyB),
                        factory.getPair(WNATIVEADDRESSES[ChainId], CurrencyA),
                        factory.getPair(WNATIVEADDRESSES[ChainId], CurrencyB),
                        factory.getPair(BUSD[ChainId], CurrencyA),
                        factory.getPair(BUSD[ChainId], CurrencyB),
                        factory.getPair(USDT[ChainId], CurrencyA),
                        factory.getPair(USDT[ChainId], CurrencyB),
                    ]);
                    const [USDTRGP, USDTNATIVE] = await Promise.all([
                        factory.getPair(USDT[ChainId], RGPADDRESSES[ChainId]),
                        factory.getPair(USDT[ChainId], WNATIVEADDRESSES[ChainId]),
                    ]);
                    // console.log({  RGPTOKENA,
                    //             RGPTOKENB,
                    //             NATIVETOKENA,
                    //             NATIVETOKENB,
                    //             BUSDTOKENA,
                    //             BUSDTOKENB,
                    //             USDTTOKENA,
                    //             USDTTOKENB,USDTRGP, USDTNATIVE})
                    try {
                        if (USDTTOKENA !== ZERO_ADDRESS && USDTTOKENB !== ZERO_ADDRESS) {
                            if (amountIn !== undefined) {
                                const amountsOut = await SwapRouter.getAmountsOut(amountIn, [
                                    CurrencyA,
                                    USDT[ChainId],
                                    CurrencyB,
                                ]);
                                const amountsIn = independentFieldString === "INPUT"
                                    ? undefined
                                    : await SwapRouter.getAmountsIn(amountIn, [
                                        CurrencyA,
                                        USDT[ChainId],
                                        CurrencyB,
                                    ]);
                                const amountsInOutput = independentFieldString === "INPUT"
                                    ? undefined
                                    : formatAmount(amountsIn[0], currencyA.decimals);
                                const output = formatAmount(amountsOut[2], currencyB.decimals);
                                setPath([
                                    CurrencyA,
                                    USDT[ChainId],
                                    CurrencyB,
                                ]);
                                setPathSymbol(`${currencyA?.symbol} - USDT - ${currencyB?.symbol}`);
                                setAmount(independentFieldString === "INPUT" ? output : amountsInOutput);
                                if (unit) {
                                    const amountsOut2 = await SwapRouter.getAmountsOut(`${10 ** currencyB?.decimals}`, [CurrencyB, USDT[ChainId], CurrencyA]);
                                    const output2 = formatAmount(amountsOut2[2], currencyA.decimals);
                                    setAmount(output2);
                                }
                            }
                            else {
                                setAmount("");
                                setPathSymbol("");
                                setPath([]);
                            }
                        }
                        else if (RGPTOKENA !== ZERO_ADDRESS &&
                            RGPTOKENB !== ZERO_ADDRESS) {
                            if (amountIn !== undefined) {
                                const amountsOut = await SwapRouter.getAmountsOut(amountIn, [
                                    CurrencyA,
                                    RGPADDRESSES[ChainId],
                                    CurrencyB,
                                ]);
                                const amountsIn = independentFieldString === "INPUT"
                                    ? undefined
                                    : await SwapRouter.getAmountsIn(amountIn, [
                                        CurrencyA,
                                        RGPADDRESSES[ChainId],
                                        CurrencyB,
                                    ]);
                                const amountsInOutput = independentFieldString === "INPUT"
                                    ? undefined
                                    : formatAmount(amountsIn[0], currencyA.decimals);
                                const output = formatAmount(amountsOut[2], currencyB.decimals);
                                setPath([
                                    CurrencyA,
                                    RGPADDRESSES[ChainId],
                                    CurrencyB,
                                ]);
                                setPathSymbol(`${currencyA?.symbol} - RGP - ${currencyB?.symbol}`);
                                setAmount(independentFieldString === "INPUT" ? output : amountsInOutput);
                                if (unit) {
                                    const amountsOut2 = await SwapRouter.getAmountsOut(`${10 ** currencyB?.decimals}`, [CurrencyB, RGPADDRESSES[ChainId], CurrencyA]);
                                    const output2 = formatAmount(amountsOut2[2], currencyA.decimals);
                                    setOppositeAmount(output2);
                                }
                            }
                            else {
                                setAmount("");
                                setPathSymbol("");
                                setPath([]);
                            }
                        }
                        else if (NATIVETOKENA !== ZERO_ADDRESS &&
                            NATIVETOKENB !== ZERO_ADDRESS) {
                            if (amountIn !== undefined) {
                                const amountsOut = await SwapRouter.getAmountsOut(amountIn, [
                                    CurrencyA,
                                    WNATIVEADDRESSES[ChainId],
                                    CurrencyB,
                                ]);
                                const amountsIn = independentFieldString === "INPUT"
                                    ? undefined
                                    : await SwapRouter.getAmountsIn(amountIn, [
                                        CurrencyA,
                                        WNATIVEADDRESSES[ChainId],
                                        CurrencyB,
                                    ]);
                                const amountsInOutput = independentFieldString === "INPUT"
                                    ? undefined
                                    : formatAmount(amountsIn[0], currencyA.decimals);
                                const output = formatAmount(amountsOut[2], currencyB.decimals);
                                setPath([
                                    CurrencyA,
                                    WNATIVEADDRESSES[ChainId],
                                    CurrencyB,
                                ]);
                                setPathSymbol(`${currencyA?.symbol} - ${SupportedChainSymbols[ChainId]} - ${currencyB?.symbol}`);
                                setAmount(independentFieldString === "INPUT" ? output : amountsInOutput);
                                if (unit) {
                                    const amountsOut2 = await SwapRouter.getAmountsOut(`${10 ** currencyB?.decimals}`, [CurrencyB, WNATIVEADDRESSES[ChainId], CurrencyA]);
                                    const output2 = formatAmount(amountsOut2[2], currencyA.decimals);
                                    setOppositeAmount(output2);
                                }
                            }
                            else {
                                setAmount("");
                                setPathSymbol("");
                                setPath([]);
                            }
                        }
                        else if (BUSDTOKENA !== ZERO_ADDRESS &&
                            BUSDTOKENB !== ZERO_ADDRESS) {
                            if (amountIn !== undefined) {
                                const amountsOut = await SwapRouter.getAmountsOut(amountIn, [
                                    CurrencyA,
                                    BUSD[ChainId],
                                    CurrencyB,
                                ]);
                                const amountsIn = independentFieldString === "INPUT"
                                    ? undefined
                                    : await SwapRouter.getAmountsIn(amountIn, [
                                        CurrencyA,
                                        BUSD[ChainId],
                                        CurrencyB,
                                    ]);
                                const amountsInOutput = independentFieldString === "INPUT"
                                    ? undefined
                                    : formatAmount(amountsIn[0], currencyA.decimals);
                                const output = formatAmount(amountsOut[2], currencyB.decimals);
                                setPath([
                                    CurrencyA,
                                    BUSD[ChainId],
                                    CurrencyB,
                                ]);
                                setPathSymbol(`${currencyA?.symbol} - BUSD - ${currencyB?.symbol}`);
                                setAmount(independentFieldString === "INPUT" ? output : amountsInOutput);
                                if (unit) {
                                    const amountsOut2 = await SwapRouter.getAmountsOut(`${10 ** currencyB?.decimals}`, [CurrencyB, BUSD[ChainId], CurrencyA]);
                                    const output2 = formatAmount(amountsOut2[2], currencyA.decimals);
                                    setOppositeAmount(output2);
                                }
                            }
                            else {
                                setAmount("");
                                setPathSymbol("");
                                setPath([]);
                            }
                        }
                        else if (RGPTOKENA !== ZERO_ADDRESS &&
                            USDTRGP !== ZERO_ADDRESS &&
                            USDTTOKENB !== ZERO_ADDRESS) {
                            if (amountIn !== undefined) {
                                const amountsOut = await SwapRouter.getAmountsOut(amountIn, [
                                    CurrencyA,
                                    RGPADDRESSES[ChainId],
                                    USDT[ChainId],
                                    CurrencyB,
                                ]);
                                const amountsIn = independentFieldString === "INPUT"
                                    ? undefined
                                    : await SwapRouter.getAmountsIn(amountIn, [
                                        CurrencyA,
                                        RGPADDRESSES[ChainId],
                                        USDT[ChainId],
                                        CurrencyB,
                                    ]);
                                const amountsInOutput = independentFieldString === "INPUT"
                                    ? undefined
                                    : formatAmount(amountsIn[0], currencyA.decimals);
                                const output = formatAmount(amountsOut[3], currencyB.decimals);
                                setPath([
                                    CurrencyA,
                                    RGPADDRESSES[ChainId],
                                    USDT[ChainId],
                                    CurrencyB,
                                ]);
                                setPathSymbol(`${currencyA?.symbol} - RGP - USDT - ${currencyB?.symbol}`);
                                setAmount(independentFieldString === "INPUT" ? output : amountsInOutput);
                                if (unit) {
                                    const amountsOut2 = await SwapRouter.getAmountsOut(`${10 ** currencyB?.decimals}`, [
                                        CurrencyB,
                                        RGPADDRESSES[ChainId],
                                        USDT[ChainId],
                                        CurrencyA,
                                    ]);
                                    const output2 = formatAmount(amountsOut2[3], currencyA.decimals);
                                    setOppositeAmount(output2);
                                }
                            }
                            else {
                                setAmount("");
                                setPathSymbol("");
                                setPath([]);
                            }
                        }
                        else if (USDTTOKENA !== ZERO_ADDRESS &&
                            USDTNATIVE !== ZERO_ADDRESS &&
                            NATIVETOKENB !== ZERO_ADDRESS) {
                            if (amountIn !== undefined) {
                                const amountsOut = await SwapRouter.getAmountsOut(amountIn, [
                                    CurrencyA,
                                    USDT[ChainId],
                                    WNATIVEADDRESSES[ChainId],
                                    CurrencyB,
                                ]);
                                const amountsIn = independentFieldString === "INPUT"
                                    ? undefined
                                    : await SwapRouter.getAmountsIn(amountIn, [
                                        CurrencyA,
                                        USDT[ChainId],
                                        WNATIVEADDRESSES[ChainId],
                                        CurrencyB,
                                    ]);
                                const amountsInOutput = independentFieldString === "INPUT"
                                    ? undefined
                                    : formatAmount(amountsIn[0], currencyA.decimals);
                                const output = formatAmount(amountsOut[3], currencyB.decimals);
                                setPath([
                                    CurrencyA,
                                    USDT[ChainId],
                                    WNATIVEADDRESSES[ChainId],
                                    CurrencyA,
                                ]);
                                setPathSymbol(`${currencyA?.symbol} - USDT - ${SupportedChainSymbols[ChainId]} - ${currencyB?.symbol}`);
                                setAmount(independentFieldString === "INPUT" ? output : amountsInOutput);
                                if (unit) {
                                    const amountsOut2 = await SwapRouter.getAmountsOut(amountIn, [
                                        CurrencyB,
                                        USDT[ChainId],
                                        WNATIVEADDRESSES[ChainId],
                                        CurrencyA,
                                    ]);
                                    const output2 = formatAmount(amountsOut2[3], currencyA.decimals);
                                    setOppositeAmount(output2);
                                }
                            }
                            else {
                                setAmount("");
                                setPathSymbol("");
                                setPath([]);
                            }
                        }
                    }
                    catch (e) {
                        console.log("Selected Currency Address cannot be matched");
                    }
                }
                else {
                    setAmount("");
                    setPathSymbol("");
                    setPath([]);
                    setOppositeAmount("");
                }
            }
            catch (e) {
                console.log({ e });
                console.log(`Error occurs here: ${e}`);
                setAmount("");
            }
        };
        var interval;
        if (tokenOneAddress && tokenTwoAddress && amountIn) {
            interval = setInterval(() => getPairs(), 2000);
        }
        else {
            clearInterval(interval);
        }
        getPairs();
        return () => clearInterval(interval);
    }, [
        // currencyA,
        // currencyB,
        address,
        amountIn,
        wrap,
        tokenOneAddress,
        tokenTwoAddress,
        // tokenA,
        // tokenB,
        independentFieldString,
        oppositeAmount,
        marketFactory,
    ]);
    return [address, wrap, amount, pathArray, pathSymbol, oppositeAmount];
};
export { useSwap };
