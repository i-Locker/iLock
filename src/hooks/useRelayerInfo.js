import { CHAIN_ID_ETH, hexToNativeAssetString, } from "@certusone/wormhole-sdk";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectTransferGasPrice, selectTransferSourceParsedTokenAccount, } from "../store/selectors";
import { getCoinGeckoURL, RELAYER_COMPARE_ASSET } from "../utils/consts";
import useRelayersAvailable from "./useRelayersAvailable";
export function getRelayAssetInfo(originChain, originAsset, info) {
    if (!originChain || !originAsset || !info) {
        return null;
    }
    return info.supportedTokens?.find((x) => originAsset.toLowerCase() === x.address?.toLowerCase() &&
        originChain === x.chainId);
}
function isRelayable(originChain, originAsset, info) {
    if (!originChain || !originAsset || !info) {
        return false;
    }
    const tokenRecord = info.supportedTokens?.find((x) => originAsset.toLowerCase() === x.address?.toLowerCase() &&
        originChain === x.chainId);
    return !!(tokenRecord &&
        tokenRecord.address &&
        tokenRecord.chainId &&
        tokenRecord.coingeckoId);
}
function calculateFeeUsd(info, comparisonAssetPrice, targetChain, gasPrice) {
    let feeUsd = 0;
    if (info?.feeSchedule) {
        try {
            if (info.feeSchedule[targetChain]?.type === "flat") {
                feeUsd = info.feeSchedule[targetChain].feeUsd;
            }
            else if (info.feeSchedule[targetChain]?.type === "percent") {
                const entry = info.feeSchedule[targetChain];
                if (!gasPrice) {
                    feeUsd = 0; //catch this error elsewhere
                }
                else {
                    // Number should be safe as long as we don't modify highGasEstimate to be in the BigInt range
                    feeUsd =
                        ((Number(entry.gasEstimate) * gasPrice) / 1000000000) *
                            comparisonAssetPrice *
                            entry.feePercent;
                }
            }
        }
        catch (e) {
            console.error("Error determining relayer fee");
        }
    }
    return feeUsd;
}
function fixedUsd(fee) {
    return fee.toFixed(2);
}
function requireGasPrice(targetChain) {
    return targetChain === CHAIN_ID_ETH;
}
function calculateFeeFormatted(feeUsd, originAssetPrice, sourceAssetDecimals) {
    const sendableDecimals = Math.min(8, sourceAssetDecimals);
    const minimumFee = parseFloat((10 ** -sendableDecimals).toFixed(sendableDecimals));
    const calculatedFee = feeUsd / originAssetPrice;
    console.log("min", minimumFee, "calc", calculatedFee);
    return Math.max(minimumFee, calculatedFee).toFixed(sourceAssetDecimals);
}
//This potentially returns the same chain as the foreign chain, in the case where the asset is native
function useRelayerInfo(originChain, originAsset, targetChain) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [comparisonAssetPrice, setComparisonAssetPrice] = useState(null);
    const [originAssetPrice, setOriginAssetPrice] = useState(null);
    const sourceParsedTokenAccount = useSelector(selectTransferSourceParsedTokenAccount);
    const sourceAssetDecimals = sourceParsedTokenAccount?.decimals;
    const gasPrice = useSelector(selectTransferGasPrice);
    const relayerInfo = useRelayersAvailable(true);
    // console.log("relayerInfo", relayerInfo);
    const originAssetNative = originAsset && originChain
        ? hexToNativeAssetString(originAsset, originChain)
        : null;
    useEffect(() => {
        if (!(originAssetNative && originChain && targetChain && relayerInfo.data)) {
            return;
        }
        const relayerAsset = getRelayAssetInfo(originChain, originAssetNative, relayerInfo.data);
        //same check as relayable, to satiate typescript.
        if (!(relayerAsset &&
            relayerAsset.address &&
            relayerAsset.coingeckoId &&
            relayerAsset.chainId)) {
            return;
        }
        let cancelled = false;
        setIsLoading(true);
        setError("");
        const promises = [];
        const comparisonAsset = RELAYER_COMPARE_ASSET[targetChain];
        promises.push(axios
            .get(getCoinGeckoURL(relayerAsset.coingeckoId))
            .then((result) => {
            if (!cancelled) {
                const value = result.data[relayerAsset.coingeckoId]["usd"];
                if (!value) {
                    setError("Unable to fetch required asset price");
                    return;
                }
                setOriginAssetPrice(value);
            }
        })
            .catch((error) => {
            if (!cancelled) {
                setError("Unable to fetch required asset price.");
            }
        }));
        promises.push(axios
            .get(getCoinGeckoURL(comparisonAsset))
            .then((result) => {
            if (!cancelled) {
                const value = result.data[comparisonAsset]["usd"];
                if (!value) {
                    setError("Unable to fetch required asset price");
                    return;
                }
                setComparisonAssetPrice(value);
            }
        })
            .catch((error) => {
            if (!cancelled) {
                setError("Unable to fetch required asset price.");
            }
        }));
        Promise.all(promises).then(() => {
            setIsLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, [originAssetNative, originChain, targetChain, relayerInfo.data]);
    const output = useMemo(() => {
        if (error) {
            return {
                error: error,
                isFetching: false,
                receivedAt: null,
                data: null,
            };
        }
        else if (isLoading || relayerInfo.isFetching) {
            return {
                error: "",
                isFetching: true,
                receivedAt: null,
                data: null,
            };
        }
        else if (relayerInfo.error || !relayerInfo.data) {
            return {
                error: "",
                isFetching: false,
                receivedAt: null,
                data: {
                    isRelayable: false,
                    isRelayingAvailable: false,
                    targetNativeAssetPriceQuote: undefined, //TODO can still get this without relayers
                },
            };
        }
        else if (!originChain ||
            !originAssetNative ||
            !targetChain ||
            !sourceAssetDecimals) {
            return {
                error: "Invalid arguments supplied.",
                isFetching: false,
                receivedAt: null,
                data: null,
            };
        }
        else if (!comparisonAssetPrice ||
            !originAssetPrice ||
            (requireGasPrice(targetChain) && !gasPrice)) {
            return {
                error: "Failed to fetch necessary price data.",
                isFetching: false,
                receivedAt: null,
                data: null,
            };
        }
        else {
            const relayable = isRelayable(originChain, originAssetNative, relayerInfo.data);
            const feeUsd = calculateFeeUsd(relayerInfo.data, comparisonAssetPrice, targetChain, gasPrice);
            const feeFormatted = calculateFeeFormatted(feeUsd, originAssetPrice, sourceAssetDecimals);
            const usdString = fixedUsd(feeUsd);
            return {
                error: "",
                isFetching: false,
                receivedAt: null,
                data: {
                    isRelayable: relayable && feeUsd > 0,
                    isRelayingAvailable: true,
                    feeUsd: usdString,
                    feeFormatted: feeFormatted,
                    targetNativeAssetPriceQuote: comparisonAssetPrice,
                },
            };
        }
    }, [
        isLoading,
        originChain,
        targetChain,
        error,
        comparisonAssetPrice,
        originAssetPrice,
        gasPrice,
        originAssetNative,
        relayerInfo.data,
        relayerInfo.error,
        relayerInfo.isFetching,
        sourceAssetDecimals,
    ]);
    return output;
}
export default useRelayerInfo;
