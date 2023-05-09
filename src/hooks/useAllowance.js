import { approveEth, CHAIN_ID_KLAYTN, getAllowanceEth, isEVMChain, } from "@certusone/wormhole-sdk";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEthereumProvider } from "../contexts/EthereumProviderContext";
import { selectTransferIsApproving } from "../store/selectors";
import { setIsApproving } from "../store/transferSlice";
import { getTokenBridgeAddressForChain } from "../utils/consts";
export default function useAllowance(chainId, tokenAddress, transferAmount, sourceIsNative, overrideAddress) {
    const dispatch = useDispatch();
    const [allowance, setAllowance] = useState(null);
    const [isAllowanceFetching, setIsAllowanceFetching] = useState(false);
    const isApproveProcessing = useSelector(selectTransferIsApproving);
    const { signer } = useEthereumProvider();
    const sufficientAllowance = !isEVMChain(chainId) ||
        sourceIsNative ||
        (allowance && transferAmount && allowance >= transferAmount);
    useEffect(() => {
        let cancelled = false;
        if (isEVMChain(chainId) && tokenAddress && signer && !isApproveProcessing) {
            setIsAllowanceFetching(true);
            getAllowanceEth(overrideAddress || getTokenBridgeAddressForChain(chainId), tokenAddress, signer).then((result) => {
                if (!cancelled) {
                    setIsAllowanceFetching(false);
                    setAllowance(result.toBigInt());
                }
            }, (error) => {
                if (!cancelled) {
                    setIsAllowanceFetching(false);
                    //setError("Unable to retrieve allowance"); //TODO set an error
                }
            });
        }
        return () => {
            cancelled = true;
        };
    }, [chainId, tokenAddress, signer, isApproveProcessing, overrideAddress]);
    const approveAmount = useMemo(() => {
        return !isEVMChain(chainId) || !tokenAddress || !signer
            ? (amount) => {
                return Promise.resolve();
            }
            : (amount) => {
                dispatch(setIsApproving(true));
                // Klaytn requires specifying gasPrice
                const gasPricePromise = chainId === CHAIN_ID_KLAYTN
                    ? signer.getGasPrice()
                    : Promise.resolve(undefined);
                return gasPricePromise.then((gasPrice) => approveEth(overrideAddress || getTokenBridgeAddressForChain(chainId), tokenAddress, signer, BigNumber.from(amount), gasPrice === undefined ? {} : { gasPrice }).then(() => {
                    dispatch(setIsApproving(false));
                    return Promise.resolve();
                }, () => {
                    dispatch(setIsApproving(false));
                    return Promise.reject();
                }), () => {
                    dispatch(setIsApproving(false));
                    return Promise.reject();
                });
            };
    }, [chainId, tokenAddress, signer, dispatch, overrideAddress]);
    return useMemo(() => ({
        sufficientAllowance,
        approveAmount,
        isAllowanceFetching,
        isApproveProcessing,
    }), [
        sufficientAllowance,
        approveAmount,
        isAllowanceFetching,
        isApproveProcessing,
    ]);
}
