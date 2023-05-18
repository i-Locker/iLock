import { useEffect, useMemo, useState } from "react";
import { getInjectiveBankClient } from "../utils/injective";
export default function useInjectiveNativeBalances(walletAddress, refreshRef) {
    const [isLoading, setIsLoading] = useState(true);
    const [balances, setBalances] = useState({});
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        if (refreshRef) {
            refreshRef.current = () => {
                setRefresh(true);
            };
        }
    }, [refreshRef]);
    useEffect(() => {
        setRefresh(false);
        if (walletAddress) {
            setIsLoading(true);
            setBalances(undefined);
            const client = getInjectiveBankClient();
            client
                .fetchBalances(walletAddress)
                .then(({ balances }) => {
                const nativeBalances = balances.reduce((obj, { denom, amount }) => {
                    obj[denom] = amount;
                    return obj;
                }, {});
                setIsLoading(false);
                setBalances(nativeBalances);
            })
                .catch((e) => {
                console.error(e);
                setIsLoading(false);
                setBalances(undefined);
            });
        }
        else {
            setIsLoading(false);
            setBalances(undefined);
        }
    }, [walletAddress, refresh]);
    const value = useMemo(() => ({ isLoading, balances }), [isLoading, balances]);
    return value;
}
