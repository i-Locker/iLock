import { useEffect, useMemo, useState } from "react";
import { useNearContext } from "../contexts/NearWalletContext";
import { makeNearAccount } from "../utils/near";
export const fetchSingleMetadata = async (address, account) => {
    const assetInfo = await account.viewFunction(address, "ft_metadata");
    return {
        tokenName: assetInfo.name,
        symbol: assetInfo.symbol,
        decimals: assetInfo.decimals,
    };
};
const fetchNearMetadata = async (addresses, nearAccountId) => {
    const account = await makeNearAccount(nearAccountId);
    const promises = [];
    addresses.forEach((address) => {
        promises.push(fetchSingleMetadata(address, account));
    });
    const resultsArray = await Promise.all(promises);
    const output = new Map();
    addresses.forEach((address, index) => {
        output.set(address, resultsArray[index]);
    });
    return output;
};
function useNearMetadata(addresses) {
    const { accountId: nearAccountId } = useNearContext();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);
    useEffect(() => {
        let cancelled = false;
        if (addresses.length && nearAccountId) {
            setIsFetching(true);
            setError("");
            setData(null);
            fetchNearMetadata(addresses, nearAccountId).then((results) => {
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
    }, [addresses, nearAccountId]);
    return useMemo(() => ({
        data,
        isFetching,
        error,
        receivedAt: null,
    }), [data, isFetching, error]);
}
export default useNearMetadata;
