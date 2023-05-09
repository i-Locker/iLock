import { parseSmartContractStateResponse } from "@certusone/wormhole-sdk";
import { useLayoutEffect, useMemo, useState } from "react";
import { getInjectiveWasmClient } from "../utils/injective";
const fetchSingleMetadata = async (address, client) => client
    .fetchSmartContractState(address, Buffer.from(JSON.stringify({ token_info: {} })).toString("base64"))
    .then((data) => {
    const parsed = parseSmartContractStateResponse(data);
    return {
        symbol: parsed.symbol,
        tokenName: parsed.name,
        decimals: parsed.decimals,
    };
});
const fetchInjectiveMetadata = async (addresses) => {
    const client = getInjectiveWasmClient();
    const promises = [];
    addresses.forEach((address) => {
        promises.push(fetchSingleMetadata(address, client));
    });
    const resultsArray = await Promise.all(promises);
    const output = new Map();
    addresses.forEach((address, index) => {
        output.set(address, resultsArray[index]);
    });
    return output;
};
const useInjectiveMetadata = (addresses) => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);
    useLayoutEffect(() => {
        let cancelled = false;
        if (addresses.length) {
            setIsFetching(true);
            setError("");
            setData(null);
            fetchInjectiveMetadata(addresses).then((results) => {
                if (!cancelled) {
                    setData(results);
                    setIsFetching(false);
                }
            }, () => {
                if (!cancelled) {
                    setError("Could not retrieve contract metadata");
                    setIsFetching(false);
                }
            });
        }
        return () => {
            cancelled = true;
        };
    }, [addresses]);
    return useMemo(() => ({
        data,
        isFetching,
        error,
        receivedAt: null,
    }), [data, isFetching, error]);
};
export default useInjectiveMetadata;
