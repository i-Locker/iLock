import { useEffect, useState } from "react";
import { useActiveWeb3React } from "../utils/hooks/useActiveWeb3React";
import { smartFactory, SmartSwapRouter, LiquidityPairInstance, } from "../utils/Contracts";
import { SMARTSWAPFACTORYADDRESSES, SMARTSWAPROUTER, WNATIVEADDRESSES, } from "../utils/addresses";
import { ZERO_ADDRESS } from "../constants";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
const formatAmount = (number, decimal) => {
    return ethers.utils.formatUnits(number, decimal);
};
export const useMint = (currencyA, currencyB, amountIn) => {
    const { chainId, library } = useActiveWeb3React();
    const [address, setAddress] = useState();
    const [amount, setAmount] = useState("");
    const [wrap, setWrap] = useState(false);
    const independentFieldString = useSelector((state) => state.mint.independentField);
    const independentFieldId = useSelector((state) => state.mint);
    let nativeAddress;
    if (!currencyA || !currencyB) {
        nativeAddress = undefined;
    }
    if (currencyA?.isNative || currencyB?.isNative) {
        nativeAddress = { address: WNATIVEADDRESSES[chainId] };
    }
    const [tokenA, tokenB] = chainId
        ? [currencyA?.wrapped, currencyB?.wrapped]
        : [undefined, undefined];
    const tokenOneAddress = tokenA?.address || nativeAddress?.address;
    const tokenTwoAddress = tokenB?.address || nativeAddress?.address;
    const wrappable = tokenOneAddress == tokenTwoAddress;
    let validSmartAddress;
    if (SMARTSWAPFACTORYADDRESSES[chainId] !== "0x") {
        validSmartAddress = SMARTSWAPFACTORYADDRESSES[chainId];
    }
    useEffect(() => {
        const getPairs = async () => {
            try {
                const SmartFactory = await smartFactory(validSmartAddress, library);
                const pairAddress = await SmartFactory.getPair(tokenOneAddress, tokenTwoAddress);
                setAddress(pairAddress);
                if (wrappable && address === ZERO_ADDRESS) {
                    setWrap(true);
                }
                if (!wrappable && address !== ZERO_ADDRESS) {
                    setWrap(false);
                    if (amountIn !== undefined) {
                        // setLoading(true);
                        const pairinstance = await LiquidityPairInstance(pairAddress, library);
                        const token0 = await pairinstance.token0();
                        const token1 = await pairinstance.token1();
                        const reserves = await pairinstance.getReserves();
                        const SwapRouter = await SmartSwapRouter(SMARTSWAPROUTER[chainId], library);
                        const outputAmount = await SwapRouter.quote(amountIn, tokenOneAddress === token0 ? reserves[0] : reserves[1], tokenOneAddress === token0 ? reserves[1] : reserves[0]);
                        const output = formatAmount(outputAmount.toString(), currencyB.decimals);
                        setAmount(output);
                    }
                    else {
                        setAmount("");
                    }
                }
            }
            catch (e) {
                console.log(e);
                setAmount("");
            }
        };
        getPairs();
    }, [
        chainId,
        currencyA,
        currencyB,
        address,
        amountIn,
        wrap,
        tokenOneAddress,
        tokenTwoAddress,
    ]);
    return [address, wrap, amount];
};
